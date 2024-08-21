import { useState } from 'react';

import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import LoadingButton from '@mui/lab/LoadingButton';
import { alpha, useTheme } from '@mui/material/styles';
import InputAdornment from '@mui/material/InputAdornment';
useRouter



// import Logo from 'src/components/logo';
import Iconify from './iconify';
import { Formik, useFormik, FormikProvider, Form } from 'formik';
import * as Yup from 'yup';
import axios, { Axios } from 'axios';
import { useDispatch } from 'react-redux';
import { loginStart, loginSuccess } from '../redux/userSlice';
import { toast } from 'react-toastify';
import { setUserToken, setUserRole } from '../storeService';
import axiosInstance from '../api/axiosConfig';
import { bgGradient } from '../theme/css';
import { useRouter } from '../routes/hooks';
import { Grid, MenuItem } from '@mui/material';
import { useNavigate } from 'react-router-dom';


// ----------------------------------------------------------------------

export default function RegisterView() {
    const theme = useTheme();

    const navigate = useNavigate();

    const router = useRouter();
    const dispacth = useDispatch();
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);


    const loginSchema = Yup.object().shape({
        firstName: Yup.string().required('First name is required'),
        lastName: Yup.string().required('Last name is required'),
        role: Yup.string().required('Role is required'),
        mobileNumber: Yup.string().required('Mobile number  is required'),
        email: Yup.string().email('Email must be a valid email address').required('Email is required'),
        password: Yup.string()
            .min(8, 'Password must be at least 8 characters')
            .required('Password is required'),
        confirmPassword: Yup.string()
            .oneOf([Yup.ref('password'), null], 'Passwords must match')
            .required('Confirm Password is required'),

    });

    const formik = useFormik({
        initialValues: {
            firstName: "",
            lastName: "",
            mobileNumber: "",
            role: "",
            email: "",
            password: "",
            confirmPassword: "",
        },
        validationSchema: loginSchema,
        onSubmit: async (values) => {
            try {
                dispacth(loginStart())
                const res = await axiosInstance.post(`/auth/register`, {
                    firstName: values.firstName,
                    lastName: values.lastName,
                    role: values.role,
                    mobileNumber: values.mobileNumber,
                    email: values.email,
                    hash: values.password
                });
                if (res.data.isError === false) {

                    toast.success(res.data.message)
                    handleClick();
                }
                if (res.data.isError === true) {
                    toast.error(res.data.message)
                }
            } catch (e) {
                toast.error(e.response.data.message)
                console.log(e)
            }
        },
    });


    const { values, errors, touched, handleChange, handleBlur, handleSubmit } = formik;


    const handleClick = () => {
        router.push('/login');
    };


    const renderForm = (
        <>
            <FormikProvider value={formik}>
                <Form autoComplete="off" onSubmit={handleSubmit}>

                    <Grid container columnSpacing={1}>

                        <Grid item xs={6}>
                            <TextField
                                name="firstName"
                                label="Firstname *"
                                variant="outlined"
                                error={touched.firstName && Boolean(errors.firstName)}
                                helperText={touched.firstName && errors.firstName}
                                fullWidth
                                margin="normal"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.firstName} />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                name="lastName"
                                label="Lastname *"
                                variant="outlined"
                                error={touched.lastName && Boolean(errors.lastName)}
                                helperText={touched.lastName && errors.lastName}
                                fullWidth
                                margin="normal"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.lastName} />
                        </Grid>

                        <Grid item xs={6}>
                            <TextField type="email"
                                name="email"
                                label="Email address *"
                                variant="outlined"
                                error={touched.email && Boolean(errors.email)}
                                helperText={touched.email && errors.email}
                                fullWidth
                                margin="normal"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.email} />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                name="mobileNumber"
                                label="Mobile Number *"
                                variant="outlined"
                                error={touched.mobileNumber && Boolean(errors.mobileNumber)}
                                helperText={touched.mobileNumber && errors.mobileNumber}
                                fullWidth
                                margin="normal"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.mobileNumber} />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                select
                                name="role"
                                label="Role *"
                                variant="outlined"
                                error={touched.role && Boolean(errors.role)}
                                helperText={touched.role && errors.role}
                                fullWidth
                                margin="normal"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.role}
                            >
                                <MenuItem value="">
                                    <em>None</em>
                                </MenuItem>
                                <MenuItem value="USER">User</MenuItem>
                                <MenuItem value="ADMIN">Admin</MenuItem>
                                <MenuItem value="GUEST">Guest</MenuItem>
                            </TextField>
                        </Grid>

                        <Grid item xs={6}>
                            <TextField
                                name="password"
                                label="Password *"
                                variant="outlined"
                                error={touched.password && Boolean(errors.password)}
                                helperText={touched.password && errors.password}
                                fullWidth
                                margin="normal"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.password}
                                type={showPassword ? 'text' : 'password'}
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                                                <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                                            </IconButton>
                                        </InputAdornment>
                                    ),
                                }}
                            />
                        </Grid>

                        <Grid item xs={6}>
                            <TextField
                                name="confirmPassword"
                                label="Confirm Password *"
                                variant="outlined"
                                error={touched.confirmPassword && Boolean(errors.confirmPassword)}
                                helperText={touched.confirmPassword && errors.confirmPassword}
                                fullWidth
                                margin="normal"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.confirmPassword}
                                type={showConfirmPassword ? 'text' : 'password'}
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <IconButton onClick={() => setShowConfirmPassword(!showConfirmPassword)} edge="end">
                                                <Iconify icon={showConfirmPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                                            </IconButton>
                                        </InputAdornment>
                                    ),
                                }}
                            />
                        </Grid>


                    </Grid>

                    <Stack direction="row" alignItems="center" justifyContent="flex-end" sx={{ my: 3 }}>

                    </Stack>

                    <LoadingButton
                        fullWidth
                        size="large"
                        type="submit"
                        variant="contained"
                        color="inherit"
                    >
                        Register
                    </LoadingButton>
                </Form>
            </FormikProvider>
        </>
    );

    return (
        <Box
            sx={{
                ...bgGradient({
                    color: alpha(theme.palette.background.default, 0.9),
                }),
                height: 1,
            }}
        >

            <Stack alignItems="center" justifyContent="center" sx={{ height: 1 }}>
                <Card
                    sx={{
                        p: 5,
                        width: 1,
                        maxWidth: "800px",
                    }}
                >
                    <Typography variant="h4" textAlign={"center"}>Register</Typography>

                    <Typography variant="body2" sx={{ mt: 2, mb: 5 }} textAlign={"center"}>
                        Already have an account?
                        <Link variant="subtitle2" sx={{ ml: 0.5, cursor: "pointer" }} onClick={() => navigate('/login')}>
                            Login
                        </Link>
                    </Typography>

                    {renderForm}
                </Card>
            </Stack>
        </Box>
    );
}
