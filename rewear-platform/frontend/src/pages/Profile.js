import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import {
  Box,
  Container,
  Grid,
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  Avatar,
  Tabs,
  Tab,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Chip,
  Divider,
  Alert,
  CircularProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton
} from '@mui/material';
import {
  Person,
  Edit,
  Save,
  Cancel,
  Camera,
  LocationOn,
  Email,
  Phone,
  SwapHoriz,
  Stars,
  TrendingUp,
  Inventory
} from '@mui/icons-material';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import { useAuth } from '../contexts/AuthContext';
import { sampleItems, sampleSwaps } from '../utils/sampleData';

const Profile = () => {
  const { currentUser, userData } = useAuth();
  const [activeTab, setActiveTab] = useState(0);
  const [editing, setEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm({
    defaultValues: {
      displayName: userData?.displayName || '',
      email: userData?.email || '',
      phone: userData?.phone || '',
      location: userData?.location || '',
      bio: userData?.bio || ''
    }
  });

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      // In a real app, this would update the user profile
      console.log('Updating profile:', data);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast.success('Profile updated successfully!');
      setEditing(false);
    } catch (error) {
      console.error('Error updating profile:', error);
      toast.error('Failed to update profile');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteAccount = async () => {
    try {
      // In a real app, this would delete the user account
      console.log('Deleting account...');
      toast.success('Account deletion request submitted');
      setDeleteDialogOpen(false);
    } catch (error) {
      console.error('Error deleting account:', error);
      toast.error('Failed to delete account');
    }
  };

  const ProfileTab = () => (
    <Box>
      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent sx={{ textAlign: 'center' }}>
              <Box sx={{ position: 'relative', mb: 3 }}>
                <Avatar
                  sx={{
                    width: 120,
                    height: 120,
                    mx: 'auto',
                    fontSize: '3rem',
                    mb: 2
                  }}
                >
                  {userData?.displayName?.charAt(0) || 'U'}
                </Avatar>
                <IconButton
                  sx={{
                    position: 'absolute',
                    bottom: 0,
                    right: '50%',
                    transform: 'translateX(50%)',
                    bgcolor: 'primary.main',
                    color: 'white',
                    '&:hover': { bgcolor: 'primary.dark' }
                  }}
                  size="small"
                >
                  <Camera />
                </IconButton>
              </Box>
              
              <Typography variant="h5" sx={{ mb: 1 }}>
                {userData?.displayName || 'User'}
              </Typography>
              
              <Chip
                label={userData?.role || 'User'}
                color="primary"
                variant="outlined"
                sx={{ mb: 2 }}
              />
              
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                Member since {new Date(userData?.createdAt || '2024-01-01').toLocaleDateString()}
              </Typography>

              <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, mb: 3 }}>
                <Box sx={{ textAlign: 'center' }}>
                  <Typography variant="h6" color="primary">
                    {userData?.points || 0}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    Points
                  </Typography>
                </Box>
                <Box sx={{ textAlign: 'center' }}>
                  <Typography variant="h6" color="secondary">
                    {sampleItems.filter(item => item.userId === currentUser?.uid).length}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    Items
                  </Typography>
                </Box>
                <Box sx={{ textAlign: 'center' }}>
                  <Typography variant="h6" color="success.main">
                    {sampleSwaps.filter(swap => swap.requesterId === currentUser?.uid && swap.status === 'accepted').length}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    Swaps
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={8}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                <Typography variant="h6">Profile Information</Typography>
                <Button
                  variant={editing ? 'outlined' : 'contained'}
                  startIcon={editing ? <Cancel /> : <Edit />}
                  onClick={() => {
                    if (editing) {
                      reset();
                    }
                    setEditing(!editing);
                  }}
                >
                  {editing ? 'Cancel' : 'Edit Profile'}
                </Button>
              </Box>

              <Box component="form" onSubmit={handleSubmit(onSubmit)}>
                <Grid container spacing={3}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Display Name"
                      {...register('displayName', {
                        required: 'Display name is required',
                        minLength: { value: 2, message: 'Name must be at least 2 characters' }
                      })}
                      error={!!errors.displayName}
                      helperText={errors.displayName?.message}
                      disabled={!editing}
                      InputProps={{
                        startAdornment: <Person sx={{ mr: 1, color: 'text.secondary' }} />
                      }}
                    />
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Email"
                      type="email"
                      {...register('email', {
                        required: 'Email is required',
                        pattern: {
                          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                          message: 'Invalid email address'
                        }
                      })}
                      error={!!errors.email}
                      helperText={errors.email?.message}
                      disabled={!editing}
                      InputProps={{
                        startAdornment: <Email sx={{ mr: 1, color: 'text.secondary' }} />
                      }}
                    />
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Phone"
                      {...register('phone')}
                      disabled={!editing}
                      InputProps={{
                        startAdornment: <Phone sx={{ mr: 1, color: 'text.secondary' }} />
                      }}
                    />
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Location"
                      {...register('location')}
                      disabled={!editing}
                      InputProps={{
                        startAdornment: <LocationOn sx={{ mr: 1, color: 'text.secondary' }} />
                      }}
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Bio"
                      multiline
                      rows={4}
                      {...register('bio')}
                      disabled={!editing}
                      placeholder="Tell us about yourself and your fashion style..."
                    />
                  </Grid>

                  {editing && (
                    <Grid item xs={12}>
                      <Box sx={{ display: 'flex', gap: 2 }}>
                        <Button
                          type="submit"
                          variant="contained"
                          startIcon={loading ? <CircularProgress size={20} /> : <Save />}
                          disabled={loading}
                        >
                          {loading ? 'Saving...' : 'Save Changes'}
                        </Button>
                        <Button
                          variant="outlined"
                          onClick={() => {
                            setEditing(false);
                            reset();
                          }}
                        >
                          Cancel
                        </Button>
                      </Box>
                    </Grid>
                  )}
                </Grid>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );

  const ActivityTab = () => {
    const userItems = sampleItems.filter(item => item.userId === currentUser?.uid);
    const userSwaps = sampleSwaps.filter(swap => 
      swap.requesterId === currentUser?.uid || swap.ownerId === currentUser?.uid
    );

    return (
      <Box>
        <Typography variant="h6" sx={{ mb: 3 }}>
          Activity History
        </Typography>

        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Card>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <Inventory sx={{ mr: 1, color: 'primary.main' }} />
                  <Typography variant="h6">My Items ({userItems.length})</Typography>
                </Box>
                
                <List>
                  {userItems.slice(0, 5).map((item, index) => (
                    <ListItem key={index} divider>
                      <ListItemAvatar>
                        <Avatar src={item.images[0]} alt={item.title} />
                      </ListItemAvatar>
                      <ListItemText
                        primary={item.title}
                        secondary={
                          <Box sx={{ display: 'flex', gap: 1, mt: 1 }}>
                            <Chip label={item.status} color="primary" size="small" />
                            <Chip label={`${item.pointsRequired} pts`} size="small" variant="outlined" />
                          </Box>
                        }
                      />
                    </ListItem>
                  ))}
                </List>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={6}>
            <Card>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <SwapHoriz sx={{ mr: 1, color: 'secondary.main' }} />
                  <Typography variant="h6">My Swaps ({userSwaps.length})</Typography>
                </Box>
                
                <List>
                  {userSwaps.slice(0, 5).map((swap, index) => (
                    <ListItem key={index} divider>
                      <ListItemAvatar>
                        <Avatar>
                          <SwapHoriz />
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText
                        primary={swap.itemTitle}
                        secondary={
                          <Box>
                            <Typography variant="body2" color="text.secondary">
                              with {swap.requesterId === currentUser?.uid ? swap.ownerName : swap.requesterName}
                            </Typography>
                            <Chip
                              label={swap.status}
                              color={
                                swap.status === 'accepted' ? 'success' :
                                swap.status === 'rejected' ? 'error' :
                                'warning'
                              }
                              size="small"
                              sx={{ mt: 1 }}
                            />
                          </Box>
                        }
                      />
                    </ListItem>
                  ))}
                </List>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>
    );
  };

  const SettingsTab = () => (
    <Box>
      <Typography variant="h6" sx={{ mb: 3 }}>
        Account Settings
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 2 }}>
                Privacy Settings
              </Typography>
              
              <Box sx={{ mb: 2 }}>
                <Typography variant="body2" sx={{ mb: 1 }}>
                  Email notifications
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Receive updates about swaps and new items
                </Typography>
              </Box>

              <Box sx={{ mb: 2 }}>
                <Typography variant="body2" sx={{ mb: 1 }}>
                  Profile visibility
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Control who can see your profile and items
                </Typography>
              </Box>

              <Box sx={{ mb: 2 }}>
                <Typography variant="body2" sx={{ mb: 1 }}>
                  Location sharing
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Share your location for better matching
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 2 }}>
                Danger Zone
              </Typography>
              
              <Alert severity="warning" sx={{ mb: 2 }}>
                These actions cannot be undone. Please be careful.
              </Alert>

              <Box sx={{ mb: 2 }}>
                <Button
                  variant="outlined"
                  color="error"
                  onClick={() => setDeleteDialogOpen(true)}
                >
                  Delete Account
                </Button>
                <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                  Permanently delete your account and all associated data
                </Typography>
              </Box>
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
            My Profile
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Manage your account settings and view your activity
          </Typography>
        </Box>

        <Card>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs value={activeTab} onChange={handleTabChange}>
              <Tab label="Profile" />
              <Tab label="Activity" />
              <Tab label="Settings" />
            </Tabs>
          </Box>

          <Box sx={{ p: 3 }}>
            {activeTab === 0 && <ProfileTab />}
            {activeTab === 1 && <ActivityTab />}
            {activeTab === 2 && <SettingsTab />}
          </Box>
        </Card>
      </motion.div>

      {/* Delete Account Dialog */}
      <Dialog
        open={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>Delete Account</DialogTitle>
        <DialogContent>
          <Alert severity="error" sx={{ mb: 2 }}>
            This action cannot be undone!
          </Alert>
          <Typography>
            Are you sure you want to delete your account? This will permanently remove:
          </Typography>
          <ul>
            <li>Your profile and personal information</li>
            <li>All your listed items</li>
            <li>Your swap history</li>
            <li>Your points and achievements</li>
          </ul>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteDialogOpen(false)}>Cancel</Button>
          <Button onClick={handleDeleteAccount} color="error" variant="contained">
            Delete Account
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default Profile;