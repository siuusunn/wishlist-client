import Wishlist from './Wishlist';
import LoginAndRegister from './LoginAndRegister';
import { useAuthenticated } from '../hooks/useAuthenticated';

export default function Home() {
  const [isLoggedIn, setIsLoggedIn] = useAuthenticated();

  // return <>{isLoggedIn ? <Wishlist /> : <LoginAndRegister />}</>;
  return <h1>HOME COMPONENT</h1>;
}
