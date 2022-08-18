import Head from 'next/head';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from "axios";
import {
  Box,
  Button,
  Checkbox,
  Container,
  FormHelperText,
  Link,
  TextField,
  Typography
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import store from 'src/store';
import { setUser } from 'src/store/userSlice';
import { SERVER_URL } from 'src/config';

const Register = () => {
  const router = useRouter();
  const formik = useFormik({
    initialValues: {
      email: '',
      name: '',
      organisation: '',
      username: '',
      password: '',
      confirmpassword: '',
    },
    validationSchema: Yup.object({
      email: Yup
        .string()
        .email(
          'Must be a valid email')
        .max(255)
        .required(
          'Email is required'),
      name: Yup
        .string()
        .max(255)
        .required(
          'Name is required'),
      organisation: Yup
        .string()
        .max(255)
        .required(
          'Organisation is required'),
      username: Yup
        .string()
        .max(255)
        .required(
          'Username is required'),
      password: Yup
        .string()
        .max(255)
        .required(
          'Password is required'),
      confirmpassword: Yup.string()
        .oneOf([Yup.ref('password'), null], 'Passwords must match'),
    }),
    onSubmit: (values, actions) => {
      axios.post(SERVER_URL + "/user/create", {
        username: values.username,
        password: values.password,
        email: values.email,
        name: values.name,
        organisation: values.organisation,
      }).then((rsp) => {
        if (!rsp.data.success) {
          console.log(rsp.data);
          console.log('Failed to create user.');
          actions.setSubmitting(false)
          return;
        }
        console.log('Created new user!');
        store.dispatch(setUser({
          email: values.email,
          name: values.name,
          organisation: values.organisation, username: values.username,
        }))
        router.push('/');
      }).catch(e => {
        console.log(e)
        alert("Sign in Failed")
        actions.setSubmitting(false)
      });
    }
  });

  return (
    <>
      <Head>
        <title>
          Register
        </title>
      </Head>
      <Box
        component="main"
        sx={{
          alignItems: 'center',
          display: 'flex',
          flexGrow: 1,
          minHeight: '100%'
        }}
      >
        <Container maxWidth="sm">
          <NextLink
            href="/"
            passHref
          >
            <Button
              component="a"
              startIcon={<ArrowBackIcon fontSize="small" />}
            >
              Dashboard
            </Button>
          </NextLink>
          <form onSubmit={formik.handleSubmit}>
            <Box sx={{ my: 3 }}>
              <Typography
                color="textPrimary"
                variant="h4"
              >
                Create a new account
              </Typography>
              <Typography
                color="textSecondary"
                gutterBottom
                variant="body2"
              >
                Use your email to create a new account
              </Typography>
            </Box>
            <TextField
              error={Boolean(formik.touched.name && formik.errors.name)}
              fullWidth
              helperText={formik.touched.name && formik.errors.name}
              label="Name"
              margin="normal"
              name="name"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.name}
              variant="outlined"
            />
            <TextField
              error={Boolean(formik.touched.organisation && formik.errors.organisation)}
              fullWidth
              helperText={formik.touched.organisation && formik.errors.organisation}
              label="Organisation"
              margin="normal"
              name="organisation"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.organisation}
              variant="outlined"
            />
            <TextField
              error={Boolean(formik.touched.email && formik.errors.email)}
              fullWidth
              helperText={formik.touched.email && formik.errors.email}
              label="Email Address"
              margin="normal"
              name="email"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              type="email"
              value={formik.values.email}
              variant="outlined"
            />
            <TextField
              error={Boolean(formik.touched.username && formik.errors.username)}
              fullWidth
              helperText={formik.touched.username && formik.errors.username}
              label="Username"
              margin="normal"
              name="username"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.username}
              variant="outlined"
            />

            <TextField
              error={Boolean(formik.touched.password && formik.errors.password)}
              fullWidth
              helperText={formik.touched.password && formik.errors.password}
              label="Password"
              margin="normal"
              name="password"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              type="password"
              value={formik.values.password}
              variant="outlined"
            />
            <TextField
              error={Boolean(formik.touched.confirmpassword && formik.errors.confirmpassword)}
              fullWidth
              helperText={formik.touched.confirmpassword && formik.errors.confirmpassword}
              label="Confirm Password"
              margin="normal"
              name="confirmpassword"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              type="password"
              value={formik.values.confirmpassword}
              variant="outlined"
            />
            <Box
              sx={{
                alignItems: 'center',
                display: 'flex',
                ml: -1
              }}
            >
            </Box>
            {Boolean(formik.touched.policy && formik.errors.policy) && (
              <FormHelperText error>
                {formik.errors.policy}
              </FormHelperText>
            )}
            <Box sx={{ py: 2 }}>
              <Button
                color="primary"
                disabled={formik.isSubmitting}
                fullWidth
                size="large"
                type="submit"
                variant="contained"
              >
                Sign Up Now
              </Button>
            </Box>
            <Typography
              color="textSecondary"
              variant="body2"
            >
              Have an account?
              {' '}
              <NextLink
                href="/login"
                passHref
              >
                <Link
                  variant="subtitle2"
                  underline="hover"
                >
                  Sign In
                </Link>
              </NextLink>
            </Typography>
          </form>
        </Container>
      </Box>
    </>
  );
};

export default Register;
