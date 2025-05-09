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
        <div key={code.id} className='bg-app-lgreen p-4 rounded-xl md:w-2/5 w-4/6 m-4 shadow-2xl font-roboto text-lg'>
            <div>
                <p>Nome do código: </p>
                <p className='text-app-lbrown'>{code.name}</p>
            </div>
            <div className='pt-2'>
                <p>Código: </p>
                <p className='text-app-lbrown'>{code.code}</p>
            </div>
            <div className='flex justify-center p-2'>
                <button onClick={() => handleDelete(code.id)} className='flex gap-2 justify-center items-center w-36 cursor-pointer rounded-2xl bg-red-800 text-xl text-app-lbrown'><FaTrashAlt/>Deletar</button>
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