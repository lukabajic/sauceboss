import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Home from '@mui/icons-material/Home';
import Store from '@mui/icons-material/Store';
import Feed from '@mui/icons-material/Feed';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import List from '@mui/material/List';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';

import { userPropTypes } from '../propTypes';

const pages = [
  { text: 'Home', to: '/home', key: 'home', icon: Home },
  { text: 'Store', to: '/store', key: 'store', icon: Store },
  { text: 'News', to: '/news', key: 'news', icon: Feed },
];
const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];

const propTypes = {
  user: userPropTypes,
};

const defaultProps = {
  user: null,
};

function ResponsiveAppBar({ user }) {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Box
            component="img"
            sx={{
              display: { xs: 'none', md: 'flex' },
              maxWidth: 64,
              mr: 2,
            }}
            src="https://storage.cloud.google.com/sauceboss/logo.png?w=164&h=164&fit=crop&auto=format"
            srcSet="https://storage.cloud.google.com/sauceboss/logo.png?w=164&h=164&fit=crop&auto=format&dpr=2 2x"
            alt="Sauceboss"
          />

          <Box sx={{ flexGrow: 0, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            {/* <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              
            </Menu> */}
          </Box>

          <SwipeableDrawer
            anchor="left"
            open={Boolean(anchorElNav)}
            onClose={handleCloseNavMenu}
            onOpen={handleOpenNavMenu}
          >
            <Box
              sx={{ width: 250 }}
              role="presentation"
              onClick={handleCloseNavMenu}
              onKeyDown={handleCloseNavMenu}
            >
              <List>
                {pages.map((page) => (
                  <ListItem key={page.key} disablePadding>
                    <ListItemButton>
                      <ListItemIcon>{React.createElement(page.icon)}</ListItemIcon>
                      <ListItemText primary={page.text} />
                    </ListItemButton>
                  </ListItem>
                ))}
              </List>
              <Divider />
            </Box>
          </SwipeableDrawer>

          <Box
            component="div"
            sx={{
              mr: 2,
              flexGrow: 1,
              display: { xs: 'flex', md: 'none' },
              justifyContent: 'center',
            }}
          >
            <Box
              component="img"
              sx={{
                maxWidth: 64,
              }}
              src="https://storage.cloud.google.com/sauceboss/logo.png?w=164&h=164&fit=crop&auto=format"
              srcSet="https://storage.cloud.google.com/sauceboss/logo.png?w=164&h=164&fit=crop&auto=format&dpr=2 2x"
              alt="Sauceboss"
            />
          </Box>

          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page) => (
              <Button
                key={page.key}
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                {page.text}
              </Button>
            ))}
          </Box>

          {user && (
            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar
                    sx={{ width: 30, height: 30 }}
                    alt="Remy Sharp"
                    src="/static/images/avatar/2.jpg"
                  />
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: '45px' }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                {settings.map((setting) => (
                  <MenuItem key={setting} onClick={handleCloseUserMenu}>
                    <Typography textAlign="center">{setting}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
}

ResponsiveAppBar.propTypes = propTypes;
ResponsiveAppBar.defaultProps = defaultProps;

export default ResponsiveAppBar;
