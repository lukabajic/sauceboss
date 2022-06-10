import Head from 'next/head';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import GoogleIcon from '@mui/icons-material/Google';

import withAuth from '../lib/withAuth';

function Login() {
  const handleLoginClicked = () => {};

  return (
    <Box sx={{ width: '100vw' }}>
      <Container
        maxWidth="lg"
        sx={{
          minHeight: '100vh',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'column',
          pt: 10,
          px: { xs: 2, md: 3 },
          pb: { xs: 2, md: 3 },
        }}
      >
        <Head>
          <title>Log in to Sauceboss</title>
          <meta
            name="description"
            content="Login page for Sauceboss. There are advantages to becoming a member. Get instant notifications on discounts and new products. Save your card data for easier purchasing."
          />
        </Head>
        <Typography
          align="center"
          variant="h3"
          component="h3"
          sx={{
            color: '#ffffff',
            mb: 2,
          }}
        >
          Login
        </Typography>
        <Typography
          align="center"
          variant="body1"
          sx={{
            color: '#ffffff',
            mb: 2,
          }}
        >
          There are advantages to becoming a member. Get instant notifications on discounts and new
          products. Save your card data for easier purchasing.
        </Typography>
        <Button
          variant="outlined"
          color="tertiary"
          startIcon={<GoogleIcon />}
          onClick={handleLoginClicked}
        >
          Log in with Google
        </Button>
      </Container>
    </Box>
  );
}

export default withAuth(Login, { logoutRequired: true });
