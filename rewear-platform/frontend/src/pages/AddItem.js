import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
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
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Chip,
  Paper,
  IconButton,
  Avatar,
  Stepper,
  Step,
  StepLabel,
  CircularProgress,
  Alert
} from '@mui/material';
import {
  CloudUpload,
  Add,
  Delete,
  ArrowBack,
  ArrowForward,
  Check
} from '@mui/icons-material';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import { useAuth } from '../contexts/AuthContext';
import { categories, sizes, conditions, itemTypes } from '../utils/sampleData';

const AddItem = () => {
  const { currentUser, userData } = useAuth();
  const navigate = useNavigate();
  const [activeStep, setActiveStep] = useState(0);
  const [selectedImages, setSelectedImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [tags, setTags] = useState([]);
  const [tagInput, setTagInput] = useState('');

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
    getValues
  } = useForm();

  const steps = ['Basic Information', 'Images & Details', 'Review & Submit'];

  const handleImageUpload = (event) => {
    const files = Array.from(event.target.files);
    
    files.forEach(file => {
      if (file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = (e) => {
          setSelectedImages(prev => [...prev, {
            file,
            url: e.target.result,
            name: file.name
          }]);
        };
        reader.readAsDataURL(file);
      }
    });
  };

  const removeImage = (index) => {
    setSelectedImages(prev => prev.filter((_, i) => i !== index));
  };

  const addTag = () => {
    if (tagInput.trim() && !tags.includes(tagInput.trim())) {
      setTags(prev => [...prev, tagInput.trim()]);
      setTagInput('');
    }
  };

  const removeTag = (tagToRemove) => {
    setTags(prev => prev.filter(tag => tag !== tagToRemove));
  };

  const handleNext = () => {
    setActiveStep(prev => prev + 1);
  };

  const handleBack = () => {
    setActiveStep(prev => prev - 1);
  };

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      // In a real app, this would upload images and create the item
      const itemData = {
        ...data,
        images: selectedImages.map(img => img.url), // In real app, these would be uploaded URLs
        tags,
        userId: currentUser.uid,
        uploaderName: userData.displayName,
        uploaderEmail: userData.email,
        pointsRequired: parseInt(data.pointsRequired),
        status: 'pending_approval'
      };

      console.log('Creating item:', itemData);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      toast.success('Item submitted successfully! It will be reviewed by our team.');
      navigate('/dashboard');
    } catch (error) {
      console.error('Error creating item:', error);
      toast.error('Failed to create item. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const BasicInformationStep = () => (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Typography variant="h6" sx={{ mb: 2 }}>
            Basic Information
          </Typography>
        </Grid>

        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Item Title"
            {...register('title', {
              required: 'Title is required',
              minLength: {
                value: 3,
                message: 'Title must be at least 3 characters'
              }
            })}
            error={!!errors.title}
            helperText={errors.title?.message}
            placeholder="e.g., Vintage Denim Jacket"
          />
        </Grid>

        <Grid item xs={12}>
          <TextField
            fullWidth
            multiline
            rows={4}
            label="Description"
            {...register('description', {
              required: 'Description is required',
              minLength: {
                value: 20,
                message: 'Description must be at least 20 characters'
              }
            })}
            error={!!errors.description}
            helperText={errors.description?.message}
            placeholder="Describe your item in detail - condition, style, fit, etc."
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <FormControl fullWidth error={!!errors.category}>
            <InputLabel>Category</InputLabel>
            <Select
              value={selectedCategory}
              onChange={(e) => {
                setSelectedCategory(e.target.value);
                setValue('category', e.target.value);
              }}
              label="Category"
              {...register('category', { required: 'Category is required' })}
            >
              {categories.map(category => (
                <MenuItem key={category} value={category}>
                  {category}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={12} sm={6}>
          <FormControl fullWidth error={!!errors.type}>
            <InputLabel>Type</InputLabel>
            <Select
              label="Type"
              {...register('type', { required: 'Type is required' })}
              disabled={!selectedCategory}
            >
              {selectedCategory && itemTypes[selectedCategory]?.map(type => (
                <MenuItem key={type} value={type}>
                  {type}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={12} sm={6}>
          <FormControl fullWidth error={!!errors.size}>
            <InputLabel>Size</InputLabel>
            <Select
              label="Size"
              {...register('size', { required: 'Size is required' })}
            >
              {sizes.map(size => (
                <MenuItem key={size} value={size}>
                  {size}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={12} sm={6}>
          <FormControl fullWidth error={!!errors.condition}>
            <InputLabel>Condition</InputLabel>
            <Select
              label="Condition"
              {...register('condition', { required: 'Condition is required' })}
            >
              {conditions.map(condition => (
                <MenuItem key={condition} value={condition}>
                  {condition}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            type="number"
            label="Points Required"
            {...register('pointsRequired', {
              required: 'Points required is required',
              min: {
                value: 10,
                message: 'Minimum 10 points required'
              },
              max: {
                value: 200,
                message: 'Maximum 200 points allowed'
              }
            })}
            error={!!errors.pointsRequired}
            helperText={errors.pointsRequired?.message || 'Points users need to redeem this item'}
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Location"
            {...register('location', { required: 'Location is required' })}
            error={!!errors.location}
            helperText={errors.location?.message}
            placeholder="e.g., New York, NY"
          />
        </Grid>
      </Grid>
    </motion.div>
  );

  const ImagesAndDetailsStep = () => (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Typography variant="h6" sx={{ mb: 2 }}>
            Images & Details
          </Typography>
        </Grid>

        <Grid item xs={12}>
          <Paper
            variant="outlined"
            sx={{
              p: 3,
              textAlign: 'center',
              backgroundColor: 'background.default'
            }}
          >
            <input
              type="file"
              multiple
              accept="image/*"
              onChange={handleImageUpload}
              style={{ display: 'none' }}
              id="image-upload"
            />
            <label htmlFor="image-upload">
              <IconButton component="span" size="large">
                <CloudUpload sx={{ fontSize: 48, color: 'primary.main' }} />
              </IconButton>
            </label>
            <Typography variant="h6" sx={{ mt: 2 }}>
              Upload Images
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Upload up to 5 images. First image will be the main photo.
            </Typography>
          </Paper>
        </Grid>

        {selectedImages.length > 0 && (
          <Grid item xs={12}>
            <Typography variant="subtitle1" sx={{ mb: 2 }}>
              Selected Images ({selectedImages.length})
            </Typography>
            <Grid container spacing={2}>
              {selectedImages.map((image, index) => (
                <Grid item xs={6} sm={4} md={3} key={index}>
                  <Card>
                    <Box
                      component="img"
                      src={image.url}
                      alt={`Upload ${index + 1}`}
                      sx={{
                        width: '100%',
                        height: 120,
                        objectFit: 'cover'
                      }}
                    />
                    <Box sx={{ p: 1, display: 'flex', justifyContent: 'space-between' }}>
                      <Typography variant="caption" noWrap>
                        {index === 0 ? 'Main' : `Photo ${index + 1}`}
                      </Typography>
                      <IconButton
                        size="small"
                        onClick={() => removeImage(index)}
                        color="error"
                      >
                        <Delete />
                      </IconButton>
                    </Box>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Grid>
        )}

        <Grid item xs={12}>
          <Typography variant="subtitle1" sx={{ mb: 2 }}>
            Tags
          </Typography>
          <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
            <TextField
              fullWidth
              label="Add tags"
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && addTag()}
              placeholder="e.g., vintage, casual, summer"
            />
            <Button
              variant="outlined"
              onClick={addTag}
              disabled={!tagInput.trim()}
              sx={{ minWidth: 100 }}
            >
              Add
            </Button>
          </Box>
          
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
            {tags.map((tag, index) => (
              <Chip
                key={index}
                label={tag}
                onDelete={() => removeTag(tag)}
                color="primary"
                variant="outlined"
              />
            ))}
          </Box>
        </Grid>
      </Grid>
    </motion.div>
  );

  const ReviewAndSubmitStep = () => {
    const formData = getValues();
    
    return (
      <motion.div
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Typography variant="h6" sx={{ mb: 2 }}>
              Review & Submit
            </Typography>
          </Grid>

          <Grid item xs={12} md={6}>
            <Card>
              <CardContent>
                <Typography variant="h6" sx={{ mb: 2 }}>
                  Item Preview
                </Typography>
                
                {selectedImages.length > 0 && (
                  <Box
                    component="img"
                    src={selectedImages[0].url}
                    alt="Main preview"
                    sx={{
                      width: '100%',
                      height: 200,
                      objectFit: 'cover',
                      borderRadius: 1,
                      mb: 2
                    }}
                  />
                )}

                <Typography variant="h6" sx={{ mb: 1 }}>
                  {formData.title}
                </Typography>
                
                <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
                  <Chip label={formData.category} color="primary" size="small" />
                  <Chip label={formData.condition} color="secondary" size="small" />
                  <Chip label={`Size: ${formData.size}`} variant="outlined" size="small" />
                </Box>

                <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                  {formData.description}
                </Typography>

                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Typography variant="h6" color="primary">
                    {formData.pointsRequired} points
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {formData.location}
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={6}>
            <Card>
              <CardContent>
                <Typography variant="h6" sx={{ mb: 2 }}>
                  Submission Details
                </Typography>
                
                <Box sx={{ mb: 2 }}>
                  <Typography variant="body2" color="text.secondary">
                    <strong>Category:</strong> {formData.category}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    <strong>Type:</strong> {formData.type}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    <strong>Size:</strong> {formData.size}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    <strong>Condition:</strong> {formData.condition}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    <strong>Points Required:</strong> {formData.pointsRequired}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    <strong>Location:</strong> {formData.location}
                  </Typography>
                </Box>

                <Box sx={{ mb: 2 }}>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                    <strong>Images:</strong> {selectedImages.length} uploaded
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                    <strong>Tags:</strong> {tags.length} added
                  </Typography>
                </Box>

                <Alert severity="info" sx={{ mt: 2 }}>
                  Your item will be reviewed by our team before going live. This usually takes 1-2 business days.
                </Alert>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </motion.div>
    );
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Button
        startIcon={<ArrowBack />}
        onClick={() => navigate('/dashboard')}
        sx={{ mb: 3 }}
      >
        Back to Dashboard
      </Button>

      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" component="h1" sx={{ mb: 2, fontWeight: 700 }}>
          Add New Item
        </Typography>
        <Typography variant="body1" color="text.secondary">
          List your clothing item for others to discover and swap
        </Typography>
      </Box>

      <Card>
        <CardContent sx={{ p: 4 }}>
          <Stepper activeStep={activeStep} alternativeLabel sx={{ mb: 4 }}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>

          <Box component="form" onSubmit={handleSubmit(onSubmit)}>
            {activeStep === 0 && <BasicInformationStep />}
            {activeStep === 1 && <ImagesAndDetailsStep />}
            {activeStep === 2 && <ReviewAndSubmitStep />}

            <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 4 }}>
              <Button
                disabled={activeStep === 0}
                onClick={handleBack}
                startIcon={<ArrowBack />}
              >
                Back
              </Button>
              
              <Box sx={{ display: 'flex', gap: 2 }}>
                {activeStep < steps.length - 1 ? (
                  <Button
                    variant="contained"
                    onClick={handleNext}
                    endIcon={<ArrowForward />}
                  >
                    Next
                  </Button>
                ) : (
                  <Button
                    type="submit"
                    variant="contained"
                    disabled={loading || selectedImages.length === 0}
                    startIcon={loading ? <CircularProgress size={20} /> : <Check />}
                  >
                    {loading ? 'Submitting...' : 'Submit Item'}
                  </Button>
                )}
              </Box>
            </Box>
          </Box>
        </CardContent>
      </Card>
    </Container>
  );
};

export default AddItem;