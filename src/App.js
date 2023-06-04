// import './styles/App.scss';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import LoginAndRegister from './components/LoginAndRegister';
import Wishlist from './components/Wishlist';

window.Buffer = window.Buffer || require('buffer').Buffer;

function App() {
  return (
    <div className='App'>
      <Router>
        <Navbar />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/loginregister' element={<LoginAndRegister />} />
          <Route path='/wishlist' element={<Wishlist />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
