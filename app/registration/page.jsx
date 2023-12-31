'use client';
import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useUserContext } from '../context/userContext';
import { useRouter } from 'next/navigation';
import { setPersistence, createUserWithEmailAndPassword, browserSessionPersistence } from "firebase/auth";
import { customPoster } from '../utils/fetchConstructor';

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const defaultTheme = createTheme();

export default function SignUp() {
  const router = useRouter();
  const { user, setUser, auth } = useUserContext();
  const [errorMes, setErrorMes] = React.useState('');

  const registerUser = async (email, password, newUserData) => {
    if (email !== '' && password !== '') {
      const userCredential = await setPersistence(auth, browserSessionPersistence)
        .then(async () => {
          return await createUserWithEmailAndPassword(auth, email, password);
        })
        .catch((error) => {
          error.code === 'auth/email-already-in-use' && setErrorMes('This email is already in use.')
        });
      if (userCredential) {
        setUser(userCredential.user)
        const userPath = '../api/userData';
        const userBody = {
          action: 'register',
          uid: userCredential.user.uid,
          newUserData,
        };
        await customPoster(userPath, userBody);
      };
    };
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const newUserData = {
      first: data.get('firstName'),
      last: data.get('lastName'),
      gender: undefined,
      date: undefined,
    };
    await registerUser(data.get('email'), data.get('password'), newUserData);
  };

  React.useEffect(() => {
    user !== null && router.push('/');
  });

  return (
    <>
      <ThemeProvider theme={defaultTheme}>
        <main>
          <Container component="main" maxWidth="xs">
            <CssBaseline />
            <Box
              sx={{
                marginTop: 8,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                <LockOutlinedIcon />
              </Avatar>
              <Typography component="h1" variant="h5">
                Sign up
              </Typography>
              <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      autoComplete="given-name"
                      name="firstName"
                      required
                      fullWidth
                      id="firstName"
                      label="First Name"
                      autoFocus
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      required
                      fullWidth
                      id="lastName"
                      label="Last Name"
                      name="lastName"
                      autoComplete="family-name"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      id="email"
                      label="Email Address"
                      name="email"
                      autoComplete="email"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      name="password"
                      label="Password"
                      type="password"
                      id="password"
                      autoComplete="new-password"
                    />
                  </Grid>
                  <Grid item xs={12}>
                  </Grid>
                </Grid>

                <p className='text-red-400'>{errorMes}</p>

                <Button
                  type="submit"
                  fullWidth
                  variant="outlined"
                  sx={{ mt: 3, mb: 2 }}
                >
                  Sign Up
                </Button>
                <Grid container justifyContent="flex-end">
                  <Grid item>
                    <Link href="/signin" variant="body2">
                      Already have an account? Sign in
                    </Link>
                  </Grid>
                </Grid>
              </Box>
            </Box>
            <Copyright sx={{ mt: 5 }} />
          </Container>
        </main>
      </ThemeProvider>
    </>
  );
}