import React, { useState } from "react";
import { Button, Menu, MenuItem } from "@mui/material";
import { User } from "../../../types";
import { useAppDispatch } from "../../../app/hooks";
import { logoutUser } from "../../../features/users/usersSlice";
interface Props {
  user: User;
}

const UserMenu: React.FC<Props> = ({ user }) => {
  const dispatch = useAppDispatch();
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    dispatch(logoutUser());
    setAnchorEl(null);
  };

  return (
    <>
      <Button onClick={handleClick} color="inherit">
        Hello, {user.username}
      </Button>

      <Menu
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem>History</MenuItem>
        <MenuItem onClick={handleLogout}>Logout</MenuItem>
      </Menu>
    </>
  );
};

export default UserMenu;
