import React from 'react'
import { useContext } from 'react'
import { DoctorContext } from '../../context/doctorContext'
import { useEffect } from 'react'
import { AppContext } from '../../context/appContext'
import { assets } from '../../assets/assets'

const DoctorAppointment = () => {
const {dtoken,getAppointments,appointments,cancelAppointment,completeAppointment} = useContext(DoctorContext)
const {calculateAge,slotDateFormat,currencySymbol} = useContext(AppContext) 


useEffect(()=>{ 
if(dtoken){ 
  getAppointments()
}
},[dtoken])


  return (
    <div className='w-full max-w-6xl m-5'>
      <p className='mb-3 text-lg font-medium'>All Appointments</p>
      <div className='bg-white border rounded text-sm max-h-[80vh] min-h-[50vh] overflow-y-scroll'>
        <div className='max-sm:hidden grid grid-cols-[0.5fr_2fr_1fr_1fr_3fr_1fr_1fr] gap-1 py-3 px-6 border-b font-medium text-gray-800 '>
          <p>#</p>
          <p>Patient</p>
          <p>Payment Status</p>
          <p>Age</p>
          <p>Date & Time</p>
          <p>Fee</p>
          <p>Action</p>
        </div>
      {
        appointments.map((item,index)=>(
          <div className='sm:grid grid-cols-[0.5fr_2fr_1fr_1fr_3fr_1fr_1fr] gap-1 items-center border-b px-6 py-3 hover:bg-gray-100  flex flex-wrap justify-between max-sm:gap-5 max-sm:text-base' key={index}>

          <p className='hidden sm:block'>{index+1} </p>
          <div className='flex items-center gap-2'>
            <img className='w-8 rounded-full' src={item.userData.image} alt="" />
            <p>{item.userData.name} </p>
          </div>
          <div>
            <p className='text-xs inline border border-primary px-2 rounded-full '>{item.payment ? 'online' : 'CASH'} </p>
             </div>
          <p className='max-sm:hidden'>{calculateAge(item.userData.dob)}</p>
          <p>{slotDateFormat(item.slotDate) },{item.slotTime} </p>
          <p>{currencySymbol}{item.amount} </p>
          {
            item.cancelled 
            ?
            <p className='text-red-400 text-xs font-medium '>Cancelled</p>
            :
            
              item.isCompleted
              ?
              <p className='text-green-500 text-xs font-medium'>Completed</p>
              :
              <div className='flex'>
               <img onClick={()=>cancelAppointment(item._id)} className='w-10 cursor-pointer' src={assets.cancel_icon} alt="" />
              <img onClick={()=>completeAppointment(item._id)} className='w-10 cursor-pointer' src={assets.tick_icon} alt="" />
             
            </div>

          }
         
          </div>
        ))
      }
      </div>

    </div>
  )
}

export default DoctorAppointment
