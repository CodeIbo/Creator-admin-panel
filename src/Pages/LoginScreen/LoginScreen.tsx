import { Box, Button, Container, TextField, Typography } from '@mui/material';
import { FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../../Services/Api/Axios';
import useAuth from '../../Services/Hooks/useAuth';
import { useAlert } from '../../Services/Context/Alert/AlertProvider';

function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigate();
  const { setAuth } = useAuth();
  const { triggerAlert } = useAlert();

  const Login = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await axios.post('/auth/login', undefined, {
        headers: {
          email,
          user_password: password,
        },
      });
      const accessToken = response?.data?.data?.token;
      if (accessToken) {
        setAuth({ email, accessToken });
        setEmail('');
        setPassword('');
        navigation('/dashboard');
      } else {
        triggerAlert(response.statusText, 'warning');
      }
    } catch (err: any) {
      if (err?.response?.data) {
        triggerAlert(err?.response?.data?.message, 'error');
      } else {
        triggerAlert(err?.message, 'error');
      }
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <form
        onSubmit={(e) => {
          Login(e);
        }}
      >
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Typography component="h1" variant="h5">
            Log in
          </Typography>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            value={email}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            value={password}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign In
          </Button>
        </Box>
      </form>
    </Container>
  );
}

export default LoginScreen;
