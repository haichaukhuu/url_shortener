import React, { useState } from 'react';
import { Box, Button, TextField, Typography, Container, Grid2 } from '@mui/material';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://localhost:3000/api/auth/login', {
        email,
        password,
      });

      // Assuming the backend returns a token
      localStorage.setItem('token', response.data.token);
      navigate('/'); // Redirect to homepage after login
    } catch (err) {
      setError('Invalid credentials, please try again.');
    }
  };

  return (
    <Container component="main" maxWidth="xs" sx={{paddingTop: '80px'}}>
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          boxShadow: 3,
          padding: 4,
          borderRadius: 2,
          backgroundColor: 'white',
        }}
      >
        <Typography component="h1" variant="h5" sx = {{color: 'blue', fontWeight: "bold"}}>
          Login
        </Typography>

        <Box sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            label="Email Address"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          {error && <Typography color="error" variant="body2">{error}</Typography>}

          <Button
            fullWidth
            variant="contained"
            color="primary"
            sx={{ marginTop: 3, marginBottom: 2 }}
            onClick={handleLogin}
          >
            Login
          </Button>

          <Grid2 container justifyContent="center">
            <Grid2 item>
              <Typography variant="body2" sx={{ textDecoration: 'none', color: 'blue' }}>
                Don't have an account?{' '}
                <Link to="/register" >
                  Register here!
                </Link>
              </Typography>
            </Grid2>
          </Grid2>
        </Box>
      </Box>
    </Container>
  );
}

export default LoginPage;
