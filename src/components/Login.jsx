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
import GoogleIcon from '@mui/icons-material/Google';
import { Link } from 'react-router-dom';

const Login = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [rememberMe, setRememberMe] = useState(false);

    const loginForm = async (values) => {
        console.log(values);
        try {
            const response = await axios.post('https://knowledgeshop.runasp.net/api/auth/Account/Login', values);
            console.log(response);
        } catch(err) {
            console.log(err);
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
                            mb: 1,
                            position: 'relative',
                            display: 'inline-block'
                        }}>
                            Log In
                        </Typography>
                        <Box sx={{ 
                            width: '80px',
                            height: '3px',
                            background: 'linear-gradient(90deg, #FFD700, #FFA500)',
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
                                    color: '#FF9800',
                                    fontSize: '14px',
                                    cursor: 'pointer',
                                    '&:hover': { textDecoration: 'underline' }
                                }}>
                                    Forgot Password
                                </Typography>
                            </Link>
                        </Box>

                        {/* Login Button */}
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
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
                                }
                            }}
                        >
                            Log In
                        </Button>

                        {/* Google Sign In */}
                        <Button
                            fullWidth
                            variant="outlined"
                            startIcon={<GoogleIcon />}
                            sx={{
                                borderColor: '#ddd',
                                color: '#666',
                                py: 1.5,
                                textTransform: 'none',
                                fontSize: '15px',
                                mb: 3,
                                '&:hover': {
                                    borderColor: '#bbb',
                                    bgcolor: '#fafafa'
                                }
                            }}
                        >
                            Sign In with Google
                        </Button>

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
                bgcolor: '#f5f5f5',
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
                    justifyContent: 'center'
                }}>
                    {/* Shopping Illustration */}
                    <img 
                        src="/login_illustration.png" 
                        alt="Shopping Illustration"
                        style={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'contain'
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
