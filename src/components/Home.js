import { Link } from 'react-router-dom';
import { useAuthenticated } from '../hooks/useAuthenticated';
import '../styles/Home.scss';

export default function Home() {
  const [isLoggedIn, setIsLoggedIn] = useAuthenticated();

  // return <>{isLoggedIn ? <Wishlist /> : <LoginAndRegister />}</>;
  return (
    <div className='home-container'>
      <h1>🎧 WISHLIST APP 🎧</h1>
      <h3>🎵 Add your favorite tracks to your wishlist 🎶</h3>
      <h4>
        📝 <Link to='/register'>Register Now</Link>
      </h4>
      <h4>
        ✍️ Have an account? <Link to='/login'>Sign in!</Link>
      </h4>
    </div>
  );
}
