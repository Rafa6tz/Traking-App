import axios from 'axios'
import React, { useState } from 'react'
import { ITaskBarCode } from '../interfaces/TaskBarCode'

type Props = {
    btnText: string,
    setCodeList: React.Dispatch<React.SetStateAction<ITaskBarCode[]>>,
    codeList: ITaskBarCode[]
}

const BarCodesForm = ({btnText, setCodeList, codeList}: Props) => {
    const [form, setForm] = useState({name: '', code: ''})
    const token = localStorage.getItem('token')

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>{
        setForm({...form, [e.target.name]: e.target.value})
    }

    const addBarcode = async (e: React.FormEvent<HTMLFormElement>) =>{
        e.preventDefault()
        try {
            const response = await axios.post('http://localhost:3000/barcodes', form, {
                headers: {
                  Authorization: `Bearer ${token}`
                }
              })
        setCodeList([...codeList, response.data])
        setForm({name: '', code: ''})
        } catch (error) {
            alert('Erro ao adicionar')
        }
    }

  return (
    <form onSubmit={addBarcode} className='bg-app-lgreen w-3/5 p-6 rounded-2xl h-56 flex flex-col gap-4 text-app-brown text-medium'>
    <div>
        <label htmlFor='name'>Nome do código: </label>
        <input type='text' name='name' id='name' className='w-full p-2 rounded-lg bg-app-white' onChange={handleChange} value={form.name} required/>
    </div>
    <div>
        <label htmlFor='code'>Código: </label>
        <input type='text' name='code' id='code' className='w-full p-2 rounded-lg bg-app-white' onChange={handleChange} value={form.code} required/>
    </div>
    <div className='flex justify-center'>
    <input type='submit' value={btnText} className='bg-app-brown hover:bg-app-lbrown text-app-white hover:text-app-brown  w-36 h-8 rounded-xl cursor-pointer'/>
    </div>
    </form>
  )
}

export default BarCodesForm