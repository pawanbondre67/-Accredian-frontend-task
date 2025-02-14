import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import AutohideSnackbar from './SnackBar';
import ModalForm from './Modal';
import { AlertColor } from '@mui/material';

const Hero: React.FC = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const [message, setMessage] = React.useState<string | null>('');
  const [snackbarOpen, setSnackbarOpen] = React.useState<boolean>(false);
  const [severity, setSeverity] = React.useState<AlertColor>('error');

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  return (
    <Box
      id="hero"
      sx={{
        width: '100%',
        backgroundRepeat: 'no-repeat',
        backgroundImage:
          'radial-gradient(ellipse 80% 50% at 50% -20%, hsl(210, 100%, 90%), transparent)',
      }}
    >
      <AutohideSnackbar open={snackbarOpen} message={message} severity={severity} onClose={handleCloseSnackbar} />
      <Container
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          pt: { xs: 20, sm: 20 },
          pb: { xs: 8, sm: 12 },
        }}
      >
        <Stack
          spacing={2}
          sx={{ alignItems: 'center', width: { xs: '100%', sm: '70%' } }}
        >
          <Typography
            variant="h1"
            sx={{
              display: 'flex',
              flexDirection: { xs: 'column', sm: 'row' },
              alignItems: 'center',
              fontSize: 'clamp(3rem, 10vw, 3.5rem)',
              fontWeight: 400,
            }}
          >
            Let's&nbsp; Learn &&nbsp;
            <Typography
              component="span"
              variant="h1"
              sx={{ fontSize: 'inherit', color: 'primary.main', fontWeight: 'bold' }}
            >
              Earn
            </Typography>
          </Typography>
          <Typography
            sx={{
              textAlign: 'center',
              color: 'text.secondary',
              width: { sm: '100%', md: '80%' },
            }}
          >
            Welcome to Accredian, your gateway to premier online programs from India's top universities, tailored for career success.
          </Typography>
          <Stack
            direction={{ xs: 'row', sm: 'row' }}
            spacing={1}
            sx={{ pt: 2, width: { xs: '100%', sm: '350px' }, justifyContent: 'center' }}
          >
            <Button
              variant="contained"
              color="primary"
              size="small"
              sx={{ minWidth: 'fit-content', elevation: 24 }}
              onClick={() => { setIsOpen(true) }}
            >
              Refer now
            </Button>
          
          </Stack>
        </Stack>
      </Container>
    
      <ModalForm 
        isOpen={isOpen} 
        setIsOpen={setIsOpen} 
        setMessage={setMessage} 
        setSnackbarOpen={setSnackbarOpen} 
        setSeverity={setSeverity} 
      />
    </Box>
  );
}

export default Hero;