import { useAppDispatch, useAppSelector } from '../../app/hooks.ts';
import { selectRegisterError } from './usersSlice.ts';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import React, { useState } from 'react';
import { register } from './usersThunk.ts';
import { Alert, Box, Button, Container, Grid, Link, TextField, Typography } from '@mui/material';

const Register = () => {
  const dispatch = useAppDispatch();
  const error = useAppSelector(selectRegisterError);
  const navigate = useNavigate();

  const [state, setState] = useState({
    username: '',
    password: '',
    displayName: '',
  });

  const getFieldError = (fieldName: string) => {
    try {
      return error?.errors[fieldName].message;
    } catch (e) {
      console.error('Something went wrong: ', e);
    }
  };

  const inputChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const {name, value} = event.target;

    setState(prevState => {
      return {...prevState, [name]: value};
    });
  };

  const submitFormHandler = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      const newUser = {
        username: state.username,
        displayName: state.displayName,
        password: state.password,
      };

      await dispatch(register(newUser)).unwrap();
      navigate('/');
    } catch (e) {
      console.error('Something went wrong: ', e);
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        {error && (
          <Alert severity="error" sx={{mt: 3, width: '100%'}}>
            This user is already registered.
          </Alert>
        )}
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <Box component="form" onSubmit={submitFormHandler} sx={{mt: 3}}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                label="Username"
                name="username"
                value={state.username}
                onChange={inputChangeHandler}
                autoComplete="new-username"
                error={Boolean(getFieldError('username'))}
                helperText={getFieldError('username')}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="DisplayName"
                name="displayName"
                value={state.displayName}
                onChange={inputChangeHandler}
                autoComplete="new-displayName"
                error={Boolean(getFieldError('displayName'))}
                helperText={getFieldError('displayName')}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                name="password"
                label="Password"
                type="password"
                autoComplete="new-password"
                value={state.password}
                onChange={inputChangeHandler}
                error={Boolean(getFieldError('password'))}
                helperText={getFieldError('password')}
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{mt: 3, mb: 2, backgroundColor: 'black'}}
          >
            Sign Up
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link sx={{color: 'black'}} component={RouterLink} to="/login" variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
};

export default Register;
