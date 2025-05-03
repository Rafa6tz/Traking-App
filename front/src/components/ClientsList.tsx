import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { ITaskClient } from '../interfaces/TaskClient'

type Props = {
  handleDelete(id: string): void,
  clientsList: ITaskClient[]
}

const ClientsList = ({handleDelete, clientsList}: Props) => {

    

  return (
    <>
    {clientsList.length > 0 ? (
        
        (clientsList.map(client => (
          <div key={client.id} className='bg-app-lgreen p-4 rounded-xl w-2/5 m-4 font-roboto text-lg'>
            <p>Nome: {client.name}</p>
            <p>{client.document_type}: {client.document_number}</p>
            <button onClick={() => handleDelete(client.id)}>Deletar</button>
          </div>
        )))
    ) : (
        <p>Não há clientes cadastrados</p>
    )}
    </>
  )
}

export default ClientsList