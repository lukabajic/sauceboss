import Head from 'next/head';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import useMediaQuery from '@mui/material/useMediaQuery';
import ChevronRight from '@mui/icons-material/ChevronRight';

import withAuth from '../lib/withAuth';
// import { userPropTypes } from '../lib/propTypes';

// const propTypes = {
//   user: userPropTypes,
// };

// const defaultProps = {
//   user: null,
// };

function Index() {
  const isDesktop = useMediaQuery('(min-width: 900px)');
  const bannerImage = isDesktop ? '/banner-desktop.jpg' : '/banner-mobile.jpg';

  return (
    <main className="IndexPage">
      <Head>
        <title>Sauceboss</title>
        <meta
          name="description"
          content="Homemade sweet chilli. Exceptional flavours with rare exotic peppers from around the world. Read more. Buy now."
        />
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
            zIndex: 0,
          }}
        />
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            height: '100%',
            width: '100%',
            zIndex: 1,
            display: 'flex',
            alignItems: { xs: 'stretch', sm: 'flex-end' },
            pt: 10,
            px: { xs: 2, md: 3 },
            pb: { xs: 2, md: 3 },
          }}
        >
          <Box
            maxWidth="xl"
            margin="0 auto"
            sx={{
              width: '100%',
              display: 'flex',
              justifyContent: 'space-between',
              flexDirection: { xs: 'column', sm: 'row' },
              alignItems: { xs: 'stretch', sm: 'flex-end' },
              p: { xs: 0, sm: 6 },
            }}
          >
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: { xs: 'center', sm: 'flex-start' },
                pt: { xs: 3, md: 0 },
              }}
            >
              <Typography variant="h5" component="h5" color="white" fontWeight="500" sx={{ mb: 1 }}>
                Homemade sweet chilli
              </Typography>

              <Typography
                variant="p"
                component="p"
                color="lightgray"
                fontWeight="400"
                sx={{ maxWidth: 280, mb: 2, textAlign: { xs: 'center', sm: 'left' } }}
              >
                Exceptional flavours with rare exotic peppers from around the world
              </Typography>

              <Box sx={{ display: 'flex' }}>
                <Button variant="text" color="tertiary" endIcon={<ChevronRight />} sx={{ mr: 3 }}>
                  Learn more
                </Button>
                <Button variant="text" color="tertiary" endIcon={<ChevronRight />}>
                  Shop now
                </Button>
              </Box>
            </Box>
            <Box
              sx={{
                display: 'flex',
                justifyContent: { xs: 'space-between', sm: 'unset' },
                flexDirection: { xs: 'row', sm: 'column' },
              }}
            >
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                }}
              >
                <Typography variant="h4" component="h4" color="white" fontWeight="500">
                  982
                </Typography>
                <Typography
                  variant="h6"
                  component="h6"
                  color="lightgray"
                  fontWeight="400"
                  textTransform="uppercase"
                >
                  Customers
                </Typography>
              </Box>

              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                }}
              >
                <Typography
                  variant="h4"
                  component="h4"
                  color="white"
                  fontWeight="500"
                  sx={{
                    textAlign: { xs: 'right', sm: 'left' },
                  }}
                >
                  8
                </Typography>
                <Typography
                  variant="h6"
                  component="h6"
                  color="lightgray"
                  fontWeight="400"
                  textTransform="uppercase"
                >
                  Products
                </Typography>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </main>
  );
}

// Index.propTypes = propTypes;
// Index.defaultProps = defaultProps;

export default withAuth(Index);
