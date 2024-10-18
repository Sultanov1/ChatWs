import { Button, Grid, Typography } from '@mui/material';
import { NavLink } from 'react-router-dom';

const AnonymousMenu = () => {
  return (
    <Grid sx={{display: 'flex', alignItems: 'center'}} item>
      <NavLink style={{
        marginRight: '30px',
        textDecoration: 'none',
        color: 'black'
      }} to={'/register'}>
        <Typography sx={{
          fontWeight: 'bold',
        }}>
          Sign up
        </Typography>
      </NavLink>
      <NavLink style={{
        marginRight: '30px',
        textDecoration: 'none',
        color: 'black'
      }} to={'/login'}>
        <Button sx={{
          borderRadius: '20px',
          fontWeight: 'bold'
        }} variant="contained" color="success">
          Sign in
        </Button>
      </NavLink>
    </Grid>
  );
};

export default AnonymousMenu;