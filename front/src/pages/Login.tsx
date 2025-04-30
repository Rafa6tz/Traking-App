import axios from 'axios'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Login = () => {
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
      alert('Sucesso')
      navigate('/')
    } catch (error) {
      alert('erro')
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor='email'>E-mail: </label>
        <input id='email' name='email' type='email' onChange={handleChange} required/>
      </div>
      <div>
        <label htmlFor='password'>Senha: </label>
        <input id='password' name='password' type='password' onChange={handleChange} required/>
      </div>
      <input type='submit' value="Entrar"/>
    </form>
  )
}

export default Login