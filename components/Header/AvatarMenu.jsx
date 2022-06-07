import { useState } from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import Box from '@mui/material/Box';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';

const options = [
  { text: 'Profile', to: '/profile', key: 'profile' },
  { text: 'Got questions?', to: '/questions', key: 'questions' },
  { text: 'Logout', to: '/logout', key: 'logout' },
];

const propTypes = {
  displayName: PropTypes.string,
  avatarUrl: PropTypes.string,
};

const defaultProps = {
  displayName: null,
  avatarUrl: null,
};

function AvatarMenu({ displayName, avatarUrl }) {
  const [anchorElUser, setAnchorElUser] = useState(null);

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
      <Tooltip title="Open settings">
        <IconButton onClick={handleOpenUserMenu} sx={{ p: 0, ml: 0.8 }}>
          <Avatar sx={{ width: 30, height: 30 }} alt={displayName} src={avatarUrl} />
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
        {options.map((option) => (
          <Link key={option.key} href={option.to} passHref>
            <MenuItem onClick={handleCloseUserMenu}>
              <Typography textAlign="center">{option.text}</Typography>
            </MenuItem>
          </Link>
        ))}
      </Menu>
    </Box>
  );
}

AvatarMenu.propTypes = propTypes;
AvatarMenu.defaultProps = defaultProps;

export default AvatarMenu;
