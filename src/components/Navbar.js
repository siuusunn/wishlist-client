import { Link } from 'react-router-dom';
import { AUTH } from '../lib/auth';
import { useAuthenticated } from '../hooks/useAuthenticated';
import { useNavigate } from 'react-router-dom';

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
// import Button from '@mui/material/Button';
// import IconButton from '@mui/material/IconButton';
// import MenuIcon from '@mui/icons-material/Menu';

export default function Navbar() {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useAuthenticated();

  const logout = () => {
    AUTH.deleteToken();
    setIsLoggedIn(false);
    AUTH.isSuperUser('false');
    navigate('/');
  };

  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position='static'>
          <Toolbar>
            <Typography variant='h6' component='div' sx={{ mr: 2 }}>
              <Link to='/' className='navbar-item'>
                HOME
              </Link>
            </Typography>
            {AUTH.getSuperUser() === 'true' ? (
              <Typography variant='h6' component='div' sx={{ mr: 2 }}>
                <Link to='/additem' className='navbar-item'>
                  ALL WISHLISTS
                </Link>
              </Typography>
            ) : (
              <></>
            )}
            {isLoggedIn ? (
              <>
                <Typography variant='h6' component='div' sx={{ mr: 2 }}>
                  <Link to='/tracks'>TRACKS</Link>
                </Typography>
                <Typography variant='h6' component='div' sx={{ mr: 2 }}>
                  <Link to='/wishlist'>WISHLIST</Link>
                </Typography>
                <Typography variant='h6' component='div' sx={{ mr: 2 }}>
                  <Link to='/' onClick={logout} className='navbar-item'>
                    LOGOUT
                  </Link>
                </Typography>
              </>
            ) : (
              <>
                <Typography variant='h6' component='div' sx={{ mr: 2 }}>
                  <Link to='/login' className='navbar-item'>
                    LOGIN
                  </Link>
                </Typography>
                <Typography variant='h6' component='div' sx={{ mr: 2 }}>
                  <Link to='/register' className='navbar-item'>
                    REGISTER
                  </Link>
                </Typography>
              </>
            )}
          </Toolbar>
        </AppBar>
      </Box>
    </>
  );
}
