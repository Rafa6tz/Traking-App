import React from 'react'
import { Link } from 'react-router-dom'

const HomeOut = () => {
  return (
    <div className='h-screen flex flex-col justify-center items-center font-roboto gap-12 bg-app-white'>
      <div className='flex flex-col items-center'>
      <h2 className='text-4xl text-app-brown'>Bem vindo ao Traking!</h2>
      <p className='text-medium text-app-green'>A plataforma perfeita para Rastreamento.</p>
      </div>
      <div>
      <p className='text-app-brown p-4 text-lg text-wrap w-100 text-center'>Faça seu <Link to='/login' className='text-app-green hover:text-app-lgreen'>Login</Link> para acessar ou clique em <Link to='/register' className='text-app-green hover:text-app-lgreen'>Registrar</Link> para criar uma conta.</p>
      </div>
    </div>
  )
}

export default HomeOut