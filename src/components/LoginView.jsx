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
import Iconify from '../components/iconify';
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
import { useNavigate } from 'react-router-dom';


// ----------------------------------------------------------------------

export default function LoginView() {
    const theme = useTheme();
    const navigate = useNavigate();
    const router = useRouter();
    const dispacth = useDispatch();
    const [showPassword, setShowPassword] = useState(false);

    const loginSchema = Yup.object().shape({
        email: Yup.string().email('Email must be a valid email address').required('Email is required'),
        password: Yup.string()
            .min(8, 'Password must be at least 8 characters')
            .required('Password is required'),
    });

    const formik = useFormik({
        initialValues: {
            email: "",
            password: "",
        },
        validationSchema: loginSchema,
        onSubmit: async (values) => {
            try {
                dispacth(loginStart())
                const res = await axiosInstance.post(`/auth/login`, {
                    email: values.email,
                    hash: values.password
                });
                if (res.data.isError === false) {
                    dispacth(loginSuccess(res.data.data))
                    toast.success(res.data.message)
                    setUserToken(res.data.data.token);
                    setUserRole(res.data.data.role);
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
        router.push('/');
    };


    const renderForm = (
        <>
            <FormikProvider value={formik}>
                <Form autoComplete="off" onSubmit={handleSubmit}>

                    <Stack spacing={3}>
                        <TextField type="email"
                            name="email"
                            label="Email address"
                            variant="outlined"
                            error={touched.email && Boolean(errors.email)}
                            helperText={touched.email && errors.email}
                            fullWidth
                            margin="normal"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.email} />

                        <TextField
                            name="password"
                            label="Password"
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
                    </Stack>

                    <Stack direction="row" alignItems="center" justifyContent="flex-end" sx={{ my: 3 }}>

                    </Stack>

                    <LoadingButton
                        fullWidth
                        size="large"
                        type="submit"
                        variant="contained"
                        color="inherit"
                    >
                        Login
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
            {/* <Logo
                sx={{
                    position: 'fixed',
                    top: { xs: 16, md: 24 },
                    left: { xs: 16, md: 24 },
                }}
            /> */}

            <Stack alignItems="center" justifyContent="center" sx={{ height: 1 }}>
                <Card
                    sx={{
                        p: 5,
                        width: 1,
                        maxWidth: 420,
                    }}
                >
                    <Typography variant="h4" textAlign={"center"}>Sign in</Typography>

                    <Typography variant="body2" sx={{ mt: 2, mb: 5 }} textAlign={"center"}>
                        Don’t have an account?
                        <Link variant="subtitle2" sx={{ ml: 0.5, cursor: "pointer" }} onClick={() => navigate('/register')}>
                            Get started
                        </Link>
                    </Typography>

                    {renderForm}
                </Card>
            </Stack>
        </Box>
    );
}
