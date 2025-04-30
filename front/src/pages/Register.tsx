import axios from 'axios'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Register = () => {
    const [form, setForm] = useState({name: '', document_type: '', document_number: '', street_adress: '', city: '', state: '', email: '', password: ''})
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
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor='name'>Nome: </label>
        <input type='text' id='name' name='name' required onChange={handleChange}/>
      </div>
      <div>
        <label htmlFor='document_type'>Documento: </label>
        <div>
        <input required onChange={handleChange} type='radio' id='document_type' name='document_type' value="CPF"/>
        <label htmlFor='CPF'>CPF</label>
        </div>
        <div>
        <input required onChange={handleChange} type='radio' id='document_type' name='document_type' value="CNPJ"/>
        <label htmlFor='CNPJ'>CNPJ</label>
        </div>
      </div>
      <div>
        <label htmlFor='document_number'>Número do documento: </label>
        <input required onChange={handleChange} type='text' id='document_number' name='document_number'/>
      </div>
      <div>
        <label htmlFor='street_adress'>Rua e número: </label>
        <input required onChange={handleChange} type='text' id='street_adress' name='street_adress'/>
      </div>
      <div>
        <label htmlFor='city'>Cidade: </label>
        <input required onChange={handleChange} type='text' id='city' name='city'/>
      </div>
      <div>
        <label htmlFor='state'>Estado: </label>
        <input required onChange={handleChange} type='text' id='state' name='state'/>
      </div>
      <div>
        <label htmlFor='email'>E-mail: </label>
        <input required onChange={handleChange} type='text' id='email' name='email'/>
      </div>
      <div>
        <label htmlFor='password'>Senha: </label>
        <input required onChange={handleChange} type='password' id='password' name='password'/>
      </div>
      <input type='submit' value="Cadastrar"/>
    </form>
  )
}

export default Register