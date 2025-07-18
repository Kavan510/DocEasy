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

    const [loading,setLoading] = useState(false);

    



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

        console.log(
            "hello"
        )
        setLoading(true);
        getDoctorsData()
        setLoading(false)
        console.log(
            "bye"
        )
    },[])


const loadUserProfileData = async () => {
        try {
            const { data } = await axios.get(backendUrl+'/api/user/get-profile', {
                headers: { token },
            });
            console.log(data);
            if (data.success) {
                setUserData(data.data);
            } else {
                toast.error(data.msg || "Failed to fetch profile");
            }
        } catch (e) {
            console.log(e);
            toast.error(e.message || "An error occurred while fetching profile data");
        }
    };
    

useEffect(()=>{
setLoading(true)
    if(token){
        loadUserProfileData();
    }
    else{
        setUserData(false)

    }
    setLoading(false);
},[token])

    const value= {
        doctors,getDoctorsData,currencySymbol,
       token,setToken,backendUrl,
       userData,setUserData,loadUserProfileData,loading,setLoading

    }
    return(
<>
            {loading ? (
                <div className="h-screen bg-red-500">
                    <p>Loading...</p>
                </div>
            ) : (
                <AppContext.Provider value={value}>
                    {props.children}
                </AppContext.Provider>
            )}
        </>
       
    )
}

export default AppContextProvider;