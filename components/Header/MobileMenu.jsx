import { useState, createElement } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import LoginIcon from '@mui/icons-material/Login';
import ChevronLeft from '@mui/icons-material/ChevronLeft';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Toolbar from '@mui/material/Toolbar';

import { userPropTypes } from '../../lib/propTypes';

const propTypes = {
  user: userPropTypes,
  // eslint-disable-next-line react/forbid-prop-types
  pages: PropTypes.arrayOf(PropTypes.object).isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  options: PropTypes.arrayOf(PropTypes.object).isRequired,
};

const defaultProps = {
  user: null,
};

function MobileMenu({ pages, options, user }) {
  const router = useRouter();
  const [anchorElNav, setAnchorElNav] = useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  return (
    <>
      <Box sx={{ flexGrow: 0, display: { xs: 'flex', md: 'none' } }}>
        <IconButton size="large" onClick={handleOpenNavMenu} color="inherit">
          <MenuIcon />
        </IconButton>
      </Box>

      <SwipeableDrawer
        anchor="left"
        open={Boolean(anchorElNav)}
        onClose={handleCloseNavMenu}
        onOpen={handleOpenNavMenu}
      >
        <Toolbar sx={{ justifyContent: 'flex-end' }}>
          <IconButton size="large" onClick={handleCloseNavMenu} color="inherit">
            <ChevronLeft />
          </IconButton>
        </Toolbar>
        <Divider />
        <Box
          sx={{ width: 250 }}
          role="presentation"
          onClick={handleCloseNavMenu}
          onKeyDown={handleCloseNavMenu}
        >
          <List>
            {pages.map((page) => (
              <ListItem key={page.key} disablePadding>
                <Link href={page.to} passHref>
                  <ListItemButton selected={page.to === router.asPath}>
                    {page.icon && <ListItemIcon>{createElement(page.icon)}</ListItemIcon>}
                    <ListItemText>{page.text}</ListItemText>
                  </ListItemButton>
                </Link>
              </ListItem>
            ))}
          </List>
          <Divider />

          {!user && (
            <List>
              <ListItem disablePadding>
                <Link href="/login" passHref>
                  <ListItemButton selected={router.asPath === '/login'}>
                    <ListItemIcon>
                      <LoginIcon />
                    </ListItemIcon>
                    <ListItemText>Login</ListItemText>
                  </ListItemButton>
                </Link>
              </ListItem>
            </List>
          )}

          {user && (
            <List>
              {options.map((option) => (
                <ListItem key={option.key} disablePadding>
                  <Link href={option.to} passHref>
                    <ListItemButton selected={option.to === router.asPath}>
                      {option.icon && <ListItemIcon>{createElement(option.icon)}</ListItemIcon>}
                      <ListItemText>{option.text}</ListItemText>
                    </ListItemButton>
                  </Link>
                </ListItem>
              ))}
            </List>
          )}
        </Box>
      </SwipeableDrawer>
    </>
  );
}

MobileMenu.propTypes = propTypes;
MobileMenu.defaultProps = defaultProps;

export default MobileMenu;
