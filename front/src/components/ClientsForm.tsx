import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { ITaskClient } from '../interfaces/TaskClient'

type Props = {
  btnText: string,
  setClientsList?: React.Dispatch<React.SetStateAction<ITaskClient[]>>,
  clientsList: ITaskClient[],
  closeModal?(): void,
  client?: ITaskClient | null,
  handleUpdate?(client: ITaskClient): void
}

const ClientsForm = ({btnText ,setClientsList, clientsList, closeModal, client, handleUpdate}: Props) => {
    const [form, setForm] = useState({name: '', document_type: '', document_number: '', street_address: '', city: '', state: ''})
    const token = localStorage.getItem('token');
    const [estados, setEstados] = useState<{ sigla: string; nome: string }[]>([])
    const [cidades, setCidades] = useState<{ nome: string }[]>([])

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      setForm({...form, [e.target.name]: e.target.value})
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault()
      if(handleUpdate) {
        handleUpdate({...client, ...form} as ITaskClient)
      } else {
        try {
        const response = await axios.post('http://localhost:3000/clients', form, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        setClientsList!([...clientsList, response.data])
        closeModal!()
      } catch (error) {
        alert("Não foi possível cadastrar o cliente")
      }}
    }

    useEffect(() =>{
      if(client){
        setForm(client)
      }
    }, [client])

    // Fetch na API do IBGE
    useEffect(() => {
      axios.get('https://servicodados.ibge.gov.br/api/v1/localidades/estados?orderBy=nome')
      .then(res => setEstados(res.data))
    }, [])

    useEffect(() =>{
      if(form.state) {
        axios.get(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${form.state}/municipios`)
        .then(res => setCidades(res.data))
      } else {
        setCidades([])
      }
    }, [form.state])

  return (
    <form onSubmit={handleSubmit} className='bg-app-lgreen w-full p-6 rounded-2xl h-180 flex flex-col gap-4 text-app-brown text-medium'>
      <div className="flex flex-col">
        <label htmlFor='name'>Nome: </label>
        <input type='text' id='name' name='name' value={form.name} required className='w-full p-2 rounded-lg bg-app-white' onChange={handleChange}/>
      </div>
      <div className="flex flex-col">
        <label htmlFor='document_type'>Documento: </label>
        <div className="flex gap-2">
        <input required className='accent-app-brown' onChange={handleChange} type='radio' id='document_type' name='document_type' value="CPF" checked={form.document_type === 'CPF'}/>
        <label htmlFor='CPF'>CPF</label>
        </div>
        <div className="flex gap-2">
        <input required className='accent-app-brown' onChange={handleChange} type='radio' id='document_type' name='document_type' value="CNPJ" checked={form.document_type === 'CNPJ'}/>
        <label htmlFor='CNPJ'>CNPJ</label>
        </div>
      </div>
      <div className="flex flex-col">
        <label htmlFor='document_number'>Número do documento: </label>
        <input required className='w-full p-2 rounded-lg bg-app-white' onChange={handleChange} type='text' id='document_number' name='document_number' value={form.document_number}/>
      </div>
      <div className="flex flex-col">
        <label htmlFor='street_address'>Rua e número: </label>
        <input required className='w-full p-2 rounded-lg bg-app-white' onChange={handleChange} type='text' id='street_address' name='street_address' value={form.street_address}/>
      </div>
      <div className="flex flex-col">
        <label htmlFor='state'>Estado: </label>
        <select name='state'
    value={form.state}
    onChange={handleChange}
    required
    className='w-full p-2 rounded-lg bg-app-white'>
        <option value=''>Selecione um estado</option>
          {estados.map((estados) => (
            <option key={estados.sigla} value={estados.sigla}>
              {estados.nome}
            </option>
          ))}
        </select>
      </div>
      <div className="flex flex-col">
        <label htmlFor='city'>Cidade: </label>
        <select name='city'
    value={form.city}
    onChange={handleChange}
    required
    className='w-full p-2 rounded-lg bg-app-white'>
          <option value=''>Selecione uma cidade</option>
        {cidades.map((cidades) => (
            <option key={cidades.nome} value={cidades.nome}>
              {cidades.nome}
            </option>
          ))}
        </select>
      </div>
      <div className='flex justify-center'>
      <input type='submit' value={btnText} className='bg-app-brown hover:bg-app-lbrown text-app-white hover:text-app-brown  w-36 h-8 rounded-xl cursor-pointer'/>
      </div>
    </form>
  )
}

export default ClientsForm