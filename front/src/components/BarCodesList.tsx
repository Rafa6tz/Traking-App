import React from 'react'
import { ITaskBarCode } from '../interfaces/TaskBarCode'
import { FaTrashAlt } from 'react-icons/fa'

type Props = {
    codeList: ITaskBarCode[],
    handleDelete(id: string): void
}

const BarCodesList = ({codeList, handleDelete}: Props) => {
  return (
    <>
    {codeList.length > 0 ? (codeList.map((code) => (
        <div key={code.id} className='bg-app-lgreen p-4 rounded-xl w-2/5 m-4 font-roboto text-lg'>
            <div>
                <p>Nome do código: </p>
                <p>{code.name}</p>
            </div>
            <div>
                <p>Código: </p>
                <p>{code.code}</p>
            </div>
            <div>
                <button onClick={() => handleDelete(code.id)} className='flex gap-2 justify-center items-center w-28 rounded-2xl bg-red-800 text-xl text-app-lbrown'><FaTrashAlt/>Deletar</button>
            </div>
        </div>
    ))) :
    (
        <p>Não há códigos cadastrados</p>
    )
    }
    </>
  )
}

export default BarCodesList