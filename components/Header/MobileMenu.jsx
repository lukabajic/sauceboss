import { useState, createElement } from 'react';
import Link from 'next/link';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';

const propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  pages: PropTypes.arrayOf(PropTypes.object).isRequired,
};

function MobileMenu({ pages }) {
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
                <Link href={page.to} passHref>
                  <ListItemButton>
                    <ListItemIcon>{createElement(page.icon)}</ListItemIcon>
                    <ListItemText>{page.text}</ListItemText>
                  </ListItemButton>
                </Link>
              </ListItem>
            ))}
          </List>
          <Divider />
        </Box>
      </SwipeableDrawer>
    </>
  );
}

MobileMenu.propTypes = propTypes;

export default MobileMenu;
