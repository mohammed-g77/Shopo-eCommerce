// Register.jsx
import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import Link from '@mui/material/Link';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { useForm, Controller } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import './Register.css';

const API_URL = 'https://knowledgeshop.runasp.net/api/Auth/Account/Register';

export default function Register({ illustrationSrc = '/login_illustration.png' }) {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Snackbar state
  const [toast, setToast] = useState({
    open: false,
    severity: 'success', // 'success' | 'error' | 'info' | 'warning'
    message: '',
  });

  const redirectTimerRef = useRef(null);

  const {
    register,
    handleSubmit,
    control,
    watch,
    formState: { errors, isSubmitting },
    setError,
    reset,
  } = useForm({
    defaultValues: {
      userName: '',
      fullName: '',
      email: '',
      password: '',
      confirmPassword: '',
      phoneNumber: '',
      agreeTerms: false,
    },
    mode: 'onSubmit',
  });

  const passwordValue = watch('password');

  useEffect(() => {
  
    return () => {
      if (redirectTimerRef.current) clearTimeout(redirectTimerRef.current);
    };
  }, []);

  const openToast = (severity, message) => {
    setToast({ open: true, severity, message });
  };

  const closeToast = (_, reason) => {
    if (reason === 'clickaway') return;
    setToast((t) => ({ ...t, open: false }));
  };

  const registerForm = async (values) => {
  
    const payload = {
      userName: values.userName,
      fullName: values.fullName,
      email: values.email,
      password: values.password,
      phoneNumber: values.phoneNumber,
    };

    try {
      const response = await axios.post(API_URL, payload);

      console.log('REGISTER RESPONSE:', response);

      
      openToast('success', 'Your account has been created successfully. Redirecting you to the login page…');

       
      reset();

    
      redirectTimerRef.current = setTimeout(() => {
        navigate('/login', { replace: true });
      }, 1500);
    } catch (err) {
      console.log('REGISTER ERROR:', err);

   
      const serverMsg =
        err?.response?.data?.message ||
        err?.response?.data?.error ||
        err?.response?.data?.title ||
        'Registration failed';

     
      openToast('error', serverMsg);

     
      setError('email', { type: 'server', message: serverMsg });
    }
  };

  return (
    <div className="register-page">
      <div className="register-container">
        {/* Left Form Panel */}
        <div className="register-form-panel">
          <div className="register-form-content">
            {/* Title */}
            <div className="register-title-section">
              <Typography variant="h4" className="register-title">
                Register
              </Typography>

              {/* Decorative underline */}
              <svg className="register-title-underline" width="80" height="8" viewBox="0 0 80 8" fill="none">
                <path
                  d="M1 4C20 1 40 1 60 4C65 5 70 6 79 7"
                  stroke="#2b6b6b"
                  strokeWidth="3"
                  strokeLinecap="round"
                />
              </svg>
            </div>

            <Box component="form" onSubmit={handleSubmit(registerForm)} className="register-form">
              {/* userName */}
              <div className="form-field">
                <label htmlFor="userName" className="field-label">User Name*</label>
                <TextField
                  id="userName"
                  fullWidth
                  placeholder="username"
                  className="register-input"
                  error={!!errors.userName}
                  helperText={errors.userName?.message}
                  {...register('userName', {
                    required: 'User name is required',
                    minLength: { value: 3, message: 'User name must be at least 3 characters' },
                  })}
                  InputProps={{ className: 'input-field' }}
                />
              </div>

              {/* fullName */}
              <div className="form-field">
                <label htmlFor="fullName" className="field-label">Full Name*</label>
                <TextField
                  id="fullName"
                  fullWidth
                  placeholder="Mohammed OG"
                  className="register-input"
                  error={!!errors.fullName}
                  helperText={errors.fullName?.message}
                  {...register('fullName', {
                    required: 'Full name is required',
                    minLength: { value: 3, message: 'Full name must be at least 3 characters' },
                  })}
                  InputProps={{ className: 'input-field' }}
                />
              </div>

              {/* email */}
              <div className="form-field">
                <label htmlFor="email" className="field-label">Email Address*</label>
                <TextField
                  id="email"
                  type="email"
                  fullWidth
                  placeholder="example@gmail.com"
                  className="register-input"
                  error={!!errors.email}
                  helperText={errors.email?.message}
                  {...register('email', {
                    required: 'Email is required',
                    pattern: {
                      value: /^\S+@\S+\.\S+$/,
                      message: 'Email is invalid',
                    },
                  })}
                  InputProps={{ className: 'input-field' }}
                />
              </div>

              {/* password */}
              <div className="form-field">
                <label htmlFor="password" className="field-label">Password*</label>
                <TextField
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  fullWidth
                  placeholder="● ● ● ● ● ●"
                  className="register-input"
                  error={!!errors.password}
                  helperText={errors.password?.message}
                  {...register('password', {
                    required: 'Password is required',
                    minLength: { value: 8, message: 'Password must be at least 8 characters' },
                  })}
                  InputProps={{
                    className: 'input-field',
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={() => setShowPassword((s) => !s)}
                          edge="end"
                          size="small"
                        >
                          {showPassword ? <VisibilityOff fontSize="small" /> : <Visibility fontSize="small" />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              </div>

          

              {/* phoneNumber */}
              <div className="form-field">
                <label htmlFor="phoneNumber" className="field-label">Phone Number</label>
                <TextField
                  id="phoneNumber"
                  fullWidth
                  placeholder="+970 59 000 0000"
                  className="register-input"
                  error={!!errors.phoneNumber}
                  helperText={errors.phoneNumber?.message}
                  {...register('phoneNumber', {
                    validate: (v) => !v || /^[0-9+()\-\s]{7,20}$/.test(v) || 'Phone number is invalid',
                  })}
                  InputProps={{ className: 'input-field' }}
                />
              </div>

              {/* Options row */}
              <div className="options-row">
                <Controller
                  name="agreeTerms"
                  control={control}
                  rules={{ required: 'You must agree to the terms' }}
                  render={({ field }) => (
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={!!field.value}
                          onChange={(e) => field.onChange(e.target.checked)}
                          size="small"
                          className="register-checkbox"
                        />
                      }
                      label={
                        <Typography variant="body2" className="checkbox-label">
                          I agree to the{' '}
                          <Link href="#" className="terms-link">Terms & Privacy</Link>
                        </Typography>
                      }
                    />
                  )}
                />

                <Typography variant="body2" className="login-link-text">
                  Already have an account?{' '}
                  <Link href="/login" className="login-link">
                    Log In
                  </Link>
                </Typography>
              </div>

              {errors.agreeTerms && (
                <Typography variant="caption" color="error" className="terms-error">
                  {errors.agreeTerms.message}
                </Typography>
              )}

              {/* Primary Button */}
              <Button
                type="submit"
                fullWidth
                variant="contained"
                className="create-account-button"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Creating...' : 'Create Account'}
              </Button>

              {/* Social */}
              <div className="social-section">
                <Button
                  fullWidth
                  variant="outlined"
                  onClick={() => console.log('Google sign up clicked')}
                  className="google-button"
                  startIcon={
                    <svg width="19" height="20" viewBox="0 0 19 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M18.9892 10.1871C18.9892 9.36767 18.9246 8.76973 18.7847 8.14966H9.68848V11.848H15.0277C14.9201 12.767 14.3388 14.1512 13.047 15.0812L13.0289 15.205L15.905 17.4969L16.1042 17.5173C17.9342 15.7789 18.9892 13.221 18.9892 10.1871Z" fill="#4285F4"/>
                      <path d="M9.68813 19.9314C12.3039 19.9314 14.4999 19.0455 16.1039 17.5174L13.0467 15.0813C12.2286 15.6682 11.1306 16.0779 9.68813 16.0779C7.12612 16.0779 4.95165 14.3395 4.17651 11.9366L4.06289 11.9465L1.07231 14.3273L1.0332 14.4391C2.62638 17.6946 5.89889 19.9314 9.68813 19.9314Z" fill="#34A853"/>
                      <path d="M4.17667 11.9366C3.97215 11.3165 3.85378 10.6521 3.85378 9.96565C3.85378 9.27909 3.97215 8.6148 4.16591 7.99474L4.1602 7.86273L1.13246 5.44366L1.03339 5.49214C0.37677 6.84305 0 8.36008 0 9.96565C0 11.5765 0.37677 13.0936 1.03339 14.4392L4.17667 11.9366Z" fill="#FBBC05"/>
                      <path d="M9.68813 3.85336C11.5073 3.85336 12.7344 4.66168 13.4342 5.33718L16.1686 2.59107C14.4892 0.985496 12.3039 0 9.68813 0C5.89889 0 2.62638 2.23672 1.0332 5.49214L4.16573 7.99466C4.95165 5.59183 7.12612 3.85336 9.68813 3.85336Z" fill="#EB4335"/>
                    </svg>
                  }
                >
                  Sign up with Google
                </Button>
              </div>

              {/* Footer */}
              <Typography variant="body2" className="footer-text">
                By creating an account, you agree to our{' '}
                <Link href="#" className="footer-link">Terms</Link> and{' '}
                <Link href="#" className="footer-link">Privacy Policy</Link>.
              </Typography>
            </Box>
          </div>
        </div>

        {/* Right Illustration Panel */}
        <div className="register-illustration-panel">
          <div className="illustration-container">
            <img
              src={illustrationSrc}
              alt="Registration illustration"
              className="illustration-image"
            />
            <div className="decoration decoration-heart">❤️</div>
            <div className="decoration decoration-triangle"></div>
            <div className="decoration decoration-dot decoration-dot-1"></div>
            <div className="decoration decoration-dot decoration-dot-2"></div>
          </div>
        </div>
      </div>

      {/* Snackbar Success/Error */}
      <Snackbar
        open={toast.open}
        autoHideDuration={3500}
        onClose={closeToast}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert onClose={closeToast} severity={toast.severity} variant="filled" sx={{ width: '100%' }}>
          {toast.message}
        </Alert>
      </Snackbar>
    </div>
  );
}
