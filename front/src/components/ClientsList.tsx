import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { ITaskClient } from '../interfaces/TaskClient'

type Props = {}

const ClientsList = (props: Props) => {
    const [clientsList, setClientsList] = useState<ITaskClient[]>([])

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

  return (
    <>
    {clientsList.length > 0 ? (
        
        (clientsList.map(client => (
          <div key={client.id} className='bg-app-lgreen p-4 rounded-xl w-2/5 m-4 font-roboto text-lg'>
            <p>Nome: {client.name}</p>
            <p>{client.document_type}: {client.document_number}</p>
          </div>
        )))
    ) : (
        <p>Não há clientes cadastrados</p>
    )}
    </>
  )
}

export default ClientsList