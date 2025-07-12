import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Menu,
  MenuItem,
  Avatar,
  Box,
  Badge,
  useTheme,
  useMediaQuery
} from '@mui/material';
import {
  Menu as MenuIcon,
  AccountCircle,
  ShoppingBag,
  Add,
  Dashboard,
  AdminPanelSettings,
  Logout,
  Login,
  PersonAdd
} from '@mui/icons-material';
import { useAuth } from '../contexts/AuthContext';

const Navbar = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [mobileMenuAnchorEl, setMobileMenuAnchorEl] = useState(null);
  const { currentUser, userData, logout } = useAuth();
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMenuAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMenuAnchorEl(null);
  };

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/');
      handleMenuClose();
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  const NavigationLinks = () => (
    <>
      <Button
        component={Link}
        to="/browse"
        color="inherit"
        sx={{ mx: 1 }}
      >
        Browse Items
      </Button>
      {currentUser && (
        <>
          <Button
            component={Link}
            to="/add-item"
            color="inherit"
            startIcon={<Add />}
            sx={{ mx: 1 }}
          >
            Add Item
          </Button>
          <Button
            component={Link}
            to="/dashboard"
            color="inherit"
            startIcon={<Dashboard />}
            sx={{ mx: 1 }}
          >
            Dashboard
          </Button>
        </>
      )}
    </>
  );

  const UserMenu = () => (
    <>
      <IconButton
        size="large"
        aria-label="account of current user"
        aria-controls="menu-appbar"
        aria-haspopup="true"
        onClick={handleMenuOpen}
        color="inherit"
      >
        <Badge badgeContent={userData?.points || 0} color="secondary">
          <Avatar sx={{ width: 32, height: 32 }}>
            {userData?.displayName?.charAt(0) || 'U'}
          </Avatar>
        </Badge>
      </IconButton>
      <Menu
        id="menu-appbar"
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        keepMounted
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        <MenuItem onClick={handleMenuClose} component={Link} to="/profile">
          <AccountCircle sx={{ mr: 1 }} />
          Profile
        </MenuItem>
        <MenuItem onClick={handleMenuClose} component={Link} to="/dashboard">
          <Dashboard sx={{ mr: 1 }} />
          Dashboard
        </MenuItem>
        {userData?.role === 'admin' && (
          <MenuItem onClick={handleMenuClose} component={Link} to="/admin">
            <AdminPanelSettings sx={{ mr: 1 }} />
            Admin Panel
          </MenuItem>
        )}
        <MenuItem onClick={handleLogout}>
          <Logout sx={{ mr: 1 }} />
          Logout
        </MenuItem>
      </Menu>
    </>
  );

  const GuestButtons = () => (
    <Box sx={{ display: 'flex', gap: 1 }}>
      <Button
        component={Link}
        to="/login"
        color="inherit"
        startIcon={<Login />}
      >
        Login
      </Button>
      <Button
        component={Link}
        to="/register"
        color="inherit"
        startIcon={<PersonAdd />}
        variant="outlined"
        sx={{ borderColor: 'white', '&:hover': { borderColor: 'white' } }}
      >
        Register
      </Button>
    </Box>
  );

  return (
    <AppBar position="fixed" sx={{ zIndex: theme.zIndex.drawer + 1 }}>
      <Toolbar>
        <ShoppingBag sx={{ mr: 2 }} />
        <Typography
          variant="h6"
          component={Link}
          to="/"
          sx={{
            flexGrow: 1,
            textDecoration: 'none',
            color: 'inherit',
            fontWeight: 700,
          }}
        >
          ReWear
        </Typography>

        {isMobile ? (
          <>
            <IconButton
              size="large"
              aria-label="show more"
              aria-controls="mobile-menu"
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="mobile-menu"
              anchorEl={mobileMenuAnchorEl}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(mobileMenuAnchorEl)}
              onClose={handleMobileMenuClose}
            >
              <MenuItem onClick={handleMobileMenuClose} component={Link} to="/browse">
                Browse Items
              </MenuItem>
              {currentUser ? (
                <>
                  <MenuItem onClick={handleMobileMenuClose} component={Link} to="/add-item">
                    Add Item
                  </MenuItem>
                  <MenuItem onClick={handleMobileMenuClose} component={Link} to="/dashboard">
                    Dashboard
                  </MenuItem>
                  <MenuItem onClick={handleMobileMenuClose} component={Link} to="/profile">
                    Profile
                  </MenuItem>
                  {userData?.role === 'admin' && (
                    <MenuItem onClick={handleMobileMenuClose} component={Link} to="/admin">
                      Admin Panel
                    </MenuItem>
                  )}
                  <MenuItem onClick={handleLogout}>
                    Logout
                  </MenuItem>
                </>
              ) : (
                <>
                  <MenuItem onClick={handleMobileMenuClose} component={Link} to="/login">
                    Login
                  </MenuItem>
                  <MenuItem onClick={handleMobileMenuClose} component={Link} to="/register">
                    Register
                  </MenuItem>
                </>
              )}
            </Menu>
          </>
        ) : (
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <NavigationLinks />
            {currentUser ? <UserMenu /> : <GuestButtons />}
          </Box>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;