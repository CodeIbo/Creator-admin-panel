import { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import useAuth from '../../Services/Hooks/useAuth';
import TopBarHandlerType from '../../Models/TopBarHandlerType';

function TopBar({ SideBarHandler }: TopBarHandlerType) {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore: Unreachable code error
  const { setAuth } = useAuth();
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={{ mb: 5 }}>
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={() => {
              SideBarHandler(true);
            }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Admin Panel
          </Typography>
          <Button
            color="inherit"
            onClick={() => {
              setAuth({});
            }}
          >
            Logout
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
export default TopBar;
