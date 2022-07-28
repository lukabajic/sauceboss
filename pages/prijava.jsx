import Head from 'next/head';
import Link from 'next/link';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import GoogleIcon from '@mui/icons-material/Google';

import withAuth from '../lib/withAuth';

function Login() {
  return (
    <>
      <Head>
        <title>Prijava - Sauceboss</title>
        <meta
          name="description"
          content="Stranica za prijavljivanje na Sauceboss. Ukoliko postanete član naše zajednice dobijate specijalne popuste personalizovane samo za vas. Prijavite se."
        />
      </Head>
      <Box sx={{ width: '100vw', minHeight: '100vh', position: 'relative' }}>
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
        <Container
          maxWidth="lg"
          sx={{
            position: 'relative',
            minHeight: '100vh',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'column',
            pt: 10,
            px: { xs: 2, md: 3 },
            pb: { xs: 2, md: 3 },
            zIndex: 1,
          }}
        >
          <Typography
            align="center"
            variant="h3"
            component="h3"
            sx={{
              color: '#ffffff',
              mb: 2,
            }}
          >
            Prijava
          </Typography>
          <Typography
            align="center"
            variant="body1"
            color="lightgray"
            sx={{
              maxWidth: 480,
              mb: 3,
            }}
          >
            Prijava je vrlo jednostavna, samo dva klika. Koristite već postojeći Google nalog.
            Ukoliko postanete član naše zajednice dobijate specijalne popuste personalizovane samo
            za vas.
          </Typography>
          <Link href="/auth/google" passHref>
            <Button variant="outlined" color="tertiary" startIcon={<GoogleIcon />}>
              Prijavi se
            </Button>
          </Link>
        </Container>
      </Box>
    </>
  );
}

export default withAuth(Login, { logoutRequired: true });
