import React, { useEffect, useState } from 'react'
import { FaPlusCircle } from 'react-icons/fa'
import SupplierForm from '../components/SupplierForm'
import SuppliersList from '../components/SuppliersList'
import axios from 'axios'
import { ITaskSupplier } from '../interfaces/TaskSupplier'

const Suppliers = () => {
  const [addSupplierModal, setAddSupplierModal] = useState<boolean>(false)
  const [suppliersList, setSuppliersList] = useState<ITaskSupplier[]>([])
  const token = localStorage.getItem('token');
  const [suppliersToUpdate, setSuppliersToUpdate] = useState<ITaskSupplier | null>(null)


  // ---------------------------------------------------------------
  //MODAL
  const toggleModal = () =>{
    setAddSupplierModal(!addSupplierModal)
  }

  // ---------------------------------------------------------------
  //GET
  useEffect(() => {
    const token = localStorage.getItem("token")
    axios.get("http://localhost:3000/suppliers", {
        headers: {
            Authorization: `Bearer ${token}`
          }
    }
    )
  .then(res => setSuppliersList(res.data))
  .catch(err => console.error("Erro ao buscar tarefas:", err))
}, [])

  // ---------------------------------------------------------------
  //DELETE
  const deleteSupplier = async (id: string) =>{
    try {
      await axios.delete(`http://localhost:3000/suppliers/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      })
      setSuppliersList(suppliersList.filter(supplier => supplier.id !== id))
    } catch (error) {
      console.error("Erro ao deletar tarefa", error)
    }
  }

  // ---------------------------------------------------------------
  //UPDATE
  const editSuppliers = (supplier: ITaskSupplier) => {
    setSuppliersToUpdate(supplier)
  }

  const updateSuppliers = async (supplier: ITaskSupplier) => {
    try {
      await axios.put(`http://localhost:3000/suppliers/${supplier.id}`, supplier, {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      });
  
      const updatedItems = suppliersList.map(c =>
        c.id === supplier.id ? supplier : c
      );
      setSuppliersList(updatedItems); 
      setSuppliersToUpdate(null);
      toggleModal();
    } catch (error) {
      console.error("Erro ao atualizar Fornecedor:", error);
    }
  }
  

  return (
    <div className='font-roboto text-app-brown bg-app-white h-screen w-full py-24 flex flex-col items-center'>
      {addSupplierModal && (
        <div className="w-full h-full fixed inset-0 flex items-center justify-center">
            <div className="absolute inset-0 bg-gray-800 opacity-70 z-10" onClick={toggleModal}>
            </div>
           <div className="z-10 flex flex-col items-center w-3/6 h-9/10">
          {suppliersToUpdate ? (<SupplierForm btnText='Editar' handleUpdate={updateSuppliers} suppliersList={suppliersList} supplier={suppliersToUpdate} />) : (<SupplierForm btnText='Cadastrar' setSuppliersList={setSuppliersList} suppliersList={suppliersList} closeModal={toggleModal}/>)} 
            <p className="rounded-full bg-gray-200 text-xl w-8 h-8 text-center m-2 cursor-pointer hover:bg-red-300" onClick={toggleModal}>x</p>
          </div>
        </div>
      )}
      <h3 className='text-2xl'>Cadastro de Fornecedores</h3>
      <button onClick={() => {
  setSuppliersToUpdate(null);
  toggleModal();
}}  className='flex cursor-pointer hover:bg-app-green hover:text-app-lgreen justify-center items-center gap-2 bg-app-brown text-app-lbrown w-56 h-6 rounded-xl m-12'><FaPlusCircle/>Adicionar Novo Fornecedor</button>
      <SuppliersList handleDelete={deleteSupplier} suppliersList={suppliersList} handleEdit={(supplier) => {editSuppliers(supplier); toggleModal()}}/>
      
    </div>
  )
}

export default Suppliers