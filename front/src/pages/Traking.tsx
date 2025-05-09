import { FaPlusCircle } from 'react-icons/fa';
import TrakingForm from '../components/TrakingForm'
import TrakingList from '../components/TrakingList'

const Traking = () => {
  return (
    <div className='font-roboto text-app-brown bg-app-white min-h-screen w-full py-24 flex flex-col items-center'>
      <div className='font-roboto text-app-brown flex justify-center items-center flex-col'>
        <h3 className='text-2xl'>
          Rastreamento
        </h3>
        <button  className='flex cursor-pointer hover:bg-app-green hover:text-app-white justify-center items-center gap-2 bg-app-brown text-app-lbrown w-64 h-6 rounded-xl m-12'><FaPlusCircle/>Começar Rastreabilidade</button>
      </div>
      
      <hr className="border-t-2 border-app-lbrown w-7/8"/>
      <TrakingForm/>
      <TrakingList/>
    </div>
  )
}

export default Traking