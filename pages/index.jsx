import Head from 'next/head';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

import withAuth from '../lib/withAuth';
// import { userPropTypes } from '../lib/propTypes';

// const propTypes = {
//   user: userPropTypes,
// };

// const defaultProps = {
//   user: null,
// };

// TODO: fetch server side number of products and number of customers
// TODO: fetch server page content
// TODO: change text to serbian

function Index() {
  return (
    <>
      <Head>
        <title>Sauceboss</title>
        <meta
          name="description"
          content="Domaći slatki čili. Izvanredni ukusi retkih egzotičnih paprika sa svih strana sveta. Saznajte više. Kupite odmah."
        />
      </Head>
      <Box sx={{ minHeight: '100vh', width: '100%', position: 'relative' }}>
        <Box
          component="img"
          src="/banner.jpg"
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
                Domaći slatki čili
              </Typography>

              <Typography
                variant="body1"
                component="p"
                color="lightgray"
                fontWeight="400"
                sx={{ maxWidth: 280, mb: 2, textAlign: { xs: 'center', sm: 'left' } }}
              >
                Izvanredni ukusi retkih egzotičnih paprika sa svih strana sveta
              </Typography>

              <Box sx={{ display: 'flex' }}>
                <Button variant="outlined" color="tertiary" sx={{ mr: 3 }}>
                  Saznajte više
                </Button>
                <Button variant="outlined" color="tertiary">
                  Kupite
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
                  Mušterija
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
                  Proizvoda
                </Typography>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
}

// Index.propTypes = propTypes;
// Index.defaultProps = defaultProps;

export default withAuth(Index);
