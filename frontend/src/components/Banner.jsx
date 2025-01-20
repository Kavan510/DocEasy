

import React from 'react'
import { assets } from '../assets/assets_frontend/assets'
import { useNavigate } from 'react-router-dom'

const Banner = () => {
    const navigate = useNavigate();
  return (
    <div className='flex px-6 sm:px-10 md:px-14 lg:px-12 my-20 md:mx-10 bg-primary rounded-lg'>
      {/* left side */}
        <div className='flex-1 py-8 sm:py-10 md:py-16 lg:py-24 lg:pl-5 '> 
            {/* understand the upperclass className */}
            <div className='text-xl sm:text-2xl md:text-3xl lg:text-5xl font-semibold text-white'>

            <p className=''>Book Appointment</p>
            <p className='mt-4'>With 100+ Trusted Doctors</p>
            </div>
            <button
            onClick={()=>{
                navigate('login');
                scrollTo(0,0)
            }}
             className='rounded-full bg-white text-sm sm:text-base text-gray-800 px-8 py-3 mt-6 hover:scale-105 transition-all'>Create Account</button>
        </div>

        {/* right side */}
        <div className='md:w-1/2 relative lg:w-[370px] md:block hidden'> 

    <img className='w-full absolute bottom-0 right-0 max-w-md ' src={assets.appointment_img} alt="" />
        </div>

    </div>
  )
}

export default Banner
