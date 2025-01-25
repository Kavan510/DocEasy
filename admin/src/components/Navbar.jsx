import React, { useContext } from 'react'
import { assets } from '../assets/assets'
import { AdminContext } from '../context/adminContext'
import { useNavigate } from 'react-router-dom'

const Navbar = () => {
const {atoken,setAToken} = useContext(AdminContext)
const navigate= useNavigate();


const logout = ()=>{
    navigate('/')
    atoken && setAToken('')
    atoken && localStorage.removeItem('atoken') 
}
  return (
    <div className='flex justify-between items-center px-4 sm:px-10 py-3 border-b bg-white'>
      <div className='flex items-center gap-2 text-xs'>
        <img className='w-36 cursor-pointer sm:w-40 ' src={assets.admin_logo} alt="" />
        <p className='border rounded-full px-2.5 py-0.5 border-gray-600 text-gray-600'>{ atoken? 'Admin' :'Doctor'} </p>
      </div>
      <button  onClick={logout}
       className='cursor-pointer hover:scale-105 transition-all duration-300 bg-primary text-white text-sm px-10 py-2 rounded-full'>Logout</button>
    </div>
  )
}

export default Navbar
