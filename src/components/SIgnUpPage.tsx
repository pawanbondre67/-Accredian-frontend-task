
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Card from '@mui/material/Card';
import { useNavigate } from 'react-router-dom';   
import { useState } from 'react';

import { useAuth } from '../context/AuthContext';

export default function SignUp() {

  const navigate = useNavigate();
  const { signUp } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState(false);
  const [emailErrorMessage, setEmailErrorMessage] = useState('');
  const [passwordError, setPasswordError] = useState(false);
  const [passwordErrorMessage, setPasswordErrorMessage] = useState('');
  const [error, setError] = useState('');

  const validateInputs = () => {


    let isValid = true;

    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      setEmailError(true);
      setEmailErrorMessage('Please enter a valid email address.');
      isValid = false;
    } else {
      setEmailError(false);
      setEmailErrorMessage('');
    }

    if (!password || password.length < 4) {
      setPasswordError(true);
      setPasswordErrorMessage('Password must be at least 4 characters long.');
      isValid = false;
    } else {
      setPasswordError(false);
      setPasswordErrorMessage('');
    }

    return isValid;
  };

  async function handleSignup(event: { preventDefault: () => void; }) {
    event.preventDefault();
    if (!validateInputs()) {
      return;
    }
    try {
        await signUp(email, password);
    } catch  {
        console.error("Failed to sign up: invalid credentials");
      setError("Failed to sign up: invalid credentials");
    }
  }

  return (
    <Stack
      direction="column"
      justifyContent="center"
      alignItems="center"
      sx={{ minHeight: '100vh', padding: 2 }}
    >
      <Card sx={{ maxWidth: 450, width: '100%', padding: 4, boxShadow: 3 }}>
        <Typography
          component="h1"
          variant="h4"
          sx={{ textAlign: 'center', marginBottom: 2 }}
        >
          Sign up
        </Typography>
        <Box
          component="form"
          onSubmit={handleSignup}
          noValidate
          sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}
        >
          <TextField
            id="email"
            type="email"
            name="email"
            placeholder="your@email.com"
            autoComplete="email"
            autoFocus
            required
            fullWidth
            variant="outlined"
            error={emailError}
            helperText={emailErrorMessage}
            onChange={(e) => { setEmail(e.target.value); }}
          />
          <TextField
            name="password"
            placeholder="••••••"
            type="password"
            id="password"
            autoComplete="current-password"
            required
            fullWidth
            variant="outlined"
            error={passwordError}
            helperText={passwordErrorMessage}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
          >
            Sign up
          </Button>
          <Typography sx={{ textAlign: 'center' }}>
            Already have an account?{' '}
            <Button onClick={() => navigate('/signin')}>
              Sign in
            </Button>
          </Typography>
        </Box>
      </Card>
      {error && <Typography color="error" sx={{ marginTop: 2 }}>{error}</Typography>}
    </Stack>
  );
}