import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Container,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Chip,
  Paper,
  IconButton,
  InputAdornment,
  Pagination,
  CircularProgress,
  Alert
} from '@mui/material';
import {
  Search,
  FilterList,
  GridView,
  ViewList,
  FavoriteBorder,
  LocationOn,
  Stars
} from '@mui/icons-material';
import { motion } from 'framer-motion';
import { sampleItems, categories, sizes, conditions } from '../utils/sampleData';

const Browse = () => {
  const [items, setItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedCondition, setSelectedCondition] = useState('');
  const [priceRange, setPriceRange] = useState([0, 100]);
  const [sortBy, setSortBy] = useState('newest');
  const [viewMode, setViewMode] = useState('grid');
  const [currentPage, setCurrentPage] = useState(1);
  const [showFilters, setShowFilters] = useState(false);
  const itemsPerPage = 12;

  const navigate = useNavigate();

  useEffect(() => {
    // Simulate API call
    const fetchItems = async () => {
      setLoading(true);
      try {
        // In a real app, this would be an API call
        setTimeout(() => {
          setItems(sampleItems);
          setFilteredItems(sampleItems);
          setLoading(false);
        }, 1000);
      } catch (error) {
        console.error('Error fetching items:', error);
        setLoading(false);
      }
    };

    fetchItems();
  }, []);

  useEffect(() => {
    let filtered = items;

    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(item =>
        item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    // Apply category filter
    if (selectedCategory) {
      filtered = filtered.filter(item => item.category === selectedCategory);
    }

    // Apply size filter
    if (selectedSize) {
      filtered = filtered.filter(item => item.size === selectedSize);
    }

    // Apply condition filter
    if (selectedCondition) {
      filtered = filtered.filter(item => item.condition === selectedCondition);
    }

    // Apply price range filter (points required)
    filtered = filtered.filter(item => 
      item.pointsRequired >= priceRange[0] && item.pointsRequired <= priceRange[1]
    );

    // Apply sorting
    switch (sortBy) {
      case 'newest':
        filtered.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        break;
      case 'oldest':
        filtered.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
        break;
      case 'points_low':
        filtered.sort((a, b) => a.pointsRequired - b.pointsRequired);
        break;
      case 'points_high':
        filtered.sort((a, b) => b.pointsRequired - a.pointsRequired);
        break;
      case 'name':
        filtered.sort((a, b) => a.title.localeCompare(b.title));
        break;
      default:
        break;
    }

    setFilteredItems(filtered);
    setCurrentPage(1);
  }, [items, searchTerm, selectedCategory, selectedSize, selectedCondition, priceRange, sortBy]);

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedCategory('');
    setSelectedSize('');
    setSelectedCondition('');
    setPriceRange([0, 100]);
    setSortBy('newest');
  };

  const paginatedItems = filteredItems.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const FilterSection = () => (
    <Paper elevation={2} sx={{ p: 3, mb: 3 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
        <FilterList sx={{ mr: 1 }} />
        <Typography variant="h6">Filters</Typography>
        <Button
          onClick={clearFilters}
          sx={{ ml: 'auto' }}
          size="small"
        >
          Clear All
        </Button>
      </Box>

      <Grid container spacing={2}>
        <Grid item xs={12} sm={6} md={3}>
          <TextField
            fullWidth
            label="Search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Search />
                </InputAdornment>
              ),
            }}
          />
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <FormControl fullWidth>
            <InputLabel>Category</InputLabel>
            <Select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              label="Category"
            >
              <MenuItem value="">All Categories</MenuItem>
              {categories.map(category => (
                <MenuItem key={category} value={category}>
                  {category}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={12} sm={6} md={2}>
          <FormControl fullWidth>
            <InputLabel>Size</InputLabel>
            <Select
              value={selectedSize}
              onChange={(e) => setSelectedSize(e.target.value)}
              label="Size"
            >
              <MenuItem value="">All Sizes</MenuItem>
              {sizes.map(size => (
                <MenuItem key={size} value={size}>
                  {size}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={12} sm={6} md={2}>
          <FormControl fullWidth>
            <InputLabel>Condition</InputLabel>
            <Select
              value={selectedCondition}
              onChange={(e) => setSelectedCondition(e.target.value)}
              label="Condition"
            >
              <MenuItem value="">All Conditions</MenuItem>
              {conditions.map(condition => (
                <MenuItem key={condition} value={condition}>
                  {condition}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={12} sm={6} md={2}>
          <FormControl fullWidth>
            <InputLabel>Sort By</InputLabel>
            <Select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              label="Sort By"
            >
              <MenuItem value="newest">Newest First</MenuItem>
              <MenuItem value="oldest">Oldest First</MenuItem>
              <MenuItem value="points_low">Points: Low to High</MenuItem>
              <MenuItem value="points_high">Points: High to Low</MenuItem>
              <MenuItem value="name">Name: A to Z</MenuItem>
            </Select>
          </FormControl>
        </Grid>
      </Grid>
    </Paper>
  );

  const ItemCard = ({ item }) => (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <Card
        sx={{
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          cursor: 'pointer',
          transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
          '&:hover': {
            transform: 'translateY(-4px)',
            boxShadow: 6,
          },
        }}
        onClick={() => navigate(`/item/${item.id}`)}
      >
        <CardMedia
          component="img"
          height="200"
          image={item.images[0]}
          alt={item.title}
          sx={{ objectFit: 'cover' }}
        />
        <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
          <Typography variant="h6" sx={{ mb: 1, fontWeight: 600 }}>
            {item.title}
          </Typography>
          
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ mb: 2, flexGrow: 1 }}
          >
            {item.description.substring(0, 100)}...
          </Typography>

          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5, mb: 2 }}>
            {item.tags.slice(0, 3).map((tag, index) => (
              <Chip
                key={index}
                label={tag}
                size="small"
                variant="outlined"
                sx={{ fontSize: '0.7rem' }}
              />
            ))}
          </Box>

          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Stars sx={{ color: 'primary.main', mr: 0.5, fontSize: 18 }} />
              <Typography variant="body2" sx={{ fontWeight: 600 }}>
                {item.pointsRequired} pts
              </Typography>
            </Box>
            <Chip
              label={item.condition}
              size="small"
              color="secondary"
              variant="outlined"
            />
          </Box>

          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <LocationOn sx={{ fontSize: 16, color: 'text.secondary', mr: 0.5 }} />
              <Typography variant="body2" color="text.secondary">
                {item.location}
              </Typography>
            </Box>
            <Typography variant="body2" color="text.secondary">
              Size: {item.size}
            </Typography>
          </Box>
        </CardContent>
      </Card>
    </motion.div>
  );

  const ItemsList = ({ item }) => (
    <motion.div
      layout
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.4 }}
    >
      <Card
        sx={{
          display: 'flex',
          mb: 2,
          cursor: 'pointer',
          transition: 'transform 0.3s ease-in-out',
          '&:hover': {
            transform: 'translateX(4px)',
          },
        }}
        onClick={() => navigate(`/item/${item.id}`)}
      >
        <CardMedia
          component="img"
          sx={{ width: 200, height: 150, objectFit: 'cover' }}
          image={item.images[0]}
          alt={item.title}
        />
        <CardContent sx={{ flex: 1 }}>
          <Typography variant="h6" sx={{ mb: 1, fontWeight: 600 }}>
            {item.title}
          </Typography>
          
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            {item.description.substring(0, 200)}...
          </Typography>

          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5, mb: 2 }}>
            {item.tags.map((tag, index) => (
              <Chip
                key={index}
                label={tag}
                size="small"
                variant="outlined"
                sx={{ fontSize: '0.7rem' }}
              />
            ))}
          </Box>

          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Stars sx={{ color: 'primary.main', mr: 0.5, fontSize: 18 }} />
              <Typography variant="body2" sx={{ fontWeight: 600, mr: 2 }}>
                {item.pointsRequired} pts
              </Typography>
              <Chip
                label={item.condition}
                size="small"
                color="secondary"
                variant="outlined"
              />
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <LocationOn sx={{ fontSize: 16, color: 'text.secondary', mr: 0.5 }} />
              <Typography variant="body2" color="text.secondary" sx={{ mr: 2 }}>
                {item.location}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Size: {item.size}
              </Typography>
            </Box>
          </Box>
        </CardContent>
      </Card>
    </motion.div>
  );

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

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" component="h1" sx={{ mb: 2, fontWeight: 700 }}>
          Browse Items
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Discover amazing clothing items from our sustainable fashion community
        </Typography>
      </Box>

      <FilterSection />

      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h6">
          {filteredItems.length} items found
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <IconButton
            onClick={() => setViewMode('grid')}
            color={viewMode === 'grid' ? 'primary' : 'default'}
          >
            <GridView />
          </IconButton>
          <IconButton
            onClick={() => setViewMode('list')}
            color={viewMode === 'list' ? 'primary' : 'default'}
          >
            <ViewList />
          </IconButton>
        </Box>
      </Box>

      {filteredItems.length === 0 ? (
        <Alert severity="info" sx={{ mb: 4 }}>
          No items found matching your criteria. Try adjusting your filters.
        </Alert>
      ) : (
        <>
          {viewMode === 'grid' ? (
            <Grid container spacing={3}>
              {paginatedItems.map((item) => (
                <Grid item key={item.id} xs={12} sm={6} md={4} lg={3}>
                  <ItemCard item={item} />
                </Grid>
              ))}
            </Grid>
          ) : (
            <Box>
              {paginatedItems.map((item) => (
                <ItemsList key={item.id} item={item} />
              ))}
            </Box>
          )}

          {filteredItems.length > itemsPerPage && (
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
              <Pagination
                count={Math.ceil(filteredItems.length / itemsPerPage)}
                page={currentPage}
                onChange={handlePageChange}
                color="primary"
                size="large"
              />
            </Box>
          )}
        </>
      )}
    </Container>
  );
};

export default Browse;