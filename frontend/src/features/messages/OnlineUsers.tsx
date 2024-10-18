import React, { ReactNode } from 'react';
import { UserDocument } from "../../types";
import { Avatar, Badge, Grid, Typography } from "@mui/material";

interface Props {
  users: UserDocument[];
}

interface StyledBadgeProps {
  overlap: "circular" | "rectangular";
  variant: "standard" | "dot";
  anchorOrigin: {
    horizontal: "left" | "right";
    vertical: "top" | "bottom";
  };
  children: ReactNode;
}

function StyledBadge({ overlap, variant, anchorOrigin, children }: StyledBadgeProps) {
  return (
    <Badge overlap={overlap} variant={variant} anchorOrigin={anchorOrigin}>
      {children}
    </Badge>
  );
}

const OnlineUsers: React.FC<Props> = ({ users }) => {
  return (
    <Grid sx={{ borderRight: "3px solid black", height: '500px', width: '20%', overflowY: 'scroll' }}>
      <Grid sx={{ borderBottom: '3px solid black' }}>
        <Typography variant="h4">Online users</Typography>
      </Grid>
      {users.map((user) => (
        <Grid sx={{ display: 'flex', margin: '20px 10px', alignItems: 'center' }} key={user._id}>
          <StyledBadge
            overlap="circular"
            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            variant="dot"
          >
            <Avatar src="/broken-image.jpg" />
          </StyledBadge>
          <Typography sx={{ marginLeft: '10px' }}>{user.username}</Typography>
        </Grid>
      ))}
    </Grid>
  );
};

export default OnlineUsers;
