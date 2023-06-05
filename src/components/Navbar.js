import { Link } from 'react-router-dom';
import { AUTH } from '../lib/auth';
import { useAuthenticated } from '../hooks/useAuthenticated';
import { useNavigate } from 'react-router-dom';

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
      <nav>
        <Link to='/' className='navbar-item'>
          HOME
        </Link>
        {AUTH.getSuperUser() === 'true' ? (
          <Link to='/additem' className='navbar-item'>
            ALL WISHLISTS
          </Link>
        ) : (
          <></>
        )}
        {isLoggedIn ? (
          <>
            <Link to='/wishlist'>WISHLIST</Link>
            <Link to='/' onClick={logout} className='navbar-item'>
              LOGOUT
            </Link>
          </>
        ) : (
          <>
            <Link to='/loginregister' className='navbar-item'>
              LOGIN & REGISTER
            </Link>
          </>
        )}
      </nav>
    </>
  );
}
