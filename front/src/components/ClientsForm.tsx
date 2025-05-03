import axios from 'axios'
import React, { useState } from 'react'
import { ITaskClient } from '../interfaces/TaskClient'

type Props = {
  btnText: string,
  setClientsList?: React.Dispatch<React.SetStateAction<ITaskClient[]>>,
  clientsList: ITaskClient[],
  closeModal(): void
}

const ClientsForm = ({btnText ,setClientsList, clientsList, closeModal}: Props) => {
    const [form, setForm] = useState({name: '', document_type: '', document_number: '', street_address: '', city: '', state: ''})
    const token = localStorage.getItem('token');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setForm({...form, [e.target.name]: e.target.value})
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault()
      try {
        const response = await axios.post('http://localhost:3000/clients', form, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        setClientsList!([...clientsList, response.data])
        closeModal()
      } catch (error) {
        alert("Deu ruim")
      }
    }

  return (
    <form onSubmit={handleSubmit} className='bg-app-lgreen w-full p-6 rounded-2xl h-180 flex flex-col gap-4 text-app-brown text-medium'>
      <div className="flex flex-col">
        <label htmlFor='name'>Nome: </label>
        <input type='text' id='name' name='name' required className='w-full p-2 rounded-lg bg-app-white' onChange={handleChange}/>
      </div>
      <div className="flex flex-col">
        <label htmlFor='document_type'>Documento: </label>
        <div className="flex gap-2">
        <input required className='accent-app-brown' onChange={handleChange} type='radio' id='document_type' name='document_type' value="CPF"/>
        <label htmlFor='CPF'>CPF</label>
        </div>
        <div className="flex gap-2">
        <input required className='accent-app-brown' onChange={handleChange} type='radio' id='document_type' name='document_type' value="CNPJ"/>
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
      <div className='flex justify-center'>
      <input type='submit' value={btnText} className='bg-app-brown hover:bg-app-lbrown text-app-white hover:text-app-brown  w-36 h-8 rounded-xl cursor-pointer'/>
      </div>
    </form>
  )
}

export default ClientsForm