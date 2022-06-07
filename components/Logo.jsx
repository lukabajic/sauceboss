import Box from '@mui/material/Box';

function Logo() {
  return (
    <Box
      component="img"
      src="https://storage.cloud.google.com/sauceboss/logo.png?w=164&h=164&fit=crop&auto=format"
      srcSet="https://storage.cloud.google.com/sauceboss/logo.png?w=164&h=164&fit=crop&auto=format&dpr=2 2x"
      alt="SAUCEBOSS"
      sx={{
        maxWidth: 64,
      }}
    />
  );
}

export default Logo;
