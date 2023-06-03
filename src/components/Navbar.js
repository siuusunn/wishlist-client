import { Link } from 'react-router-dom';
import { AUTH } from '../lib/auth';
import { useAuthenticated } from '../hooks/useAuthenticated';

export default function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useAuthenticated();

  const logout = () => {
    AUTH.deleteToken();
    setIsLoggedIn(false);
    AUTH.isSuperUser('false');
    window.location.reload();
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
