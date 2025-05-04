import axios from 'axios'
import React, { useEffect, useState } from 'react'
import {FaUserEdit, FaTrashAlt} from 'react-icons/fa'
import { ITaskSupplier } from '../interfaces/TaskSupplier'

type Props = {
  handleDelete(id: string): void,
  suppliersList: ITaskSupplier[],
  handleEdit(supplier: ITaskSupplier): void,
}

const SuppliersList = ({handleDelete, suppliersList, handleEdit}: Props) => {

    

  return (
    <>
    {suppliersList.length > 0 ? (
        
        (suppliersList.map(client => (
          <div key={client.id} className='bg-app-lgreen p-4 rounded-xl w-2/5 m-4 font-roboto text-lg'>
            <div className='flex gap-2 p-2'>
            <p>Nome: </p>
            <p className='text-xl font-semibold'>{client.name}</p>
            </div>
            <div className='flex gap-2 p-2'>
            <p>{client.document_type}:</p>
            <p className='text-xl font-semibold'>{client.document_number}</p>
            </div>
            <div className='flex justify-around mt-2'>
            <button onClick={() => handleDelete(client.id)} className='flex gap-2 justify-center items-center w-28 rounded-2xl bg-red-800 text-xl text-app-lbrown'><FaTrashAlt/>Deletar</button>
            <button onClick={() => handleEdit(client)} className='flex gap-2 justify-center items-center w-28 rounded-2xl bg-amber-500 text-xl text-app-lbrown'><FaUserEdit/>Editar</button>
            </div>
          </div>
        )))
    ) : (
        <p>Não há clientes cadastrados</p>
    )}
    </>
  )
}

export default SuppliersList