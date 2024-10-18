import { AppBar, Toolbar, Typography, IconButton, Box } from '@mui/material';
import { Link } from 'react-router-dom';
import UserMenu from './UserMenu.tsx';
import AnonymousMenu from './AnonymousMenu.tsx';
import { useAppSelector } from "../../app/hooks.ts";
import { selectUser } from "../../features/users/usersSlice.ts";
import ChatIcon from '@mui/icons-material/Chat';

const Header = () => {
  const user = useAppSelector(selectUser);

  return (
    <AppBar position="static" sx={{ backgroundColor: '#3f51b5', boxShadow: '0 4px 10px rgba(0, 0, 0, 0.2)' }}>
      <Toolbar sx={{ justifyContent: 'space-between' }}>
        <Box
          component={Link}
          to="/"
          sx={{
            display: 'flex',
            alignItems: 'center',
            textDecoration: 'none',
            color: 'inherit',
          }}
        >
          <IconButton edge="start" color="inherit" aria-label="logo" sx={{ mr: 1 }}>
            <ChatIcon sx={{ fontSize: 40, color: '#fff' }} />
          </IconButton>
          <Typography variant="h4" sx={{ color: '#fff', fontWeight: 'bold' }}>
            ChatWs
          </Typography>
        </Box>
        <Box>
          {user ? (
            <UserMenu user={user} />
          ) : (
            <AnonymousMenu />
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
