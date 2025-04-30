import {NavLink, useNavigate} from 'react-router-dom'

const Nav = () => {
    const navigate = useNavigate();
    const token = localStorage.getItem('token');

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login');
      };

  return (
    <nav className='flex justify-around'>
        <p>Traking</p>
        {token ? (
            <div><button onClick={handleLogout}>Sair</button></div>
        ) : (
            <div>
                <NavLink to="/login">Login</NavLink>
                <NavLink to="/register">Registrar</NavLink>
            </div>
        )}
    </nav>
  )
}

export default Nav