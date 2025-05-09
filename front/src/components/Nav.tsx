import {NavLink, useNavigate} from 'react-router-dom'
import { FaTractor, FaUserTie, FaBarcode, FaCarrot } from "react-icons/fa";

const Nav = () => {
    const navigate = useNavigate();
    const token = localStorage.getItem('token');

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login');
      };

  return (
    <nav className='flex justify-between fixed w-screen p-2 bg-app-green text-app-brown h-12 items-center font-roboto shadow-xl rounded-b-2xl'>
        <a className='text-2xl p-8 font-bold' href='/'>TRAKING</a>
        {token ? (
            <div className='px-12 flex w-full justify-between'>
                <div className='flex justify-between p-8 w-5/6'>
                    <NavLink to="/traking" className={({isActive}) => isActive ? "flex gap-2 items-center text-app-lbrown" : "flex items-center gap-2 hover:font-bold"}><FaCarrot/>Rastreamento</NavLink>
                    <NavLink to="/suppliers" className={({isActive}) => isActive ? "flex gap-2 items-center text-app-lbrown" : "flex gap-2 items-center hover:font-bold"}><FaTractor/>Fornecedores</NavLink>
                    <NavLink to="/clients" className={({isActive}) => isActive ? "flex gap-2 items-center text-app-lbrown" : "flex gap-2 items-center hover:font-bold"}><FaUserTie/>Clientes</NavLink>
                    <NavLink to="/barcodes" className={({isActive}) => isActive ? "flex gap-2 items-center text-app-lbrown" : "flex gap-2 items-center hover:font-bold"}><FaBarcode/>Código de Barras</NavLink>
                </div>
                <button onClick={handleLogout} className='cursor-pointer hover:text-app-lbrown'>Sair</button>
            </div>
        ) : (
            <div className='flex justify-around w-1/5 right-0'>
                <NavLink to="/login" className="hover:text-app-lbrown text-lg hover:text-xl">Login</NavLink>
                <NavLink to="/register" className="hover:text-app-lbrown text-lg hover:text-xl">Registrar</NavLink>
            </div>
        )}
    </nav>
  )
}

export default Nav