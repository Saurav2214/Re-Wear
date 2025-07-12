import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Box,
  Container,
  Grid,
  Typography,
  Button,
  Card,
  CardContent,
  CardMedia,
  Chip,
  Avatar,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Alert,
  Divider,
  Paper,
  IconButton,
  CircularProgress
} from '@mui/material';
import {
  SwapHoriz,
  Stars,
  LocationOn,
  Person,
  ArrowBack,
  Favorite,
  FavoriteBorder,
  Share,
  ArrowForward,
  ArrowBack as ArrowBackIcon
} from '@mui/icons-material';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import { useAuth } from '../contexts/AuthContext';
import { sampleItems } from '../utils/sampleData';

const ItemDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { currentUser, userData } = useAuth();
  
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [swapDialogOpen, setSwapDialogOpen] = useState(false);
  const [redeemDialogOpen, setRedeemDialogOpen] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [swapMessage, setSwapMessage] = useState('');
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    const fetchItem = async () => {
      setLoading(true);
      try {
        // Simulate API call
        const foundItem = sampleItems.find(item => item.id === id);
        if (foundItem) {
          setItem(foundItem);
        } else {
          toast.error('Item not found');
          navigate('/browse');
        }
      } catch (error) {
        console.error('Error fetching item:', error);
        toast.error('Failed to load item');
      } finally {
        setLoading(false);
      }
    };

    fetchItem();
  }, [id, navigate]);

  const handleSwapRequest = async () => {
    if (!currentUser) {
      toast.error('Please log in to request a swap');
      navigate('/login');
      return;
    }

    try {
      // In a real app, this would be an API call
      console.log('Swap request:', {
        itemId: item.id,
        message: swapMessage,
        requesterId: currentUser.uid
      });
      
      toast.success('Swap request sent successfully!');
      setSwapDialogOpen(false);
      setSwapMessage('');
    } catch (error) {
      console.error('Error sending swap request:', error);
      toast.error('Failed to send swap request');
    }
  };

  const handlePointRedemption = async () => {
    if (!currentUser) {
      toast.error('Please log in to redeem points');
      navigate('/login');
      return;
    }

    if (userData.points < item.pointsRequired) {
      toast.error('Insufficient points for this item');
      return;
    }

    try {
      // In a real app, this would be an API call
      console.log('Point redemption:', {
        itemId: item.id,
        pointsUsed: item.pointsRequired,
        userId: currentUser.uid
      });
      
      toast.success('Item redeemed successfully!');
      setRedeemDialogOpen(false);
      navigate('/dashboard');
    } catch (error) {
      console.error('Error redeeming item:', error);
      toast.error('Failed to redeem item');
    }
  };

  const handleFavorite = () => {
    setIsFavorite(!isFavorite);
    toast.success(isFavorite ? 'Removed from favorites' : 'Added to favorites');
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: item.title,
          text: `Check out this ${item.title} on ReWear!`,
          url: window.location.href,
        });
      } catch (error) {
        console.log('Error sharing:', error);
      }
    } else {
      // Fallback - copy to clipboard
      navigator.clipboard.writeText(window.location.href);
      toast.success('Link copied to clipboard!');
    }
  };

  if (loading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="60vh"
      >
        <CircularProgress />
      </Box>
    );
  }

  if (!item) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Alert severity="error">Item not found</Alert>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Button
        startIcon={<ArrowBack />}
        onClick={() => navigate('/browse')}
        sx={{ mb: 3 }}
      >
        Back to Browse
      </Button>

      <Grid container spacing={4}>
        {/* Image Gallery */}
        <Grid item xs={12} md={6}>
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Card sx={{ mb: 2 }}>
              <CardMedia
                component="img"
                height="400"
                image={item.images[selectedImageIndex]}
                alt={item.title}
                sx={{ objectFit: 'cover' }}
              />
              <Box sx={{ display: 'flex', justifyContent: 'center', p: 1 }}>
                <IconButton
                  onClick={() => setSelectedImageIndex(Math.max(0, selectedImageIndex - 1))}
                  disabled={selectedImageIndex === 0}
                >
                  <ArrowBackIcon />
                </IconButton>
                <Typography variant="body2" sx={{ mx: 2, alignSelf: 'center' }}>
                  {selectedImageIndex + 1} / {item.images.length}
                </Typography>
                <IconButton
                  onClick={() => setSelectedImageIndex(Math.min(item.images.length - 1, selectedImageIndex + 1))}
                  disabled={selectedImageIndex === item.images.length - 1}
                >
                  <ArrowForward />
                </IconButton>
              </Box>
            </Card>
          </motion.div>
        </Grid>

        {/* Item Details */}
        <Grid item xs={12} md={6}>
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Box sx={{ mb: 3 }}>
              <Typography variant="h3" component="h1" sx={{ mb: 2, fontWeight: 700 }}>
                {item.title}
              </Typography>
              
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                <Chip
                  label={item.category}
                  color="primary"
                  variant="outlined"
                />
                <Chip
                  label={item.condition}
                  color="secondary"
                />
                <Chip
                  label={`Size: ${item.size}`}
                  variant="outlined"
                />
              </Box>

              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Stars sx={{ color: 'primary.main', mr: 1 }} />
                  <Typography variant="h5" sx={{ fontWeight: 600 }}>
                    {item.pointsRequired} points
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <LocationOn sx={{ color: 'text.secondary', mr: 0.5 }} />
                  <Typography variant="body2" color="text.secondary">
                    {item.location}
                  </Typography>
                </Box>
              </Box>

              <Typography variant="body1" sx={{ mb: 3, lineHeight: 1.6 }}>
                {item.description}
              </Typography>

              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 3 }}>
                {item.tags.map((tag, index) => (
                  <Chip
                    key={index}
                    label={tag}
                    size="small"
                    variant="outlined"
                    sx={{ fontSize: '0.8rem' }}
                  />
                ))}
              </Box>

              <Divider sx={{ my: 3 }} />

              {/* Action Buttons */}
              <Box sx={{ display: 'flex', gap: 2, mb: 3, flexWrap: 'wrap' }}>
                <Button
                  variant="contained"
                  size="large"
                  startIcon={<SwapHoriz />}
                  onClick={() => setSwapDialogOpen(true)}
                  sx={{ flex: 1, minWidth: 200 }}
                >
                  Request Swap
                </Button>
                <Button
                  variant="outlined"
                  size="large"
                  startIcon={<Stars />}
                  onClick={() => setRedeemDialogOpen(true)}
                  sx={{ flex: 1, minWidth: 200 }}
                  disabled={userData && userData.points < item.pointsRequired}
                >
                  Redeem with Points
                </Button>
              </Box>

              <Box sx={{ display: 'flex', gap: 1 }}>
                <IconButton
                  onClick={handleFavorite}
                  color={isFavorite ? 'primary' : 'default'}
                >
                  {isFavorite ? <Favorite /> : <FavoriteBorder />}
                </IconButton>
                <IconButton onClick={handleShare}>
                  <Share />
                </IconButton>
              </Box>

              {userData && userData.points < item.pointsRequired && (
                <Alert severity="warning" sx={{ mt: 2 }}>
                  You need {item.pointsRequired - userData.points} more points to redeem this item.
                </Alert>
              )}
            </Box>
          </motion.div>
        </Grid>
      </Grid>

      {/* Uploader Information */}
      <Grid container spacing={4} sx={{ mt: 4 }}>
        <Grid item xs={12}>
          <Paper elevation={2} sx={{ p: 3 }}>
            <Typography variant="h6" sx={{ mb: 2 }}>
              About the Uploader
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Avatar sx={{ width: 60, height: 60 }}>
                {item.uploaderName.charAt(0)}
              </Avatar>
              <Box>
                <Typography variant="h6">{item.uploaderName}</Typography>
                <Typography variant="body2" color="text.secondary">
                  {item.uploaderEmail}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Member since 2024
                </Typography>
              </Box>
            </Box>
          </Paper>
        </Grid>
      </Grid>

      {/* Swap Request Dialog */}
      <Dialog
        open={swapDialogOpen}
        onClose={() => setSwapDialogOpen(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>Request Item Swap</DialogTitle>
        <DialogContent>
          <Typography variant="body2" sx={{ mb: 2 }}>
            Send a message to {item.uploaderName} about swapping for "{item.title}"
          </Typography>
          <TextField
            fullWidth
            multiline
            rows={4}
            label="Your message"
            value={swapMessage}
            onChange={(e) => setSwapMessage(e.target.value)}
            placeholder="Hi! I'm interested in swapping for your item. I have..."
            sx={{ mt: 2 }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setSwapDialogOpen(false)}>Cancel</Button>
          <Button
            onClick={handleSwapRequest}
            variant="contained"
            disabled={!swapMessage.trim()}
          >
            Send Request
          </Button>
        </DialogActions>
      </Dialog>

      {/* Point Redemption Dialog */}
      <Dialog
        open={redeemDialogOpen}
        onClose={() => setRedeemDialogOpen(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>Redeem with Points</DialogTitle>
        <DialogContent>
          <Typography variant="body2" sx={{ mb: 2 }}>
            Are you sure you want to redeem "{item.title}" for {item.pointsRequired} points?
          </Typography>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', p: 2, bgcolor: 'background.default', borderRadius: 1 }}>
            <Typography>Your current points:</Typography>
            <Typography sx={{ fontWeight: 600 }}>{userData?.points || 0}</Typography>
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', p: 2, bgcolor: 'background.default', borderRadius: 1, mt: 1 }}>
            <Typography>Points after redemption:</Typography>
            <Typography sx={{ fontWeight: 600 }}>
              {(userData?.points || 0) - item.pointsRequired}
            </Typography>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setRedeemDialogOpen(false)}>Cancel</Button>
          <Button
            onClick={handlePointRedemption}
            variant="contained"
            color="primary"
          >
            Confirm Redemption
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default ItemDetail;