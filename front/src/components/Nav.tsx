import {NavLink, useNavigate} from 'react-router-dom'

const Nav = () => {
    const navigate = useNavigate();
    const token = localStorage.getItem('token');

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login');
      };

  return (
    <nav className='flex justify-between fixed w-full bg-app-green text-app-brown h-12 items-center font-roboto'>
        <a className='text-2xl p-8 font-bold' href='/'>TRAKING</a>
        {token ? (
            <div className='px-12'>
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