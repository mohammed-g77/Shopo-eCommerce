import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import Divider from '@mui/material/Divider';
import { Link } from 'react-router-dom';

const Login = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [rememberMe, setRememberMe] = useState(false);
  const [apiError, setApiError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const loginForm = async (values) => {
    setApiError('');
    setIsSubmitting(true);
    try {
      const response = await axios.post(
        'https://knowledgeshop.runasp.net/api/auth/Account/Login',
        values
      );

      const { accessToken, refreshToken, accessTokenExpiresAt, message } = response.data;

      if (response.status === 200 && accessToken) {
        localStorage.setItem('token', accessToken);
        localStorage.setItem('refreshToken', refreshToken);
        localStorage.setItem('tokenExpiry', accessTokenExpiresAt);
        window.location.href = '/';
      } else {
        setApiError(message || 'Login failed. Please try again.');
      }
    } catch (err) {
      const msg =
        err.response?.data?.message ||
        err.response?.data?.title ||
        'Something went wrong. Please try again.';
      setApiError(msg);
    } finally {
      setIsSubmitting(false);
    }
  };

    return (
        <Box sx={{ 
            minHeight: '100vh', 
            display: 'flex',
            bgcolor: '#f5f5f5'
        }}>
            {/* Left Side - Login Form */}
            <Box sx={{ 
                flex: 1,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                bgcolor: 'white',
                p: 4
            }}>
                <Box sx={{ maxWidth: '400px', width: '100%' }}>
                    {/* Title */}
                    <Box sx={{ mb: 4 }}>
                        <Typography variant="h4" sx={{ 
                            fontWeight: 'bold', 
                            fontSize: '24px',
                            mb: 2,
                            position: 'relative',
                            display: 'inline-block'
                        }}>
                            Log In
                        </Typography>
                        <Box sx={{ 
                            width: '80px',
                            height: '3px',
                            background: 'linear-gradient(90deg, #458787ff, #2b6b6b)',
                            borderRadius: '2px',
                            mt: 0.5
                        }} />
                    </Box>

                    {/* Login Form */}
                    <Box component="form" onSubmit={handleSubmit(loginForm)}>
                        {/* Email Field */}
                        <Box sx={{ mb: 3 }}>
                            <Typography variant="body2" sx={{ mb: 1, fontWeight: 500, color: '#333' }}>
                                Email Address*
                            </Typography>
                            <TextField 
                                fullWidth 
                                placeholder="example@quomodososft.com"
                                variant="outlined"
                                size="medium"
                                {...register('email', { required: true })}
                                sx={{
                                    '& .MuiOutlinedInput-root': {
                                        bgcolor: '#fafafa'
                                    }
                                }}
                            />
                        </Box>

                        {/* Password Field */}
                        <Box sx={{ mb: 2 }}>
                            <Typography variant="body2" sx={{ mb: 1, fontWeight: 500, color: '#333' }}>
                                Password*
                            </Typography>
                            <TextField 
                                fullWidth 
                                type="password"
                                placeholder="● ● ● ● ● ●"
                                variant="outlined"
                                size="medium"
                                {...register('password', { required: true })}
                                sx={{
                                    '& .MuiOutlinedInput-root': {
                                        bgcolor: '#fafafa'
                                    }
                                }}
                            />
                        </Box>

                        {/* Remember Me & Forgot Password */}
                        <Box sx={{ 
                            display: 'flex', 
                            justifyContent: 'space-between', 
                            alignItems: 'center',
                            mb: 3
                        }}>
                            <FormControlLabel
                                control={
                                    <Checkbox 
                                        checked={rememberMe}
                                        onChange={(e) => setRememberMe(e.target.checked)}
                                        size="small"
                                    />
                                }
                                label={
                                    <Typography variant="body2" sx={{ fontSize: '14px' }}>
                                        Remember Me
                                    </Typography>
                                }
                            />
                            <Link to="/forgot-password" style={{ textDecoration: 'none' }}>
                                <Typography variant="body2" sx={{ 
                                    color: '#2b6b6b',
                                    fontSize: '14px',
                                    cursor: 'pointer',
                                    '&:hover': { textDecoration: 'underline' }
                                }}>
                                    Forgot Password
                                </Typography>
                            </Link>
                        </Box>

                        {/* API Error Message */}
                        {apiError && (
                            <Box sx={{
                                mb: 2,
                                p: 1.5,
                                bgcolor: '#fef2f2',
                                border: '1px solid #fecaca',
                                borderRadius: '6px',
                            }}>
                                <Typography variant="body2" sx={{ color: '#dc2626', fontSize: '14px', fontWeight: 500 }}>
                                    {apiError}
                                </Typography>
                            </Box>
                        )}

                        {/* Login Button */}
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            disabled={isSubmitting}
                            sx={{
                                bgcolor: '#2C2C2C',
                                color: 'white',
                                py: 1.5,
                                textTransform: 'none',
                                fontSize: '16px',
                                fontWeight: 500,
                                mb: 3,
                                '&:hover': {
                                    bgcolor: '#1a1a1a'
                                },
                                '&:disabled': {
                                    bgcolor: '#888',
                                    color: '#fff',
                                }
                            }}
                        >
                            {isSubmitting ? 'Logging in…' : 'Log In'}
                        </Button>

                        {/* Google Sign In */}
                        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                            <a 
                                href="#" 
                                style={{
                                    width: '100%',
                                    border: '1px solid #E0E0E0',
                                    height: '50px',
                                    display: 'flex',
                                    gap: '12px',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    backgroundColor: '#FAFAFA',
                                    textDecoration: 'none',
                                    marginBottom: '24px',
                                    borderRadius: '4px',
                                    cursor: 'pointer',
                                    transition: 'all 0.2s ease'
                                }}
                            >
                                <svg width="19" height="20" viewBox="0 0 19 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M18.9892 10.1871C18.9892 9.36767 18.9246 8.76973 18.7847 8.14966H9.68848V11.848H15.0277C14.9201 12.767 14.3388 14.1512 13.047 15.0812L13.0289 15.205L15.905 17.4969L16.1042 17.5173C17.9342 15.7789 18.9892 13.221 18.9892 10.1871Z" fill="#4285F4"/>
                                    <path d="M9.68813 19.9314C12.3039 19.9314 14.4999 19.0455 16.1039 17.5174L13.0467 15.0813C12.2286 15.6682 11.1306 16.0779 9.68813 16.0779C7.12612 16.0779 4.95165 14.3395 4.17651 11.9366L4.06289 11.9465L1.07231 14.3273L1.0332 14.4391C2.62638 17.6946 5.89889 19.9314 9.68813 19.9314Z" fill="#34A853"/>
                                    <path d="M4.17667 11.9366C3.97215 11.3165 3.85378 10.6521 3.85378 9.96565C3.85378 9.27909 3.97215 8.6148 4.16591 7.99474L4.1602 7.86273L1.13246 5.44366L1.03339 5.49214C0.37677 6.84305 0 8.36008 0 9.96565C0 11.5765 0.37677 13.0936 1.03339 14.4392L4.17667 11.9366Z" fill="#FBBC05"/>
                                    <path d="M9.68813 3.85336C11.5073 3.85336 12.7344 4.66168 13.4342 5.33718L16.1686 2.59107C14.4892 0.985496 12.3039 0 9.68813 0C5.89889 0 2.62638 2.23672 1.0332 5.49214L4.16573 7.99466C4.95165 5.59183 7.12612 3.85336 9.68813 3.85336Z" fill="#EB4335"/>
                                </svg>
                                <span style={{ 
                                    fontSize: '18px', 
                                    color: '#797979', 
                                    fontWeight: 'normal',
                                    fontFamily: 'inherit'
                                }}>
                                    Sign In with Google
                                </span>
                            </a>
                        </Box>

                        {/* Sign Up Link */}
                        <Box sx={{ textAlign: 'center' }}>
                            <Typography variant="body2" sx={{ color: '#666', fontSize: '14px' }}>
                                Don't have an account?{' '}
                                <Link to="/register" style={{ 
                                    color: '#2C2C2C', 
                                    fontWeight: 600,
                                    textDecoration: 'none'
                                }}>
                                    Sign up free
                                </Link>
                            </Typography>
                        </Box>
                    </Box>
                </Box>
            </Box>

            {/* Right Side - Illustration */}
            <Box sx={{ 
                flex: 1,
                display: { xs: 'none', md: 'flex' },
                alignItems: 'center',
                justifyContent: 'center',
                bgcolor: '#fff',
                p: 4,
                position: 'relative'
            }}>
                <Box sx={{ 
                    position: 'relative',
                    width: '100%',
                    maxWidth: '500px',
                    height: '400px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    
                }}>
                    {/* Shopping Illustration */}
                    <img 
                        src="/login_illustration.png" 
                        alt="Shopping Illustration"
                        style={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover',
                            borderRadius: '10px'
                        }}
                    
                      
                    />
                    
                    {/* Decorative Elements */}
                    <Box sx={{
                        position: 'absolute',
                        top: '20%',
                        left: '10%',
                        width: '60px',
                        height: '60px',
                        borderRadius: '50%',
                        bgcolor: '#FF6B6B',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '30px'
                    }}>
                        ❤️
                    </Box>
                    
                    <Box sx={{
                        position: 'absolute',
                        bottom: '30%',
                        left: '5%',
                        width: '0',
                        height: '0',
                        borderLeft: '30px solid transparent',
                        borderRight: '30px solid transparent',
                        borderBottom: '60px solid #4A5568',
                        transform: 'rotate(180deg)'
                    }} />
                    
                    <Box sx={{
                        position: 'absolute',
                        top: '15%',
                        right: '20%',
                        width: '12px',
                        height: '12px',
                        borderRadius: '50%',
                        bgcolor: '#667EEA'
                    }} />
                    
                    <Box sx={{
                        position: 'absolute',
                        bottom: '20%',
                        left: '15%',
                        width: '8px',
                        height: '8px',
                        borderRadius: '50%',
                        bgcolor: '#667EEA'
                    }} />
                </Box>
            </Box>
        </Box>
    );
};

export default Login;
