import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Grid,
  Card,
  CardContent,
  Typography,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Tabs,
  Tab,
  Avatar,
  LinearProgress,
  Alert
} from '@mui/material';
import {
  AdminPanelSettings,
  CheckCircle,
  Cancel,
  Delete,
  Visibility,
  TrendingUp,
  People,
  Inventory,
  SwapHoriz,
  Warning
} from '@mui/icons-material';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import { useAuth } from '../contexts/AuthContext';
import { sampleItems, sampleUsers, sampleSwaps } from '../utils/sampleData';

const AdminPanel = () => {
  const { currentUser, userData } = useAuth();
  const [activeTab, setActiveTab] = useState(0);
  const [pendingItems, setPendingItems] = useState([]);
  const [allUsers, setAllUsers] = useState([]);
  const [allSwaps, setAllSwaps] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [reviewDialogOpen, setReviewDialogOpen] = useState(false);
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalItems: 0,
    pendingItems: 0,
    totalSwaps: 0,
    completedSwaps: 0
  });

  useEffect(() => {
    // Simulate API calls to fetch admin data
    const fetchAdminData = async () => {
      try {
        // Get pending items
        const pending = sampleItems.filter(item => item.status === 'pending_approval');
        setPendingItems(pending);

        // Get all users
        setAllUsers(sampleUsers);

        // Get all swaps
        setAllSwaps(sampleSwaps);

        // Calculate stats
        setStats({
          totalUsers: sampleUsers.length,
          totalItems: sampleItems.length,
          pendingItems: pending.length,
          totalSwaps: sampleSwaps.length,
          completedSwaps: sampleSwaps.filter(swap => swap.status === 'accepted').length
        });
      } catch (error) {
        console.error('Error fetching admin data:', error);
      }
    };

    fetchAdminData();
  }, []);

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  const handleItemAction = (item, action) => {
    setSelectedItem(item);
    if (action === 'review') {
      setReviewDialogOpen(true);
    }
  };

  const approveItem = () => {
    if (selectedItem) {
      setPendingItems(prev => prev.filter(item => item.id !== selectedItem.id));
      toast.success('Item approved successfully');
      setReviewDialogOpen(false);
      setSelectedItem(null);
    }
  };

  const rejectItem = () => {
    if (selectedItem) {
      setPendingItems(prev => prev.filter(item => item.id !== selectedItem.id));
      toast.success('Item rejected');
      setReviewDialogOpen(false);
      setSelectedItem(null);
    }
  };

  const StatsCard = ({ title, value, icon, color = 'primary', subtitle = '' }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card sx={{ height: '100%' }}>
        <CardContent>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <Box>
              <Typography variant="h4" sx={{ fontWeight: 700, color: `${color}.main` }}>
                {value}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {title}
              </Typography>
              {subtitle && (
                <Typography variant="caption" color="text.secondary">
                  {subtitle}
                </Typography>
              )}
            </Box>
            <Avatar sx={{ bgcolor: `${color}.main`, width: 56, height: 56 }}>
              {icon}
            </Avatar>
          </Box>
        </CardContent>
      </Card>
    </motion.div>
  );

  const OverviewTab = () => (
    <Box>
      <Typography variant="h6" sx={{ mb: 3 }}>
        Platform Overview
      </Typography>

      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <StatsCard
            title="Total Users"
            value={stats.totalUsers}
            icon={<People />}
            color="primary"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatsCard
            title="Total Items"
            value={stats.totalItems}
            icon={<Inventory />}
            color="secondary"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatsCard
            title="Pending Items"
            value={stats.pendingItems}
            icon={<Warning />}
            color="warning"
            subtitle="Need review"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatsCard
            title="Total Swaps"
            value={stats.totalSwaps}
            icon={<SwapHoriz />}
            color="success"
            subtitle={`${stats.completedSwaps} completed`}
          />
        </Grid>
      </Grid>

      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 2 }}>
                Platform Health
              </Typography>
              
              <Box sx={{ mb: 2 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                  <Typography variant="body2">User Engagement</Typography>
                  <Typography variant="body2">85%</Typography>
                </Box>
                <LinearProgress variant="determinate" value={85} sx={{ height: 8, borderRadius: 4 }} />
              </Box>

              <Box sx={{ mb: 2 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                  <Typography variant="body2">Item Approval Rate</Typography>
                  <Typography variant="body2">92%</Typography>
                </Box>
                <LinearProgress variant="determinate" value={92} sx={{ height: 8, borderRadius: 4 }} />
              </Box>

              <Box sx={{ mb: 2 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                  <Typography variant="body2">Swap Success Rate</Typography>
                  <Typography variant="body2">78%</Typography>
                </Box>
                <LinearProgress variant="determinate" value={78} sx={{ height: 8, borderRadius: 4 }} />
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 2 }}>
                Recent Activity
              </Typography>
              
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Avatar sx={{ bgcolor: 'success.main', mr: 2, width: 32, height: 32 }}>
                  <CheckCircle />
                </Avatar>
                <Box>
                  <Typography variant="body2">5 items approved today</Typography>
                  <Typography variant="caption" color="text.secondary">2 hours ago</Typography>
                </Box>
              </Box>

              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Avatar sx={{ bgcolor: 'primary.main', mr: 2, width: 32, height: 32 }}>
                  <People />
                </Avatar>
                <Box>
                  <Typography variant="body2">3 new users registered</Typography>
                  <Typography variant="caption" color="text.secondary">4 hours ago</Typography>
                </Box>
              </Box>

              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Avatar sx={{ bgcolor: 'secondary.main', mr: 2, width: 32, height: 32 }}>
                  <SwapHoriz />
                </Avatar>
                <Box>
                  <Typography variant="body2">12 swaps completed</Typography>
                  <Typography variant="caption" color="text.secondary">6 hours ago</Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );

  const ItemsTab = () => (
    <Box>
      <Typography variant="h6" sx={{ mb: 3 }}>
        Pending Items ({pendingItems.length})
      </Typography>

      {pendingItems.length === 0 ? (
        <Alert severity="info">No pending items to review</Alert>
      ) : (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Item</TableCell>
                <TableCell>Category</TableCell>
                <TableCell>Uploader</TableCell>
                <TableCell>Points</TableCell>
                <TableCell>Date</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {pendingItems.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <Avatar
                        src={item.images[0]}
                        alt={item.title}
                        sx={{ mr: 2, width: 40, height: 40 }}
                      />
                      <Box>
                        <Typography variant="body2" sx={{ fontWeight: 600 }}>
                          {item.title}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          {item.condition}
                        </Typography>
                      </Box>
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Chip label={item.category} color="primary" size="small" />
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2">{item.uploaderName}</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2">{item.pointsRequired}</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2">
                      {new Date(item.createdAt).toLocaleDateString()}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Box sx={{ display: 'flex', gap: 1 }}>
                      <IconButton
                        onClick={() => handleItemAction(item, 'review')}
                        color="primary"
                        size="small"
                      >
                        <Visibility />
                      </IconButton>
                      <IconButton
                        onClick={() => {
                          setSelectedItem(item);
                          approveItem();
                        }}
                        color="success"
                        size="small"
                      >
                        <CheckCircle />
                      </IconButton>
                      <IconButton
                        onClick={() => {
                          setSelectedItem(item);
                          rejectItem();
                        }}
                        color="error"
                        size="small"
                      >
                        <Cancel />
                      </IconButton>
                    </Box>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Box>
  );

  const UsersTab = () => (
    <Box>
      <Typography variant="h6" sx={{ mb: 3 }}>
        User Management ({allUsers.length})
      </Typography>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>User</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Role</TableCell>
              <TableCell>Points</TableCell>
              <TableCell>Join Date</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {allUsers.map((user) => (
              <TableRow key={user.id}>
                <TableCell>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Avatar sx={{ mr: 2 }}>
                      {user.displayName.charAt(0)}
                    </Avatar>
                    <Box>
                      <Typography variant="body2" sx={{ fontWeight: 600 }}>
                        {user.displayName}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        {user.location}
                      </Typography>
                    </Box>
                  </Box>
                </TableCell>
                <TableCell>
                  <Typography variant="body2">{user.email}</Typography>
                </TableCell>
                <TableCell>
                  <Chip
                    label={user.role}
                    color={user.role === 'admin' ? 'secondary' : 'primary'}
                    size="small"
                  />
                </TableCell>
                <TableCell>
                  <Typography variant="body2">{user.points}</Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="body2">
                    {new Date(user.createdAt).toLocaleDateString()}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Box sx={{ display: 'flex', gap: 1 }}>
                    <IconButton color="primary" size="small">
                      <Visibility />
                    </IconButton>
                    <IconButton color="error" size="small">
                      <Delete />
                    </IconButton>
                  </Box>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );

  const SwapsTab = () => (
    <Box>
      <Typography variant="h6" sx={{ mb: 3 }}>
        Swap Management ({allSwaps.length})
      </Typography>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Swap Details</TableCell>
              <TableCell>Participants</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {allSwaps.map((swap) => (
              <TableRow key={swap.id}>
                <TableCell>
                  <Box>
                    <Typography variant="body2" sx={{ fontWeight: 600 }}>
                      {swap.itemTitle}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      ↔ {swap.offeredItemTitle}
                    </Typography>
                  </Box>
                </TableCell>
                <TableCell>
                  <Box>
                    <Typography variant="body2">{swap.requesterName}</Typography>
                    <Typography variant="caption" color="text.secondary">
                      ↔ {swap.ownerName}
                    </Typography>
                  </Box>
                </TableCell>
                <TableCell>
                  <Chip
                    label={swap.status}
                    color={
                      swap.status === 'accepted' ? 'success' :
                      swap.status === 'rejected' ? 'error' :
                      'warning'
                    }
                    size="small"
                  />
                </TableCell>
                <TableCell>
                  <Typography variant="body2">
                    {new Date(swap.createdAt).toLocaleDateString()}
                  </Typography>
                </TableCell>
                <TableCell>
                  <IconButton color="primary" size="small">
                    <Visibility />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Box sx={{ mb: 4 }}>
          <Typography variant="h4" component="h1" sx={{ mb: 1, fontWeight: 700 }}>
            <AdminPanelSettings sx={{ mr: 1, verticalAlign: 'middle' }} />
            Admin Panel
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Manage platform content, users, and monitor system health
          </Typography>
        </Box>

        <Card>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs value={activeTab} onChange={handleTabChange}>
              <Tab label="Overview" />
              <Tab label={`Items (${stats.pendingItems})`} />
              <Tab label={`Users (${stats.totalUsers})`} />
              <Tab label={`Swaps (${stats.totalSwaps})`} />
            </Tabs>
          </Box>

          <Box sx={{ p: 3 }}>
            {activeTab === 0 && <OverviewTab />}
            {activeTab === 1 && <ItemsTab />}
            {activeTab === 2 && <UsersTab />}
            {activeTab === 3 && <SwapsTab />}
          </Box>
        </Card>
      </motion.div>

      {/* Item Review Dialog */}
      <Dialog
        open={reviewDialogOpen}
        onClose={() => setReviewDialogOpen(false)}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>Review Item</DialogTitle>
        <DialogContent>
          {selectedItem && (
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <Box
                  component="img"
                  src={selectedItem.images[0]}
                  alt={selectedItem.title}
                  sx={{
                    width: '100%',
                    height: 300,
                    objectFit: 'cover',
                    borderRadius: 1
                  }}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <Typography variant="h6" sx={{ mb: 2 }}>
                  {selectedItem.title}
                </Typography>
                <Typography variant="body2" sx={{ mb: 2 }}>
                  {selectedItem.description}
                </Typography>
                <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
                  <Chip label={selectedItem.category} color="primary" size="small" />
                  <Chip label={selectedItem.condition} color="secondary" size="small" />
                  <Chip label={`${selectedItem.pointsRequired} pts`} variant="outlined" size="small" />
                </Box>
                <Typography variant="body2" color="text.secondary">
                  <strong>Uploader:</strong> {selectedItem.uploaderName}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  <strong>Location:</strong> {selectedItem.location}
                </Typography>
              </Grid>
            </Grid>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setReviewDialogOpen(false)}>Cancel</Button>
          <Button onClick={rejectItem} color="error">
            Reject
          </Button>
          <Button onClick={approveItem} color="success" variant="contained">
            Approve
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default AdminPanel;