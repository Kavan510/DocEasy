import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../context/AppContext'
import { useNavigate } from 'react-router-dom';

const RelatedDoctors = ({docId,speciality}) => {
    const {doctors} = useContext(AppContext)
    const [relDoc,setRelDoc] = useState([]);
     const navigate = useNavigate()
    useEffect(()=>{

        if(doctors.length >0 && speciality){

            const doctorsData = doctors.filter((doc)=>doc.speciality===speciality && doc._id!==docId)
            setRelDoc(doctorsData)


        }
    },[doctors,speciality,docId])
  return (
    <div>
         <div className='flex flex-col items-center gap-4 my-16 md:mx-10 text-gray-900'>
        <h1 className='text-3xl font-medium'>Related Doctors</h1>
        <p className='sm:w-1/3 text-center text-sm'>Some informative text</p>
        <div className='w-full grid grid-cols-auto gap-4 pt-4 gap-y-6 px-3 sm:px-0'>
{/* upr ni line nathi samjani tw css prop nathi samjani */}
         
        {relDoc.slice(0,5).map((item,index)=>{
            return(
                // aa nathi samjanu kai rite grid use kari ne e tailwind config file ma jaine kaik karyu che joie lje 
                <div onClick={()=>navigate(`/appointment/${item._id}`)} className='border border-blue-200 rounded-xl cursor-pointer overflow-hidden hover:translate-y-[-10px] transition-all duration-500' key={index}>
                    <img className='bg-blue-50 ' src={item.image} alt="" />
                    <div className='p-4'>
                        <div className='flex items-center gap-2 text-sm text-center text-green-500'>
                            <p className='w-2 h-2 bg-green-500 rounded-full '></p><p>Available</p>

                        </div>
                        <p className='text-gray-900 text-lg font-medium'>{item.name} </p>
                        <p className='text-gray-600 text-sm '> {item.speciality} </p>
                    </div>

                    </div>
            )

        })}
        </div>
        <button
        onClick={()=>{
            navigate('/doctors'); scrollTo(0,0);
        }} 
        className='bg-blue-50 text-gray-600 px-12 py-3 rounded-full my-10 hover:scale-105 duration-500 '>More</button>
    </div>
    </div>
  )
}

export default RelatedDoctors
