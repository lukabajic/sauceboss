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

import AvatarMenu from './AvatarMenu';
import MobileMenu from './MobileMenu';
import { userPropTypes } from '../../utils/propTypes';
import { logoProps } from '../../utils/general';

const pages = [
  { text: 'Home', to: '/home', key: 'home', icon: Home },
  { text: 'Store', to: '/store', key: 'store', icon: Store },
  { text: 'News', to: '/news', key: 'news', icon: Feed },
];

const propTypes = {
  user: userPropTypes,
};

const defaultProps = {
  user: null,
};

function ResponsiveAppBar({ user }) {
  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Box
            {...logoProps}
            sx={{
              display: { xs: 'none', md: 'flex' },
              maxWidth: 64,
              mr: 2,
            }}
          />

          <MobileMenu pages={pages} />

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
              {...logoProps}
              sx={{
                maxWidth: 64,
              }}
            />
          </Box>

          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page) => (
              <Button key={page.key} sx={{ my: 2, color: 'white', display: 'block' }}>
                {page.text}
              </Button>
            ))}
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <IconButton color="inherit" onClick={() => {}} sx={{ p: 0 }}>
              <ShoppingCartIcon />
            </IconButton>

            {!user && (
              <Link href="/login" passHref>
                <Button color="inherit">Login</Button>
              </Link>
            )}

            {user && <AvatarMenu user={user} />}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

ResponsiveAppBar.propTypes = propTypes;
ResponsiveAppBar.defaultProps = defaultProps;

export default ResponsiveAppBar;
