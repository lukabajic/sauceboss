import Link from 'next/link';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Home from '@mui/icons-material/Home';
import Store from '@mui/icons-material/Store';
import Feed from '@mui/icons-material/Feed';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import PersonIcon from '@mui/icons-material/Person';
import LogoutIcon from '@mui/icons-material/Logout';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';

import AvatarMenu from './AvatarMenu';
import MobileMenu from './MobileMenu';
import Logo from '../Logo';
import { userPropTypes } from '../../lib/propTypes';

const pages = [
  { text: 'Home', to: '/', key: 'home', icon: Home },
  { text: 'Store', to: '/store', key: 'store', icon: Store },
  { text: 'News', to: '/news', key: 'news', icon: Feed },
];

const options = [
  { text: 'Profile', to: '/profile', key: 'profile', icon: PersonIcon },
  { text: 'Got questions?', to: '/questions', key: 'questions', icon: HelpOutlineIcon },
  { text: 'Logout', to: '/logout', key: 'logout', icon: LogoutIcon },
];

const propTypes = {
  user: userPropTypes,
};

const defaultProps = {
  user: null,
};

function ResponsiveAppBar({ user }) {
  return (
    <AppBar position="fixed">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Link href="/">
            <Box
              component="a"
              sx={{
                display: { xs: 'none', md: 'flex' },
                mr: 2,
                cursor: 'pointer',
              }}
            >
              <Logo />
            </Box>
          </Link>

          <MobileMenu pages={pages} options={options} user={user} />

          <Link href="/">
            <Box
              component="a"
              sx={{
                mr: 2,
                flexGrow: 1,
                display: { xs: 'flex', md: 'none' },
                justifyContent: 'center',
                cursor: 'pointer',
              }}
            >
              <Logo />
            </Box>
          </Link>

          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, justifyContent: 'center' }}>
            {pages.map((page) => (
              <Link key={page.key} href={page.to} passHref>
                <Button color="inherit" sx={{ my: 2, color: 'white', display: 'block' }}>
                  {page.text}
                </Button>
              </Link>
            ))}
          </Box>

          <Box sx={{ flexGrow: 0, display: 'flex' }}>
            <Box>
              <IconButton size="large" color="inherit" onClick={() => {}} sx={{ my: 2 }}>
                <ShoppingCartIcon />
              </IconButton>
            </Box>

            {!user && (
              <Box sx={{ display: { xs: 'none', md: 'flex' }, my: 2 }}>
                <Link href="/login" passHref>
                  <Button color="inherit">Login</Button>
                </Link>
              </Box>
            )}

            {user && (
              <AvatarMenu
                displayName={user.displayName}
                avatarUrl={user.avatarUrl}
                options={options}
              />
            )}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

ResponsiveAppBar.propTypes = propTypes;
ResponsiveAppBar.defaultProps = defaultProps;

export default ResponsiveAppBar;
