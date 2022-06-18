import Head from 'next/head';
import Box from '@mui/material/Box';
import useMediaQuery from '@mui/material/useMediaQuery';

import withAuth from '../lib/withAuth';
import { userPropTypes } from '../lib/propTypes';

const propTypes = {
  user: userPropTypes,
};

const defaultProps = {
  user: null,
};

function Index({ user }) {
  const isDesktop = useMediaQuery('(min-width: 992px)');

  const bannerImage = isDesktop ? '/banner-desktop.jpg' : '/banner-mobile.jpg';

  return (
    <main className="IndexPage">
      <Head>
        <title>Sauceboss</title>
        <meta name="description" content="This is the description of the Index page" />
      </Head>
      <Box sx={{ minHeight: '100vh', width: '100%', position: 'relative' }}>
        <Box
          component="img"
          src={bannerImage}
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            height: '100%',
            width: '100%',
            objectFit: 'cover',
            opacity: 0.4,
          }}
        />
      </Box>
      {user && <div style={{ color: 'wheat' }}>{user.email}</div>}
    </main>
  );
}

Index.propTypes = propTypes;
Index.defaultProps = defaultProps;

export default withAuth(Index);
