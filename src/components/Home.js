import { Link } from 'react-router-dom';
import { useAuthenticated } from '../hooks/useAuthenticated';

export default function Home() {
  const [isLoggedIn, setIsLoggedIn] = useAuthenticated();

  // return <>{isLoggedIn ? <Wishlist /> : <LoginAndRegister />}</>;
  return (
    <>
      <h1>🎧 WISHLIST APP 🎧</h1>
      <h3>🎵 Add your favorite tracks to your wishlist 🎶</h3>
      <Link to='/register'>
        <h4>📝 Register Now</h4>
      </Link>
      <h4>
        ✍️ Have an account? <Link to='/login'>Sign in!</Link>
      </h4>
    </>
  );
}
