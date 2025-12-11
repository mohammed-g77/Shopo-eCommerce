import React from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import { Link } from 'react-router-dom';

const Register = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();

    const registerForm = async (values) => {
        console.log(values);
        try {
            const response = await axios.post('https://knowledgeshop.runasp.net/api/auth/Account/Register', values);
            console.log(response);
        } catch(err) {
            console.log(err);
        }
    };

    const ImageUploadCard = ({ title, description, size, isCover = false }) => (
        <Box sx={{ mb: 4 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                <Typography variant="h6" sx={{ fontSize: '16px', fontWeight: 'bold' }}>
                    {title}
                </Typography>
                <HelpOutlineIcon sx={{ fontSize: 16, color: 'text.secondary', cursor: 'pointer' }} />
            </Box>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2, fontSize: '13px' }}>
                {description}
            </Typography>
            
            <Box sx={{ 
                position: 'relative', 
                width: isCover ? '100%' : '180px', 
                height: isCover ? '140px' : '180px',
                bgcolor: '#f5f5f5', 
                borderRadius: '50%',
                ...(isCover && { borderRadius: 2 }),
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center',
                overflow: 'hidden',
                margin: isCover ? 0 : '0 auto',
                border: '1px solid #eee'
            }}>
                {/* Placeholder content/image */}
                <Box sx={{ 
                    width: '100%', 
                    height: '100%', 
                    background: isCover 
                        ? 'linear-gradient(45deg, #1a1a1a, #4a4a4a)' 
                        : 'linear-gradient(45deg, #FFC107, #FF9800)', // Just colorful placeholders
                    opacity: 0.8
                }} />
                
                <IconButton 
                    sx={{ 
                        position: 'absolute', 
                        bottom: isCover ? -10 : 10, 
                        right: isCover ? -10 : 10,
                        bgcolor: '#d23f57',
                        color: 'white',
                        '&:hover': { bgcolor: '#b2354a' },
                        width: 32,
                        height: 32,
                        ...(isCover && { bottom: 10, right: 10 })
                    }}
                >
                    <EditIcon sx={{ fontSize: 18 }} />
                </IconButton>
            </Box>
        </Box>
    );

    return (
        <Box sx={{ bgcolor: '#FFFBF0', minHeight: '100vh', py: 4 }}>
            <Box sx={{ maxWidth: '1200px', mx: 'auto', px: 3 }}>
                
                {/* Breadcrumb */}
                <Typography variant="body2" sx={{ color: 'text.secondary', mb: 4 }}>
                    Home / Become Saller
                </Typography>

                {/* Page Title */}
                <Typography variant="h4" align="center" sx={{ fontWeight: 'bold', mb: 6 }}>
                    Seller Application
                </Typography>

                {/* Combined Unified Card */}
                <Box sx={{ bgcolor: 'white', p: 5, borderRadius: 2, boxShadow: '0px 2px 10px rgba(0,0,0,0.03)' }}>
                    <Grid container spacing={4}>
                        {/* LEFT SIDE - Form */}
                        <Grid item xs={12} md={8}>
                            <Box component="form" onSubmit={handleSubmit(registerForm)}>
                                {/* Seller Information */}
                                <Box sx={{ mb: 5 }}>
                                    <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 1 }}>Seller Information</Typography>
                                    <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                                        Fill the form below or write us .We will help you as soon as possible.
                                    </Typography>

                                    <Grid container spacing={3}>
                                        <Grid item xs={12} sm={6}>
                                            <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 500 }}>First Name*</Typography>
                                            <TextField fullWidth placeholder="Demo Name" variant="outlined" size="small" {...register('firstName')} />
                                        </Grid>
                                        <Grid item xs={12} sm={6}>
                                            <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 500 }}>Last Name*</Typography>
                                            <TextField fullWidth placeholder="Demo Name" variant="outlined" size="small" {...register('lastName')} />
                                        </Grid>

                                        <Grid item xs={12} sm={6}>
                                            <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 500 }}>Email Address*</Typography>
                                            <TextField fullWidth placeholder="Demo@gmail.com" variant="outlined" size="small" type="email" {...register('email')} />
                                        </Grid>
                                        <Grid item xs={12} sm={6}>
                                            <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 500 }}>Phone*</Typography>
                                            <TextField fullWidth placeholder="0213 *********" variant="outlined" size="small" {...register('phone')} />
                                        </Grid>

                                        <Grid item xs={12}>
                                            <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 500 }}>Country*</Typography>
                                            <Select fullWidth displayEmpty defaultValue="US" size="small" {...register('country')}>
                                                <MenuItem value="" disabled>Select Country</MenuItem>
                                                <MenuItem value="US">United States</MenuItem>
                                                <MenuItem value="AE">UAE</MenuItem>
                                                <MenuItem value="BD">Bangladesh</MenuItem>
                                            </Select>
                                        </Grid>

                                        <Grid item xs={12}>
                                            <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 500 }}>Address*</Typography>
                                            <TextField fullWidth placeholder="Your address Here" variant="outlined" size="small" {...register('address')} />
                                        </Grid>
                                    </Grid>
                                </Box>

                                {/* Shop Information */}
                                <Box sx={{ mb: 3 }}>
                                    <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 1 }}>Shop Information</Typography>
                                    <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                                        Fill the form below or write us .We will help you as soon as possible.
                                    </Typography>

                                    <Grid container spacing={3}>
                                    <Grid item xs={12}>
                                        <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 500 }}>Shop Name*</Typography>
                                        <TextField fullWidth placeholder="Demo Name" variant="outlined" size="small" {...register('shopName')} />
                                    </Grid>

                                    <Grid item xs={12}>
                                        <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 500 }}>Address*</Typography>
                                        <TextField fullWidth placeholder="Your address Here" variant="outlined" size="small" {...register('shopAddress')} />
                                    </Grid>

                                    <Grid item xs={12} sm={6}>
                                        <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 500 }}>Password*</Typography>
                                        <TextField fullWidth placeholder="******" type="password" variant="outlined" size="small" {...register('password')} />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 500 }}>Re-Enter Password*</Typography>
                                        <TextField fullWidth placeholder="******" type="password" variant="outlined" size="small" {...register('rePassword')} />
                                    </Grid>
                                </Grid>
                            </Box>

                            <Box sx={{ mt: 4 }}>
                                    <Button 
                                        variant="contained" 
                                        type="submit" 
                                        fullWidth
                                        sx={{ 
                                            bgcolor: '#222', 
                                            color: 'white', 
                                            textTransform: 'none', 
                                            py: 1.5,
                                            '&:hover': { bgcolor: '#000' }
                                        }}
                                    >
                                        Create Seller Account
                                    </Button>
                                    <Box sx={{ mt: 2, textAlign: 'center' }}>
                                        <Typography variant="body2">
                                            Already have an Account? <Link to="#" style={{ fontWeight: 'bold', textDecoration: 'none', color: 'inherit' }}>Log In</Link>
                                        </Typography>
                                    </Box>
                                </Box>
                            </Box>
                        </Grid>

                        {/* RIGHT SIDE - Image Uploads */}
                        <Grid item xs={12} md={4}>
                                <ImageUploadCard 
                                    title="Update Profile" 
                                    description={<span>Profile of at least Size <Box component="span" fontWeight="bold">300x300</Box>. Gifs work too. <Box component="span" fontWeight="bold">Max 5mb</Box>.</span>}
                                />
                                
                                <ImageUploadCard 
                                    title="Update Logo" 
                                    description={<span>Profile of at least Size <Box component="span" fontWeight="bold">300x300</Box>. Gifs work too. <Box component="span" fontWeight="bold">Max 5mb</Box>.</span>}
                                />

                                <ImageUploadCard 
                                    title="Update Cover" 
                                    description={<span>Cover of at least Size <Box component="span" fontWeight="bold">1170x920</Box>.</span>}
                                    isCover={true}
                                />
                        </Grid>
                    </Grid>
                </Box>
            </Box>
        </Box>
    );
};

export default Register;
