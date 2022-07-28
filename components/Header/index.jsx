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
import GoogleIcon from '@mui/icons-material/Google';

import AvatarMenu from './AvatarMenu';
import MobileMenu from './MobileMenu';
import Logo from '../Logo';
import { userPropTypes } from '../../lib/propTypes';
import { useScrollDetect } from '../../lib/hooks';

const pages = [
  { text: 'Početna', to: '/', key: 'home', icon: Home },
  { text: 'Prodavnica', to: '/prodavnica', key: 'store', icon: Store },
  { text: 'Blog', to: '/blog', key: 'blog', icon: Feed },
];

const options = [
  { text: 'Profil', to: '/profil', key: 'profile', icon: PersonIcon },
  { text: 'Pitanja?', to: '/pitanja', key: 'questions', icon: HelpOutlineIcon },
  { text: 'Izloguj se', to: '/odjava', key: 'logout', icon: LogoutIcon },
];

const propTypes = {
  user: userPropTypes,
};

const defaultProps = {
  user: null,
};

function ResponsiveAppBar({ user }) {
  const [isScrolled] = useScrollDetect();

  const color = isScrolled ? 'primary' : 'transparent';
  const elevation = isScrolled ? 4 : 0;

  return (
    <AppBar position="fixed" color={color} elevation={elevation} sx={{ transition: 'all 0.4s' }}>
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
              <IconButton size="large" color="tertiary" onClick={() => {}} sx={{ my: 2 }}>
                <ShoppingCartIcon />
              </IconButton>
            </Box>

            {!user && (
              <Box sx={{ display: { xs: 'none', md: 'flex' }, my: 2 }}>
                <Link href="/prijava" passHref>
                  <Button variant="outlined" color="tertiary" startIcon={<GoogleIcon />}>
                    Prijavi se
                  </Button>
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
