import React, { useState } from 'react'
import { FaPlusCircle } from 'react-icons/fa'
import ClientsForm from '../components/ClientsForm'
import ClientsList from '../components/ClientsList'

const Clients = () => {
  const [addClientModal, setAddClientModal] = useState<boolean>(false)

  const toggleModal = () =>{
    setAddClientModal(!addClientModal)
  }

  return (
    <div className='font-roboto text-app-brown bg-app-white h-screen w-full py-24 flex flex-col items-center'>
      {addClientModal && (
        <div className="w-full h-full fixed inset-0 flex items-center justify-center">
        <div className="w-full h-full bg-gray-800 inset-0 opacity-70 absolute z-10" onClick={toggleModal}></div>
        <div className="z-20 flex flex-col items-center w-full h-9/10">
        <ClientsForm/>
        <p className="rounded-full bg-gray-200 text-xl w-8 h-8 text-center m-2 cursor-pointer hover:bg-red-300" onClick={toggleModal}>x</p>
        </div>
      </div>
      )}
      <h3 className='text-2xl'>Cadastro de Clientes</h3>
      <button onClick={toggleModal} className='flex cursor-pointer hover:bg-app-green hover:text-app-lgreen justify-center items-center gap-2 bg-app-brown text-app-lbrown w-56 h-6 rounded-xl m-12'><FaPlusCircle/>Adicionar Novo Cliente</button>
      <ClientsList/>
    </div>
  )
}

export default Clients