import { useState } from 'react';
import { API } from '../lib/api';
import { AUTH } from '../lib/auth';
import { useNavigate } from 'react-router-dom';
import { VisibilityOffOutlined, VisibilityOutlined } from '@mui/icons-material';
import { Paper, Button } from '@mui/material';
import '../styles/Login.scss';

export default function Login() {
  const navigate = useNavigate();
  const [formFields, setFormFields] = useState({
    email: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleChange = (event) => {
    setFormFields({ ...formFields, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      API.POST(API.ENDPOINTS.login, formFields).then(({ data }) => {
        console.log(data);
        AUTH.setToken(data.token);
        AUTH.isSuperUser(data.is_superuser);
        navigate('/wishlist');
        console.log('Successfully logged in');
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Paper
      elevation={3}
      sx={{ width: '25dvw', height: '80dvh', mt: '5dvh', mr: '1dvw' }}
    >
      <div className='login-container'>
        <h1 className='login-title'>LOGIN</h1>
        <form onSubmit={handleSubmit}>
          <div className='login-input-container'>
            <label htmlFor='email' className='login-label'>
              EMAIL:
            </label>
            <input
              type='email'
              id='email'
              name='email'
              onChange={handleChange}
              className='login-input'
              required
            ></input>
            <label htmlFor='password' className='login-label'>
              PASSWORD:
            </label>
            <div className='login-password-div'>
              <input
                type={showPassword ? 'text' : 'password'}
                id='password'
                name='password'
                onChange={handleChange}
                className='login-password-input'
                required
              ></input>
              {showPassword ? (
                <VisibilityOutlined
                  className='visibility-button'
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                />
              ) : (
                <VisibilityOffOutlined
                  className='visibility-button'
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                />
              )}
            </div>
            <Button
              variant='contained'
              type='submit'
              className='login-button'
              sx={{ mt: '2dvh' }}
            >
              SIGN IN
            </Button>
          </div>
        </form>
      </div>
    </Paper>
  );
}
