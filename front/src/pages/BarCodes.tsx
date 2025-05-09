import React, { useEffect, useState } from 'react'
import BarCodesForm from '../components/BarCodesForm'
import { ITaskBarCode } from '../interfaces/TaskBarCode'
import axios from 'axios'
import BarCodesList from '../components/BarCodesList'

const BarCodes = () => {
  const [codeList, setCodeList] = useState<ITaskBarCode[]>([])
  const token = localStorage.getItem('token')


  // GET
  useEffect(() =>  {
    const fetchData = async () => {
      try {
        const result = await axios.get('http://localhost:3000/barcodes', {
          headers: {
              Authorization: `Bearer ${token}`
            }
      })
      setCodeList(result.data)
      } catch (error) {
        alert('Erro ao fazer a busca de códigos')
      }
    }

    fetchData()
  }, [])


  // DELETE

  const deleteBarCode = async (id: string) =>{
    
    const result = await axios.delete(`http://localhost:3000/barcodes/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    })
    setCodeList(codeList.filter((code) => code.id !== id))
  }

  return (
    <div className='font-roboto text-app-brown bg-app-white min-h-screen w-full py-24 flex flex-col items-center'>
    <BarCodesForm btnText='Adicionar' codeList={codeList} setCodeList={setCodeList}/>
    <BarCodesList codeList={codeList} handleDelete={deleteBarCode}/>
    </div>
  )
}

export default BarCodes