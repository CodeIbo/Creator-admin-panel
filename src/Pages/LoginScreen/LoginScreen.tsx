import {
  Alert,
  Box,
  Button,
  Container,
  TextField,
  Typography,
} from '@mui/material';
import { FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios, { axiosPrivate } from '../../Services/Api/Axios';
import useAuth from '../../Services/Hooks/useAuth';

function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigation = useNavigate();
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore: Unreachable code error
  const { setAuth } = useAuth();

  const Login = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(email, password);
    try {
      const response = await axios.post('/auth/login', undefined, {
        headers: {
          email,
          user_password: password,
        },
      });
      const accessToken = response?.data?.data?.token;
      setAuth({ email, accessToken });
      setEmail('');
      setPassword('');
      setError('');
      console.log(response);
      navigation('/dashboard');
    } catch (err: any) {
      console.log(err);
      setError(err?.request?.statusText);
    }
  };

  return (
    <>
      {error.length > 0 && (
        <Alert severity="warning" sx={{ textAlign: 'center' }}>
          {error}
        </Alert>
      )}

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
    </>
  );
}

export default LoginScreen;
