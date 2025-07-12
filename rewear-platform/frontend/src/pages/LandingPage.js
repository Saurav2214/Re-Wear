import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Box,
  Typography,
  Button,
  Container,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Chip,
  Paper,
  Avatar,
  IconButton,
  useTheme,
  useMediaQuery
} from '@mui/material';
import {
  Eco,
  SwapHoriz,
  Stars,
  TrendingUp,
  ArrowForward,
  ArrowBack,
  ShoppingBag,
  People,
  Favorite
} from '@mui/icons-material';
import { motion, AnimatePresence } from 'framer-motion';
import { sampleItems } from '../utils/sampleData';

const LandingPage = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const featuredItems = sampleItems.slice(0, 6);
  const slidesPerView = isMobile ? 1 : 3;

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => 
        prev >= featuredItems.length - slidesPerView ? 0 : prev + 1
      );
    }, 4000);

    return () => clearInterval(timer);
  }, [featuredItems.length, slidesPerView]);

  const nextSlide = () => {
    setCurrentSlide((prev) => 
      prev >= featuredItems.length - slidesPerView ? 0 : prev + 1
    );
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => 
      prev <= 0 ? featuredItems.length - slidesPerView : prev - 1
    );
  };

  const HeroSection = () => (
    <Box
      sx={{
        background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark} 100%)`,
        color: 'white',
        py: { xs: 8, md: 12 },
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Background Pattern */}
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          opacity: 0.1,
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Cpath d='M20 20c0 6.627-5.373 12-12 12s-12-5.373-12-12 5.373-12 12-12 12 5.373 12 12zm0 0v-8c0-6.627 5.373-12 12-12s12 5.373 12 12-5.373 12-12 12h-8z'/%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />
      
      <Container maxWidth="lg">
        <Grid container spacing={4} alignItems="center">
          <Grid item xs={12} md={6}>
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <Typography
                variant="h1"
                component="h1"
                sx={{
                  fontSize: { xs: '2.5rem', md: '3.5rem' },
                  fontWeight: 700,
                  mb: 2,
                  lineHeight: 1.2,
                }}
              >
                Sustainable Fashion
                <br />
                <span style={{ color: theme.palette.secondary.main }}>
                  Starts Here
                </span>
              </Typography>
              
              <Typography
                variant="h6"
                sx={{
                  mb: 4,
                  opacity: 0.9,
                  fontSize: { xs: '1.1rem', md: '1.25rem' },
                  lineHeight: 1.6,
                }}
              >
                Transform your wardrobe through direct clothing swaps or our point-based system. 
                Join thousands reducing textile waste while discovering unique fashion pieces.
              </Typography>

              <Box sx={{ display: 'flex', gap: 2, mb: 4, flexWrap: 'wrap' }}>
                <Button
                  variant="contained"
                  size="large"
                  color="secondary"
                  component={Link}
                  to="/browse"
                  sx={{
                    px: 4,
                    py: 1.5,
                    fontSize: '1.1rem',
                    fontWeight: 600,
                  }}
                >
                  Start Swapping
                </Button>
                <Button
                  variant="outlined"
                  size="large"
                  component={Link}
                  to="/browse"
                  sx={{
                    px: 4,
                    py: 1.5,
                    fontSize: '1.1rem',
                    borderColor: 'white',
                    color: 'white',
                    '&:hover': { borderColor: 'white', backgroundColor: 'rgba(255,255,255,0.1)' }
                  }}
                >
                  Browse Items
                </Button>
              </Box>

              <Box sx={{ display: 'flex', gap: 4, flexWrap: 'wrap' }}>
                <Box sx={{ textAlign: 'center' }}>
                  <Typography variant="h4" sx={{ fontWeight: 700, color: theme.palette.secondary.main }}>
                    10K+
                  </Typography>
                  <Typography variant="body2" sx={{ opacity: 0.8 }}>
                    Items Swapped
                  </Typography>
                </Box>
                <Box sx={{ textAlign: 'center' }}>
                  <Typography variant="h4" sx={{ fontWeight: 700, color: theme.palette.secondary.main }}>
                    5K+
                  </Typography>
                  <Typography variant="body2" sx={{ opacity: 0.8 }}>
                    Happy Users
                  </Typography>
                </Box>
                <Box sx={{ textAlign: 'center' }}>
                  <Typography variant="h4" sx={{ fontWeight: 700, color: theme.palette.secondary.main }}>
                    50T
                  </Typography>
                  <Typography variant="body2" sx={{ opacity: 0.8 }}>
                    Textile Waste Saved
                  </Typography>
                </Box>
              </Box>
            </motion.div>
          </Grid>
          
          <Grid item xs={12} md={6}>
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <Box
                sx={{
                  position: 'relative',
                  textAlign: 'center',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  height: { xs: 300, md: 400 },
                }}
              >
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                >
                  <Eco sx={{ fontSize: { xs: 200, md: 300 }, opacity: 0.3 }} />
                </motion.div>
                <Box
                  sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    display: 'flex',
                    gap: 2,
                  }}
                >
                  <motion.div
                    animate={{ y: [0, -10, 0] }}
                    transition={{ duration: 2, repeat: Infinity, delay: 0 }}
                  >
                    <ShoppingBag sx={{ fontSize: 60, color: theme.palette.secondary.main }} />
                  </motion.div>
                  <motion.div
                    animate={{ y: [0, -10, 0] }}
                    transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
                  >
                    <SwapHoriz sx={{ fontSize: 60, color: 'white' }} />
                  </motion.div>
                  <motion.div
                    animate={{ y: [0, -10, 0] }}
                    transition={{ duration: 2, repeat: Infinity, delay: 1 }}
                  >
                    <Favorite sx={{ fontSize: 60, color: theme.palette.secondary.main }} />
                  </motion.div>
                </Box>
              </Box>
            </motion.div>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );

  const FeaturesSection = () => (
    <Container maxWidth="lg" sx={{ py: 8 }}>
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <Typography
          variant="h2"
          component="h2"
          sx={{
            textAlign: 'center',
            mb: 2,
            fontSize: { xs: '2rem', md: '2.5rem' },
            fontWeight: 700,
          }}
        >
          Why Choose ReWear?
        </Typography>
        <Typography
          variant="h6"
          sx={{
            textAlign: 'center',
            mb: 6,
            color: 'text.secondary',
            maxWidth: 600,
            mx: 'auto',
          }}
        >
          Join the sustainable fashion revolution with our innovative platform
        </Typography>
      </motion.div>

      <Grid container spacing={4}>
        {[
          {
            icon: <SwapHoriz sx={{ fontSize: 40 }} />,
            title: 'Direct Swaps',
            description: 'Exchange clothes directly with other users. Find the perfect match for your style.',
            color: theme.palette.primary.main,
          },
          {
            icon: <Stars sx={{ fontSize: 40 }} />,
            title: 'Points System',
            description: 'Earn points by listing items and redeem them for clothes you love.',
            color: theme.palette.secondary.main,
          },
          {
            icon: <Eco sx={{ fontSize: 40 }} />,
            title: 'Eco-Friendly',
            description: 'Reduce textile waste and promote sustainable fashion practices.',
            color: theme.palette.success.main,
          },
          {
            icon: <People sx={{ fontSize: 40 }} />,
            title: 'Community',
            description: 'Connect with like-minded fashion lovers in your area.',
            color: theme.palette.info.main,
          },
          {
            icon: <TrendingUp sx={{ fontSize: 40 }} />,
            title: 'Quality Items',
            description: 'All items are moderated to ensure quality and authenticity.',
            color: theme.palette.warning.main,
          },
          {
            icon: <ShoppingBag sx={{ fontSize: 40 }} />,
            title: 'Easy Listing',
            description: 'List your items quickly with our intuitive upload process.',
            color: theme.palette.error.main,
          },
        ].map((feature, index) => (
          <Grid item xs={12} md={4} key={index}>
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Paper
                elevation={3}
                sx={{
                  p: 3,
                  height: '100%',
                  textAlign: 'center',
                  transition: 'transform 0.3s ease-in-out',
                  '&:hover': {
                    transform: 'translateY(-5px)',
                  },
                }}
              >
                <Avatar
                  sx={{
                    bgcolor: feature.color,
                    width: 64,
                    height: 64,
                    mx: 'auto',
                    mb: 2,
                  }}
                >
                  {feature.icon}
                </Avatar>
                <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
                  {feature.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {feature.description}
                </Typography>
              </Paper>
            </motion.div>
          </Grid>
        ))}
      </Grid>
    </Container>
  );

  const FeaturedItemsSection = () => (
    <Box sx={{ bgcolor: 'background.default', py: 8 }}>
      <Container maxWidth="lg">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <Typography
            variant="h2"
            component="h2"
            sx={{
              textAlign: 'center',
              mb: 2,
              fontSize: { xs: '2rem', md: '2.5rem' },
              fontWeight: 700,
            }}
          >
            Featured Items
          </Typography>
          <Typography
            variant="h6"
            sx={{
              textAlign: 'center',
              mb: 6,
              color: 'text.secondary',
            }}
          >
            Discover amazing items from our community
          </Typography>
        </motion.div>

        <Box sx={{ position: 'relative', overflow: 'hidden' }}>
          <IconButton
            onClick={prevSlide}
            sx={{
              position: 'absolute',
              left: -20,
              top: '50%',
              transform: 'translateY(-50%)',
              zIndex: 2,
              bgcolor: 'background.paper',
              boxShadow: 2,
              '&:hover': { bgcolor: 'background.paper' },
            }}
          >
            <ArrowBack />
          </IconButton>

          <IconButton
            onClick={nextSlide}
            sx={{
              position: 'absolute',
              right: -20,
              top: '50%',
              transform: 'translateY(-50%)',
              zIndex: 2,
              bgcolor: 'background.paper',
              boxShadow: 2,
              '&:hover': { bgcolor: 'background.paper' },
            }}
          >
            <ArrowForward />
          </IconButton>

          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.5 }}
            >
              <Grid container spacing={3}>
                {featuredItems
                  .slice(currentSlide, currentSlide + slidesPerView)
                  .map((item, index) => (
                    <Grid item xs={12} md={4} key={item.id}>
                      <Card
                        sx={{
                          height: '100%',
                          cursor: 'pointer',
                          transition: 'transform 0.3s ease-in-out',
                          '&:hover': {
                            transform: 'scale(1.03)',
                          },
                        }}
                        onClick={() => navigate(`/item/${item.id}`)}
                      >
                        <CardMedia
                          component="img"
                          height="200"
                          image={item.images[0]}
                          alt={item.title}
                        />
                        <CardContent>
                          <Typography variant="h6" sx={{ mb: 1, fontWeight: 600 }}>
                            {item.title}
                          </Typography>
                          <Typography
                            variant="body2"
                            color="text.secondary"
                            sx={{ mb: 2 }}
                          >
                            {item.description.substring(0, 100)}...
                          </Typography>
                          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <Chip
                              label={`${item.pointsRequired} pts`}
                              color="primary"
                              size="small"
                            />
                            <Typography variant="body2" color="text.secondary">
                              {item.condition}
                            </Typography>
                          </Box>
                        </CardContent>
                      </Card>
                    </Grid>
                  ))}
              </Grid>
            </motion.div>
          </AnimatePresence>
        </Box>

        <Box sx={{ textAlign: 'center', mt: 4 }}>
          <Button
            variant="contained"
            size="large"
            component={Link}
            to="/browse"
            sx={{ px: 4, py: 1.5 }}
          >
            View All Items
          </Button>
        </Box>
      </Container>
    </Box>
  );

  const CTASection = () => (
    <Box
      sx={{
        bgcolor: theme.palette.primary.main,
        color: 'white',
        py: 8,
        textAlign: 'center',
      }}
    >
      <Container maxWidth="md">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <Typography
            variant="h2"
            component="h2"
            sx={{
              mb: 2,
              fontSize: { xs: '2rem', md: '2.5rem' },
              fontWeight: 700,
            }}
          >
            Ready to Start Your Sustainable Fashion Journey?
          </Typography>
          <Typography
            variant="h6"
            sx={{
              mb: 4,
              opacity: 0.9,
              maxWidth: 600,
              mx: 'auto',
            }}
          >
            Join thousands of users who are already making a difference. List your first item today!
          </Typography>
          <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Button
              variant="contained"
              size="large"
              color="secondary"
              component={Link}
              to="/register"
              sx={{
                px: 4,
                py: 1.5,
                fontSize: '1.1rem',
                fontWeight: 600,
              }}
            >
              Get Started
            </Button>
            <Button
              variant="outlined"
              size="large"
              component={Link}
              to="/browse"
              sx={{
                px: 4,
                py: 1.5,
                fontSize: '1.1rem',
                borderColor: 'white',
                color: 'white',
                '&:hover': { borderColor: 'white', backgroundColor: 'rgba(255,255,255,0.1)' }
              }}
            >
              Browse Items
            </Button>
          </Box>
        </motion.div>
      </Container>
    </Box>
  );

  return (
    <Box>
      <HeroSection />
      <FeaturesSection />
      <FeaturedItemsSection />
      <CTASection />
    </Box>
  );
};

export default LandingPage;