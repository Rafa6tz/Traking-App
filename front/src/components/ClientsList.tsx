import { ITaskClient } from '../interfaces/TaskClient'
import {FaUserEdit, FaTrashAlt} from 'react-icons/fa'

type Props = {
  handleDelete(id: string): void,
  clientsList: ITaskClient[],
  handleEdit(client: ITaskClient): void,
}

const ClientsList = ({handleDelete, clientsList, handleEdit}: Props) => {

    

  return (
    <>
    {clientsList.length > 0 ? (
        
        (clientsList.map(client => (
          <div key={client.id} className='bg-app-lgreen p-4 rounded-2xl w-2/5 m-4 font-roboto text-lg shadow-lg'>
            <div className='flex gap-2 p-2'>
            <p>Nome: </p>
            <p className='text-xl text-app-white'>{client.name}</p>
            </div>
            <div className='flex gap-2 p-2'>
            <p>{client.document_type}:</p>
            <p className='text-xl text-app-white'>{client.document_number}</p>
            </div>
            <div className='flex justify-around mt-2'>
            <button onClick={() => handleDelete(client.id)} className='cursor-pointer flex gap-2 justify-center items-center w-28 rounded-2xl bg-red-800 text-xl text-app-lbrown'><FaTrashAlt/>Deletar</button>
            <button onClick={() => handleEdit(client)} className='cursor-pointer flex gap-2 justify-center items-center w-28 rounded-2xl bg-amber-500 text-xl text-app-lbrown'><FaUserEdit/>Editar</button>
            </div>
          </div>
        )))
    ) : (
        <p>Não há clientes cadastrados</p>
    )}
    </>
  )
}

export default ClientsList