import { createContext } from "react";
import axios from 'axios'
import { useState } from "react";
import { useEffect } from "react";
import {toast}from 'react-toastify'
export const AppContext = createContext();

const AppContextProvider = (props)=>{

    const currencySymbol = '$';
    const backendUrl = import.meta.env.VITE_BACKEND_URL;
    const [doctors,setDoctors] = useState([])
    const [token,setToken] = useState(localStorage.getItem('token')?localStorage.getItem('token') : '')
    const [userData,setUserData] = useState(false)

    



    const getDoctorsData = async ()=>{
        try{

            const {data} = await axios.get(backendUrl+'/api/doctor/list')
            if(data){

                console.log(data)
                setDoctors(data.doctors)
            }else{
                toast.error(data.msg)
            }

        }
        catch(e){
console.log(e)
toast.error(e.message)
        }
    }

    useEffect(()=>{
        getDoctorsData()
    },[])


     const loadUserProfileData = async ()=>{
        try{
const {data}= await axios.get(backendUrl+'/api/admin/get-profile',{headers:{token}})
console.log(data)
if(data.success){
    setUserData(data.userData)

}else{
    toast.error(data.msg);
}



        }
        catch(e){
console.log(e)
toast.error(e.message)
        }
     }

useEffect(()=>{

    if(token){
        loadUserProfileData();

    }
    else{
        setUserData(false)

    }
},[token])

    const value= {
        doctors,currencySymbol,
       token,setToken,backendUrl,
       userData,setUserData,loadUserProfileData

    }
    return(
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    )
}

export default AppContextProvider;