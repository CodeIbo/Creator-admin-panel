import { Box, Container, Typography } from '@mui/material';

import LinkButton from '../../Components/LinkButton/LinkButton';

function ErrorPage() {
  return (
    <Box>
      <Container
        sx={{
          marginTop: '10%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'column',
          gap: '1rem',
          padding: '1rem',
        }}
      >
        <Typography variant="h1" color="error">
          404 Error
        </Typography>
        <img
          src="https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExZ2FhZjl0ejIzeTNxYzJpcG5kenNuMGhkcWQxbWhtbng2NDY2aDB3MSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/xFpT7lMV5Mkqq0E6YM/giphy.gif"
          alt="gif"
        />
        <LinkButton
          buttonText="Login Screen"
          to="/login"
          color="info"
          variant="contained"
        />
      </Container>
    </Box>
  );
}

export default ErrorPage;
