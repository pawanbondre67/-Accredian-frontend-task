import * as React from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepButton from "@mui/material/StepButton";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import { useForm } from "react-hook-form";
import Modal from "@mui/material/Modal";
import axios from "axios";
import Loader from "./Loader";

const steps = ["Friend's details", "Refer Now"];

interface ModalFormProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  setMessage: (message: string) => void;
  setSnackbarOpen: (open: boolean) => void;
  setSeverity: (severity: "success" | "error" | "warning" | "info") => void;
}

export default function ModalForm({
  isOpen,
  setIsOpen,
  setMessage,
  setSnackbarOpen,
  setSeverity,
}: ModalFormProps) {
  const [activeStep, setActiveStep] = React.useState(0);
    const [loading, setLoading] = React.useState(false);
  const [completed, setCompleted] = React.useState<{
    [k: number]: boolean;
  }>({});
  const {
    register,
    handleSubmit,
    formState: { errors },
    trigger,
    reset,
  } = useForm();

  const totalSteps = () => {
    return steps.length;
  };

  const completedSteps = () => {
    return Object.keys(completed).length;
  };

  const isLastStep = () => {
    return activeStep === totalSteps() - 1;
  };

  const allStepsCompleted = () => {
    return completedSteps() === totalSteps();
  };

  const handleNext = async () => {
    if (activeStep === 0) {
      const result = await trigger(["referee_name", "referee_email", "course"]);
      if (!result) {
        return;
      }
      setCompleted({ ...completed, [activeStep]: true });
    }
    const newActiveStep =
      isLastStep() && !allStepsCompleted()
        ? steps.findIndex((step, i) => !(i in completed))
        : activeStep + 1;
    setActiveStep(newActiveStep);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };


  interface FormData {
    referee_email?: string;
    referrer_email?: string;
    referrer_name?: string;
    referee_name?: string;
    course?: string;
  }

  const baseUrl = import.meta.env.VITE_BASE_URL;

  const onSubmit = async (data: FormData) => {
    console.log(data);
    const { referee_email, referrer_name, referee_name, course } = data;
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

        setLoading(true);
      const token = localStorage.getItem("token");

      await axios.post(`${baseUrl}/referrals/create-referral`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setLoading(false);

      setSnackbarOpen(true);
      setMessage("Referral submitted successfully!");
      setSeverity("success");
      reset();
      setActiveStep(0);

      setIsOpen(false);

      try {
        const response = await axios.post(
          "https://api.emailjs.com/api/v1.0/email/send",
          formData
        );
        setSnackbarOpen(true);
        setMessage("Email sent successfully!");
        console.log("Email sent successfully:", response.data);
      } catch (error: unknown) {
        if (error instanceof Error) {
          console.error("Error sending email:", error);
          setSnackbarOpen(true);
          setMessage(error.message);
          setSeverity("error");
          setLoading(false);
        }
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        setSnackbarOpen(true);
        setMessage(error.message);
        setSeverity("error");
        setLoading(false);
      }
    }
  };

  return (
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
        <Stepper nonLinear alternativeLabel activeStep={activeStep}>
          {steps.map((label, index) => (
            <Step key={label} completed={completed[index]}>
              <StepButton color="inherit">{label}</StepButton>
            </Step>
          ))}
        </Stepper>
        <Typography variant="h6" component="h2" sx={{ mt : 2, mb: 2 }}>
          Refer a Course
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <Box sx={{ minHeight: 200 }}>
            {activeStep === 0 && (
              <>
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
              </>
            )}
            {activeStep === 1 && (
              <>
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
              </>
            )}
          </Box>
          <Box sx={{ display: "flex", flexDirection: "row",  pt: 2 }}>
            <Button
              color="inherit"
              disabled={activeStep === 0}
              onClick={handleBack}
              sx={{ mr: 1 }}
            >
              Back
            </Button>
            <Box sx={{ flex: "1 1 auto" }} />
            {isLastStep() ? null : (
              <Button onClick={handleNext} sx={{ mr: 1 }}>
                Next
              </Button>
            )}
            {isLastStep() && (
              <Button type="submit" variant="contained" sx={{ ml: 1 ,minWidth : 200}}>
                 {loading ? <Loader /> : 'Submit Referral'}
              </Button>
            )}
          </Box>
        </form>
      </Box>
    </Modal>
  );
}
