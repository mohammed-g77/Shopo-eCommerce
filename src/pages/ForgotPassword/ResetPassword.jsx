import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useLocation } from 'react-router-dom';
import { Box, Button, TextField, Typography, Container, Alert, CircularProgress } from '@mui/material';
import { useResetPassword } from '../../hooks/useResetPassword';

const ResetPassword = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate();
  const location = useLocation();
  const { mutate: resetPassword, isPending, isError, error, isSuccess } = useResetPassword();

  const email = location.state?.email;

   React.useEffect(() => {
    if (!email) {
      navigate('/forgot-password');
    }
  }, [email, navigate]);

  const onSubmit = (data) => {
    resetPassword({
      email,
      code: data.code,
      newPassword: data.newPassword,
    }, {
      onSuccess: () => {
          setTimeout(() => {
             navigate('/login');
         }, 2000)
      }
    });
  };
  
  if (!email) return null; 

  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          boxShadow: 3,
          p: 4,
          borderRadius: 2,
          bgcolor: 'background.paper',
        }}
      >
        <Typography component="h1" variant="h5" sx={{ mb: 3 }}>
          Reset Password
        </Typography>

        <Typography variant="body2" color="text.secondary" sx={{ mb: 3, textAlign: 'center' }}>
          Check your email ({email}) for the verification code.
        </Typography>

        {isSuccess && (
          <Alert severity="success" sx={{ width: '100%', mb: 2 }}>
            Password reset successfully! Redirecting to login...
          </Alert>
        )}

        {isError && (
          <Alert severity="error" sx={{ width: '100%', mb: 2 }}>
            {error?.response?.data?.message || 'Failed to reset password. Please check your code and try again.'}
          </Alert>
        )}

        <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ mt: 1, width: '100%' }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="code"
            label="Verification Code"
            autoFocus
            {...register('code', { required: 'Verification code is required' })}
            error={!!errors.code}
            helperText={errors.code?.message}
          />

          <TextField
            margin="normal"
            required
            fullWidth
            name="newPassword"
            label="New Password"
            type="password"
            id="newPassword"
            {...register('newPassword', { 
              required: 'New Password is required',
              minLength: {
                value: 6,
                message: "Password must be at least 6 characters"
              }
            })}
            error={!!errors.newPassword}
            helperText={errors.newPassword?.message}
          />
          
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2, py: 1.5 }}
            disabled={isPending || isSuccess}
          >
            {isPending ? <CircularProgress size={24} /> : 'Reset Password'}
          </Button>

           <Button
            fullWidth
            variant="text"
            onClick={() => navigate('/login')}
             disabled={isSuccess}
          >
            Back to Login
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default ResetPassword;
