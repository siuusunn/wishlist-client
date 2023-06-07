import { Link } from 'react-router-dom';
import { AUTH } from '../lib/auth';
import { API } from '../lib/api';
import { useAuthenticated } from '../hooks/useAuthenticated';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import ProfilePicture from './ProfilePicture';

import {
  AppBar,
  Container,
  Box,
  Toolbar,
  Typography,
  MenuItem,
  Menu,
  IconButton,
  Tooltip
} from '@mui/material';

import { Headset, AccountCircle } from '@mui/icons-material';

export default function Navbar() {
  const [userData, setUserData] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);

  const [anchorEl, setAnchorEl] = useState(null);
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

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const logout = () => {
    AUTH.deleteToken();
    setIsLoggedIn(false);
    AUTH.isSuperUser('false');
    setAnchorElUser(null);
    navigate('/');
  };

  return (
    <>
      <AppBar position='sticky'>
        <Container maxWidth='xl'>
          <Toolbar>
            <Headset sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
            <Typography
              variant='h6'
              noWrap
              component='a'
              href='/'
              sx={{
                mr: 2,
                display: { xs: 'none', md: 'flex' },
                fontFamily: 'monospace',
                fontWeight: 700,
                letterSpacing: '.3rem',
                color: 'inherit',
                textDecoration: 'none'
              }}
            >
              WISHLIST
            </Typography>

            <MenuItem>
              <Typography textAlign='center'>
                <Link to='/' className='navbar-item'>
                  HOME
                </Link>
              </Typography>
            </MenuItem>

            {AUTH.getSuperUser() === 'true' ? (
              <MenuItem>
                <Typography textAlign='center'>
                  <Link to='/additem' className='navbar-item'>
                    ALL WISHLISTS
                  </Link>
                </Typography>
              </MenuItem>
            ) : (
              <></>
            )}
            {isLoggedIn ? (
              <>
                <MenuItem>
                  <Typography textAlign='center'>
                    <Link to='/tracks'>TRACKS</Link>
                  </Typography>
                </MenuItem>
                <MenuItem>
                  <Typography textAlign='center'>
                    <Link to='/wishlist'>WISHLIST</Link>
                  </Typography>
                </MenuItem>

                <Box
                  sx={{
                    flexGrow: 1,
                    display: 'flex',
                    justifyContent: 'flex-end'
                  }}
                >
                  <Tooltip title='Open settings'>
                    <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                      <ProfilePicture
                        cloudinaryImageId={userData?.owner.profile_image}
                        imageHeight={45}
                        imageWidth={45}
                        radius={50}
                        backgroundColor={'#1876D1'}
                      />
                    </IconButton>
                  </Tooltip>
                  <Menu
                    sx={{ mt: '45px' }}
                    id='menu-appbar'
                    anchorEl={anchorElUser}
                    anchorOrigin={{
                      vertical: 'top',
                      horizontal: 'right'
                    }}
                    keepMounted
                    transformOrigin={{
                      vertical: 'top',
                      horizontal: 'right'
                    }}
                    open={Boolean(anchorElUser)}
                    onClose={handleCloseUserMenu}
                  >
                    <MenuItem>
                      <Typography textalign='center'>
                        <Link to='/' onClick={logout}>
                          LOGOUT
                        </Link>
                      </Typography>
                    </MenuItem>
                  </Menu>
                </Box>
              </>
            ) : (
              <>
                <Box
                  sx={{
                    flexGrow: 1,
                    display: 'flex',
                    justifyContent: 'flex-end'
                  }}
                >
                  <Tooltip title='Open settings'>
                    <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                      <AccountCircle />
                    </IconButton>
                  </Tooltip>
                  <Menu
                    sx={{ mt: '45px' }}
                    id='menu-appbar'
                    anchorEl={anchorElUser}
                    anchorOrigin={{
                      vertical: 'top',
                      horizontal: 'right'
                    }}
                    keepMounted
                    transformOrigin={{
                      vertical: 'top',
                      horizontal: 'right'
                    }}
                    open={Boolean(anchorElUser)}
                    onClose={handleCloseUserMenu}
                  >
                    <MenuItem onClick={handleCloseUserMenu}>
                      <Typography textAlign='center'>
                        <Link to='/login' className='navbar-item'>
                          LOGIN
                        </Link>
                      </Typography>
                    </MenuItem>
                    <MenuItem onClick={handleCloseUserMenu}>
                      {' '}
                      <Typography textAlign='center'>
                        <Link to='/register' className='navbar-item'>
                          REGISTER
                        </Link>
                      </Typography>
                    </MenuItem>
                  </Menu>
                </Box>
              </>
            )}
          </Toolbar>
        </Container>
      </AppBar>
    </>
  );
}
