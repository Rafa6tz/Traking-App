import axios from 'axios'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Register = () => {
    const [form, setForm] = useState({name: '', document_type: '', document_number: '', street_address: '', city: '', state: '', email: '', password: ''})
    const navigate = useNavigate()
    
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setForm({...form, [e.target.name]: e.target.value})
      console.log(form)
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault()
      try {
        await axios.post('http://localhost:3000/register', form)
        navigate('/login')
      } catch (error) {
        alert("Deu ruim")
      }
    }

  return (
    <div className='w-full h-full flex flex-col justify-center items-center bg-app-white font-roboto py-24'>
    <form onSubmit={handleSubmit} className='bg-app-lgreen md:w-3/6 w-4/5 p-8 rounded-2xl h-190 flex flex-col gap-5 text-app-brown text-medium'>
      <div className="flex flex-col">
        <label htmlFor='name'>Nome: </label>
        <input type='text' id='name' name='name' required className='w-full p-2 rounded-lg bg-app-white' onChange={handleChange}/>
      </div>
      <div className="flex flex-col">
        <label htmlFor='document_type'>Documento: </label>
        <div className="flex gap-2">
        <input required className='accent-app-brown' onChange={handleChange} type='radio' name='document_type' value="CPF"/>
        <label htmlFor='CPF'>CPF</label>
        </div>
        <div className="flex gap-2">
        <input required className='accent-app-brown' onChange={handleChange} type='radio' name='document_type' value="CNPJ"/>
        <label htmlFor='CNPJ'>CNPJ</label>
        </div>
      </div>
      <div className="flex flex-col">
        <label htmlFor='document_number'>Número do documento: </label>
        <input required className='w-full p-2 rounded-lg bg-app-white' onChange={handleChange} type='text' id='document_number' name='document_number'/>
      </div>
      <div className="flex flex-col">
        <label htmlFor='street_address'>Rua e número: </label>
        <input required className='w-full p-2 rounded-lg bg-app-white' onChange={handleChange} type='text' id='street_address' name='street_address'/>
      </div>
      <div className="flex flex-col">
        <label htmlFor='city'>Cidade: </label>
        <input required className='w-full p-2 rounded-lg bg-app-white' onChange={handleChange} type='text' id='city' name='city'/>
      </div>
      <div className="flex flex-col">
        <label htmlFor='state'>Estado: </label>
        <input required className='w-full p-2 rounded-lg bg-app-white' onChange={handleChange} type='text' id='state' name='state'/>
      </div>
      <div className="flex flex-col">
        <label htmlFor='email'>E-mail: </label>
        <input required className='w-full p-2 rounded-lg bg-app-white' onChange={handleChange} type='text' id='email' name='email'/>
      </div>
      <div className="flex flex-col">
        <label htmlFor='password'>Senha: </label>
        <input required className='w-full p-2 rounded-lg bg-app-white' onChange={handleChange} type='password' id='password' name='password'/>
      </div>
      <div className='flex justify-center'>
      <input type='submit' value="Cadastrar" className='bg-app-brown hover:bg-app-lbrown text-app-white hover:text-app-brown  w-36 h-8 rounded-xl cursor-pointer'/>
      </div>
    </form>
    </div>
  )
}

export default Register