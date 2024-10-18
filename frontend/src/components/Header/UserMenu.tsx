import React, {useState} from 'react';
import {Button, Grid, Menu, MenuItem} from '@mui/material';
import {UserDocument} from "../../types";
import {useAppDispatch, useAppSelector} from "../../app/hooks.ts";
import {selectUser, unsetUser} from "../../features/users/usersSlice.ts";
import {logout} from "../../features/users/usersThunk.ts";

interface Props {
  user: UserDocument;
}

const UserMenu: React.FC<Props> = ({user}) => {
  const userItem = useAppSelector(selectUser);
  const dispatch = useAppDispatch();
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = async () => {
    if (user) {
      dispatch(logout(userItem!.token));
      dispatch(unsetUser());
    }
  };

  return (
    <>
      <Grid className="user-info" sx={{display: 'flex', alignItems: 'center'}}>
        <Button color="inherit" onClick={handleClick}>
          Welcome, {user.displayName ? user.displayName : user.username} !
        </Button>
      </Grid>
      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
        <MenuItem onClick={handleLogout}>Logout</MenuItem>
      </Menu>
    </>
  );
};

export default UserMenu;