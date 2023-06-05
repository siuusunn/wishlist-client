import Login from './Login';
import Register from './Register';
import '../styles/loginAndRegister.scss';

export default function LoginAndRegister() {
  return (
    <div className='LoginAndRegisterContainer'>
      <Login />
      <Register />
    </div>
  );
}
