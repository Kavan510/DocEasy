import React, { useContext, useState } from 'react'
import {assets} from '../assets/assets.js'
import { AdminContext } from '../context/adminContext.jsx'
import axios from 'axios'
import { toast } from 'react-toastify'
import { DoctorContext } from '../context/doctorContext.jsx'

const Login = () => {
    const [state,setState]= useState('Admin')
    const {setAToken,backendUrl} =useContext(AdminContext)
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')
    const {dtoken,setdToken} = useContext(DoctorContext)
    // console.log("backend url is:"+backendUrl)

    const onSubmitHandler = async (event) => {
        event.preventDefault();
      
        try {
      
            
          if (state === 'Admin') {
            const { data } = await axios.post(backendUrl+'/api/admin/login', { email, password });
      
            if (data.token) {
                localStorage.setItem('atoken',data.token)
                setAToken(data.token);
                
            } else {
              toast.error("Incorrect Credentials")
            }
          }
          else{
            const { data } = await axios.post(backendUrl+'/api/doctor/login', { email, password });
      
            if (data.token) {
                localStorage.setItem('dtoken',data.token)
              setdToken(data.token);
            } else {
              toast.error("Incorrect Credentials")
            }
          }
        }
        catch(e){

        }
      };
      

  return (
    <form onSubmit={onSubmitHandler} className='min-h-[80vh] flex items-center '>
      <div className='flex flex-col gap-3 m-auto items-start p-8 min-w-[340px] sm:min-w-[96] border border-none rounded-xl text-gray-700 text-sm shadow-lg'>
        <p className='text-2xl font-semibold m-auto'><span className='text-primary'>{state}</span> Login</p>
        <div className='w-full'>
            <p className='font-semibold text-md'>Email</p>
            <input onChange={(e)=>setEmail(e.target.value)}  value={email} className='border rounded border-gray-300 w-full p-2 mt-1 ' type="email"   required/>
        </div>
        <div className='w-full'>
            <p className='font-semibold text-md'>Password</p>
            <input onChange={(e)=>setPassword(e.target.value)} value={password} className='border rounded border-gray-300 w-full p-2 mt-1 ' type="password" required />
        </div>
        <button className=' hover:bg-green-500 bg-primary text-white w-full py-2 rounded-md text-base cursor-pointer click:bg-blue-300'>Login</button>
        {
            state==='Admin' ?
            <p>Doctor Login? <span className='cursor-pointer text-primary underline' onClick={()=>setState('Doctor')}>Click here</span> </p>
            :
            <p>Admin Login? <span className='cursor-pointer text-primary underline' onClick={()=>setState('Admin')}>Click here</span></p>
        }
      </div>
    </form>
  )
}

export default Login
