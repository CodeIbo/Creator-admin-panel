import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { useCookies } from 'react-cookie';

import useAuth from '../../Services/Hooks/useAuth';
import TopBarHandlerType from '../../Models/TopBarHandlerType';
import { useAlert } from '../../Services/Context/Alert/AlertProvider';

function TopBar({ SideBarHandler }: TopBarHandlerType) {
  const { setAuth } = useAuth();
  const { triggerAlert } = useAlert();
  const [cookies, setCookie, removeCookie] = useCookies(['user']);

  const Logout = () => {
    triggerAlert('Logout', 'success');
    setAuth({});
    removeCookie('user');
  };
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
          <Button color="inherit" onClick={Logout}>
            Logout
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
export default TopBar;
