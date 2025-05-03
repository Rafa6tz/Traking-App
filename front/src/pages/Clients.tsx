import React, { useEffect, useState } from 'react'
import { FaPlusCircle } from 'react-icons/fa'
import ClientsForm from '../components/ClientsForm'
import ClientsList from '../components/ClientsList'
import axios from 'axios'
import { ITaskClient } from '../interfaces/TaskClient'

const Clients = () => {
  const [addClientModal, setAddClientModal] = useState<boolean>(false)
  const [clientsList, setClientsList] = useState<ITaskClient[]>([])
  const token = localStorage.getItem('token');
  const [clientsToUpdate, setClientsToUpdate] = useState<ITaskClient | null>(null)

  // ---------------------------------------------------------------
  //MODAL
  const toggleModal = () =>{
    setAddClientModal(!addClientModal)
  }

  // ---------------------------------------------------------------
  //GET
  useEffect(() => {
    const token = localStorage.getItem("token")
    axios.get("http://localhost:3000/clients", {
        headers: {
            Authorization: `Bearer ${token}`
          }
    }
    )
  .then(res => setClientsList(res.data))
  .catch(err => console.error("Erro ao buscar tarefas:", err))
}, [])

  // ---------------------------------------------------------------
  //DELETE
  const deleteClient = async (id: string) =>{
    try {
      await axios.delete(`http://localhost:3000/clients/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      })
      setClientsList(clientsList.filter(client => client.id !== id))
    } catch (error) {
      console.error("Erro ao deletar tarefa", error)
    }
  }

  // ---------------------------------------------------------------
  //UPDATE

  return (
    <div className='font-roboto text-app-brown bg-app-white h-screen w-full py-24 flex flex-col items-center'>
      {addClientModal && (
        <div className="w-full h-full fixed inset-0 flex items-center justify-center">
            <div className="absolute inset-0 bg-gray-800 opacity-70 z-10" onClick={toggleModal}>
            </div>
           <div className="z-10 flex flex-col items-center w-3/6 h-9/10">
           <ClientsForm btnText='Cadastrar' setClientsList={setClientsList} clientsList={clientsList} closeModal={toggleModal}/>
            <p className="rounded-full bg-gray-200 text-xl w-8 h-8 text-center m-2 cursor-pointer hover:bg-red-300" onClick={toggleModal}>x</p>
          </div>
        </div>
      )}
      <h3 className='text-2xl'>Cadastro de Clientes</h3>
      <button onClick={toggleModal} className='flex cursor-pointer hover:bg-app-green hover:text-app-lgreen justify-center items-center gap-2 bg-app-brown text-app-lbrown w-56 h-6 rounded-xl m-12'><FaPlusCircle/>Adicionar Novo Cliente</button>
      <ClientsList handleDelete={deleteClient} clientsList={clientsList}/>
    </div>
  )
}

export default Clients