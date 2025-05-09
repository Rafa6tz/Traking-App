import { BrowserRouter, Routes, Route} from 'react-router-dom'
import HomeIn from './pages/HomeIn';
import HomeOut from './pages/HomeOut';
import Login from './pages/Login';
import Register from './pages/Register';
import Nav from './components/Nav';
import { useEffect, useState } from 'react';
import Clients from './pages/Clients';
import Traking from './pages/Traking';
import Supplier from './pages/Supplier';
import BarCodes from './pages/BarCodes';

function App() {

  const isTokenValid = (token: string): boolean => {
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload.exp * 1000 > Date.now();
    } catch {
      return false;
    }
  };
  
  const [token, setToken] = useState<string | null>(localStorage.getItem('token'));
  
  useEffect(() => {
    if (!token || !isTokenValid(token)) {
      localStorage.removeItem('token');
      setToken(null);
      alert('Sessão expirada, faça o Login novamente!');
    }
  }, [token]);
  

  return (
    <>
      <BrowserRouter>
      <Nav/>
      <Routes>
        <Route path='/' element={token ? <HomeIn/> : <HomeOut/>}/>
        <Route path='/login' element={<Login setToken={setToken}/>}/>
        <Route path='/register' element={<Register/>}/>
        <Route path='/clients' element={<Clients/>}/>
        <Route path='/traking' element={<Traking/>}/>
        <Route path='/suppliers' element={<Supplier/>}/>
        <Route path='/barcodes' element={<BarCodes/>}/>
      </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
