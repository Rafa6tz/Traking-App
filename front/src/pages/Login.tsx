import axios from 'axios'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

const Login = ({ setToken }: { setToken: (token: string) => void }) => {
  const [form, setForm] = useState({email: '', password: ''})
  const navigate = useNavigate()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({...form, [e.target.name]: e.target.value})
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) =>{
    e.preventDefault()

    try {
      const result = await axios.post('http://localhost:3000/login', form)
      localStorage.setItem('token', result.data.token)
      setToken(result.data.token);
      alert('Sucesso')
      navigate('/')
    } catch (error) {
      alert('erro')
    }
  }

  return (
    <div className='w-full h-screen flex flex-col justify-center items-center bg-app-white font-roboto'>
      <p className='text-app-brown p-4 text-xl text-wrap w-100 text-center'>Faça seu Login para acessar ou clique em <Link to='/register' className='text-app-green hover:text-app-lgreen'>Registrar</Link> para criar uma conta.</p>
    <form onSubmit={handleSubmit} className='bg-app-lgreen w-2/5 p-6 rounded-2xl h-52 flex flex-col gap-6 text-app-brown text-lg'>
      <div>
        <label htmlFor='email'>E-mail: </label>
        <input id='email' name='email' type='email' onChange={handleChange} required className='w-4/5 p-2 mx-3 rounded-lg bg-app-white'/>
      </div>
      <div>
        <label htmlFor='password'>Senha: </label>
        <input id='password' name='password' type='password' onChange={handleChange} required className='w-4/5 p-2 mx-3 rounded-lg bg-app-white'/>
      </div>
      <div className='flex justify-center'>
      <input type='submit' value="Entrar" className='bg-app-brown hover:bg-app-lbrown text-app-white hover:text-app-brown  w-30 rounded-xl cursor-pointer'/>
      </div>
    </form>
    </div>
  )
}

export default Login