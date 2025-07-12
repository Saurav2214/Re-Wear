import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Box,
  Container,
  Grid,
  Card,
  CardContent,
  Typography,
  Button,
  Avatar,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Chip,
  Paper,
  LinearProgress,
  Tabs,
  Tab,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions
} from '@mui/material';
import {
  Dashboard as DashboardIcon,
  Stars,
  SwapHoriz,
  Add,
  Visibility,
  Edit,
  Delete,
  CheckCircle,
  Cancel,
  Schedule,
  TrendingUp,
  Inventory,
  Person
} from '@mui/icons-material';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import { useAuth } from '../contexts/AuthContext';
import { sampleItems, sampleSwaps } from '../utils/sampleData';

const Dashboard = () => {
  const { currentUser, userData } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState(0);
  const [userItems, setUserItems] = useState([]);
  const [userSwaps, setUserSwaps] = useState([]);
  const [stats, setStats] = useState({
    totalItems: 0,
    activeSwaps: 0,
    completedSwaps: 0,
    totalPoints: 0
  });
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);

  useEffect(() => {
    if (currentUser) {
      // Simulate API calls
      const fetchUserData = async () => {
        try {
          // Get user's items
          const items = sampleItems.filter(item => item.userId === currentUser.uid);
          setUserItems(items);

          // Get user's swaps
          const swaps = sampleSwaps.filter(swap => 
            swap.requesterId === currentUser.uid || swap.ownerId === currentUser.uid
          );
          setUserSwaps(swaps);

          // Calculate stats
          setStats({
            totalItems: items.length,
            activeSwaps: swaps.filter(swap => swap.status === 'pending').length,
            completedSwaps: swaps.filter(swap => swap.status === 'completed').length,
            totalPoints: userData?.points || 0
          });
        } catch (error) {
          console.error('Error fetching user data:', error);
        }
      };

      fetchUserData();
    }
  }, [currentUser, userData]);

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  const handleDeleteItem = (item) => {
    setItemToDelete(item);
    setDeleteDialogOpen(true);
  };

  const confirmDelete = () => {
    if (itemToDelete) {
      // In a real app, this would be an API call
      console.log('Deleting item:', itemToDelete.id);
      setUserItems(userItems.filter(item => item.id !== itemToDelete.id));
      toast.success('Item deleted successfully');
      setDeleteDialogOpen(false);
      setItemToDelete(null);
    }
  };

  const handleSwapAction = (swapId, action) => {
    // In a real app, this would be an API call
    console.log('Swap action:', { swapId, action });
    
    const updatedSwaps = userSwaps.map(swap => {
      if (swap.id === swapId) {
        return { ...swap, status: action === 'accept' ? 'accepted' : 'rejected' };
      }
      return swap;
    });
    
    setUserSwaps(updatedSwaps);
    toast.success(`Swap ${action}ed successfully`);
  };

  const StatsCard = ({ title, value, icon, color = 'primary' }) => (
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
            </Box>
            <Avatar sx={{ bgcolor: `${color}.main`, width: 56, height: 56 }}>
              {icon}
            </Avatar>
          </Box>
        </CardContent>
      </Card>
    </motion.div>
  );

  const MyItemsTab = () => (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h6">My Items ({userItems.length})</Typography>
        <Button
          variant="contained"
          startIcon={<Add />}
          component={Link}
          to="/add-item"
        >
          Add New Item
        </Button>
      </Box>

      <Grid container spacing={3}>
        {userItems.map((item) => (
          <Grid item xs={12} sm={6} md={4} key={item.id}>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
            >
              <Card>
                <Box
                  component="img"
                  height="200"
                  src={item.images[0]}
                  alt={item.title}
                  sx={{ objectFit: 'cover', width: '100%' }}
                />
                <CardContent>
                  <Typography variant="h6" sx={{ mb: 1 }}>
                    {item.title}
                  </Typography>
                  <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
                    <Chip
                      label={item.status}
                      color={item.status === 'available' ? 'success' : 'warning'}
                      size="small"
                    />
                    <Chip
                      label={`${item.pointsRequired} pts`}
                      variant="outlined"
                      size="small"
                    />
                  </Box>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <IconButton
                      onClick={() => navigate(`/item/${item.id}`)}
                      color="primary"
                    >
                      <Visibility />
                    </IconButton>
                    <IconButton color="secondary">
                      <Edit />
                    </IconButton>
                    <IconButton
                      onClick={() => handleDeleteItem(item)}
                      color="error"
                    >
                      <Delete />
                    </IconButton>
                  </Box>
                </CardContent>
              </Card>
            </motion.div>
          </Grid>
        ))}
      </Grid>

      {userItems.length === 0 && (
        <Box sx={{ textAlign: 'center', py: 6 }}>
          <Inventory sx={{ fontSize: 64, color: 'text.secondary', mb: 2 }} />
          <Typography variant="h6" color="text.secondary" sx={{ mb: 2 }}>
            No items yet
          </Typography>
          <Button
            variant="contained"
            component={Link}
            to="/add-item"
            startIcon={<Add />}
          >
            Add Your First Item
          </Button>
        </Box>
      )}
    </Box>
  );

  const SwapsTab = () => (
    <Box>
      <Typography variant="h6" sx={{ mb: 3 }}>
        My Swaps ({userSwaps.length})
      </Typography>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Item</TableCell>
              <TableCell>With</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {userSwaps.map((swap) => (
              <TableRow key={swap.id}>
                <TableCell>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Avatar sx={{ mr: 2 }}>
                      <SwapHoriz />
                    </Avatar>
                    <Box>
                      <Typography variant="body2" sx={{ fontWeight: 600 }}>
                        {swap.itemTitle}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        {swap.offeredItemTitle}
                      </Typography>
                    </Box>
                  </Box>
                </TableCell>
                <TableCell>
                  <Typography variant="body2">
                    {swap.requesterId === currentUser.uid ? swap.ownerName : swap.requesterName}
                  </Typography>
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
                  {swap.status === 'pending' && swap.ownerId === currentUser.uid && (
                    <Box sx={{ display: 'flex', gap: 1 }}>
                      <IconButton
                        onClick={() => handleSwapAction(swap.id, 'accept')}
                        color="success"
                        size="small"
                      >
                        <CheckCircle />
                      </IconButton>
                      <IconButton
                        onClick={() => handleSwapAction(swap.id, 'reject')}
                        color="error"
                        size="small"
                      >
                        <Cancel />
                      </IconButton>
                    </Box>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {userSwaps.length === 0 && (
        <Box sx={{ textAlign: 'center', py: 6 }}>
          <SwapHoriz sx={{ fontSize: 64, color: 'text.secondary', mb: 2 }} />
          <Typography variant="h6" color="text.secondary" sx={{ mb: 2 }}>
            No swaps yet
          </Typography>
          <Button
            variant="contained"
            component={Link}
            to="/browse"
            startIcon={<SwapHoriz />}
          >
            Start Swapping
          </Button>
        </Box>
      )}
    </Box>
  );

  const ProfileTab = () => (
    <Box>
      <Typography variant="h6" sx={{ mb: 3 }}>
        Profile Information
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent sx={{ textAlign: 'center' }}>
              <Avatar sx={{ width: 100, height: 100, mx: 'auto', mb: 2 }}>
                {userData?.displayName?.charAt(0) || 'U'}
              </Avatar>
              <Typography variant="h6" sx={{ mb: 1 }}>
                {userData?.displayName || 'User'}
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                {userData?.email}
              </Typography>
              <Chip
                label={userData?.role || 'User'}
                color="primary"
                variant="outlined"
              />
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={8}>
          <Card>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 2 }}>
                Activity Summary
              </Typography>
              
              <Box sx={{ mb: 3 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                  <Typography variant="body2">Points Progress</Typography>
                  <Typography variant="body2">{stats.totalPoints}/500</Typography>
                </Box>
                <LinearProgress
                  variant="determinate"
                  value={Math.min((stats.totalPoints / 500) * 100, 100)}
                  sx={{ height: 8, borderRadius: 4 }}
                />
              </Box>

              <List>
                <ListItem>
                  <ListItemAvatar>
                    <Avatar sx={{ bgcolor: 'primary.main' }}>
                      <Inventory />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary="Items Listed"
                    secondary={`${stats.totalItems} items`}
                  />
                </ListItem>
                <ListItem>
                  <ListItemAvatar>
                    <Avatar sx={{ bgcolor: 'secondary.main' }}>
                      <SwapHoriz />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary="Successful Swaps"
                    secondary={`${stats.completedSwaps} completed`}
                  />
                </ListItem>
                <ListItem>
                  <ListItemAvatar>
                    <Avatar sx={{ bgcolor: 'success.main' }}>
                      <Stars />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary="Current Points"
                    secondary={`${stats.totalPoints} points`}
                  />
                </ListItem>
              </List>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
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
            Welcome back, {userData?.displayName}!
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Manage your items, track your swaps, and grow your sustainable wardrobe.
          </Typography>
        </Box>

        {/* Stats Cards */}
        <Grid container spacing={3} sx={{ mb: 4 }}>
          <Grid item xs={12} sm={6} md={3}>
            <StatsCard
              title="Total Items"
              value={stats.totalItems}
              icon={<Inventory />}
              color="primary"
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <StatsCard
              title="Active Swaps"
              value={stats.activeSwaps}
              icon={<Schedule />}
              color="warning"
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <StatsCard
              title="Completed Swaps"
              value={stats.completedSwaps}
              icon={<CheckCircle />}
              color="success"
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <StatsCard
              title="Points"
              value={stats.totalPoints}
              icon={<Stars />}
              color="secondary"
            />
          </Grid>
        </Grid>

        {/* Main Content */}
        <Card>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs value={activeTab} onChange={handleTabChange} aria-label="dashboard tabs">
              <Tab label="My Items" />
              <Tab label="Swaps" />
              <Tab label="Profile" />
            </Tabs>
          </Box>

          <Box sx={{ p: 3 }}>
            {activeTab === 0 && <MyItemsTab />}
            {activeTab === 1 && <SwapsTab />}
            {activeTab === 2 && <ProfileTab />}
          </Box>
        </Card>
      </motion.div>

      {/* Delete Confirmation Dialog */}
      <Dialog
        open={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure you want to delete "{itemToDelete?.title}"? This action cannot be undone.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteDialogOpen(false)}>Cancel</Button>
          <Button onClick={confirmDelete} color="error" variant="contained">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default Dashboard;