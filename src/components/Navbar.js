import { Link } from 'react-router-dom';
import { AUTH } from '../lib/auth';
import { API } from '../lib/api';
import { useAuthenticated } from '../hooks/useAuthenticated';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import ProfilePicture from './ProfilePicture';

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

export default function Navbar() {
  const [userData, setUserData] = useState(null);
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useAuthenticated();
  const id = AUTH.getPayload().sub;

  useEffect(() => {
    if (isLoggedIn) {
      API.GET(API.ENDPOINTS.singleWishlist(id)).then(({ data }) => {
        setUserData(data);
      });
    }
  }, [id, isLoggedIn]);

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

                <ProfilePicture
                  cloudinaryImageId={userData?.owner.profile_image}
                  imageHeight={45}
                  imageWidth={45}
                  radius={50}
                  backgroundColor={'#1876D1'}
                />
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
