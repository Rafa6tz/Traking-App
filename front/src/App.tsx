import { BrowserRouter, Routes, Route} from 'react-router-dom'
import HomeIn from './pages/HomeIn';
import HomeOut from './pages/HomeOut';
import Login from './pages/Login';
import Register from './pages/Register';
import Nav from './components/Nav';

function App() {
  const token = localStorage.getItem('token');

  return (
    <>
      <BrowserRouter>
      <Nav/>
      <Routes>
        <Route path='/' element={token ? <HomeIn/> : <HomeOut/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/register' element={<Register/>}/>
      </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
