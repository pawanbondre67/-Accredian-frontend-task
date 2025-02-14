import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import AutohideSnackbar from './SnackBar';
import {  AlertColor } from '@mui/material';

// interface FormData {
//   referee_email: string;
//   referrer_email: string;
//   referrer_name: string;
//   referee_name: string;
//   course: string;
// }


const Hero: React.FC = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const [message, setMessage] = React.useState<string | null>('');
  const [snackbarOpen, setSnackbarOpen] = React.useState<boolean>(false);
  const [severity, setSeverity] = React.useState<AlertColor>('error');

  const handleCloseSnackbar = () => {

    setSnackbarOpen(false);
  };

  const baseUrl = import.meta.env.VITE_BASE_URL;
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  interface FormData {
    referee_email?: string;  
    referrer_email?: string;
    referrer_name?: string;
    referee_name?: string;
    course?: string;
  }

  const onSubmit = async (data: FormData) => {
    const { referee_email, referrer_name, referee_name, course } = data;
    console.log(data);
    const formData = {
      service_id: import.meta.env.VITE_SERVICE_ID as string,
      template_id: import.meta.env.VITE_TEMPLATE_ID as string,
      user_id: import.meta.env.VITE_USER_ID as string,
      template_params: {
        receiverName: referee_name,
        senderName: referrer_name,
        receiverEmail: referee_email,
        courseName: course,
      },
    };

    try {
      const token = localStorage.getItem('token'); // Assuming the token is stored in localStorage
      await axios.post(`${baseUrl}/referrals/create-referral`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setSnackbarOpen(true);
      setMessage("Referral submitted successfully!");
      setSeverity('success');
      reset();
      setIsOpen(false);

      try {
        const response = await axios.post("https://api.emailjs.com/api/v1.0/email/send", formData);
        setSnackbarOpen(true);
        setMessage("Email sent successfully!");
        console.log("Email sent successfully:", response.data);
      } catch (error: unknown) {
        if (error instanceof Error) {
          console.error("Error sending email:", error);
          setSnackbarOpen(true);
          setMessage(error.message);
          setSeverity('error');
        }
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        setSnackbarOpen(true);
        setMessage(error.message);
        setSeverity('error');
      }
    }
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
          pt: { xs: 14, sm: 20 },
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

      <Modal open={isOpen} onClose={() => setIsOpen(false)}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
            borderRadius: 2,
          }}
        >
          <Typography variant="h6" component="h2" sx={{ mb: 2 }}>
            Refer a Course
          </Typography>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <TextField
              {...register("referrer_name", { required: true })}
              label="Your Name"
              fullWidth
              sx={{ mb: 2 }}
              error={!!errors.referrer_name}
              helperText={errors.referrer_name ? "Required" : ""}
            />
            <TextField
              {...register("referrer_email", { required: true })}
              label="Your Email"
              fullWidth
              sx={{ mb: 2 }}
              error={!!errors.referrer_email}
              helperText={errors.referrer_email ? "Required" : ""}
            />
            <TextField
              {...register("referee_name", { required: true })}
              label="Referee Name"
              fullWidth
              sx={{ mb: 2 }}
              error={!!errors.referee_name}
              helperText={errors.referee_name ? "Required" : ""}
            />
            <TextField
              {...register("referee_email", { required: true })}
              label="Referee Email"
              fullWidth
              sx={{ mb: 2 }}
              error={!!errors.referee_email}
              helperText={errors.referee_email ? "Required" : ""}
            />
            <TextField
              {...register("course", { required: true })}
              label="Course Name"
              fullWidth
              sx={{ mb: 2 }}
              error={!!errors.course}
              helperText={errors.course ? "Required" : ""}
            />
            <Button type="submit" variant="contained" fullWidth>
              Submit Referral
            </Button>
          </form>
        </Box>
      </Modal>
    </Box>
  );
}

export default Hero;