import { createContext,useState } from "react";
// import toast from "react-toastify";
import { toast } from "react-toastify";

import axios from 'axios';

export const DoctorContext= createContext()

const DoctorContextProvider = (props)=>{
const backendUrl = import.meta.env.VITE_BACKEND_URL;
const [dtoken,setdToken] = useState(localStorage.getItem('dtoken') || '')
const [appointments,setAppointments] = useState([])
const [dashData,setDashData] = useState(false)
const [profileData,setProfileData] = useState(false)

const getAppointments = async ()=>{
    try{
const {data} = await axios.get(backendUrl+'/api/doctor/appointments', {headers:{dtoken}})
if(data.success){   
    setAppointments(data.appointments) //to get latest appointments
    console.log(data.appointments.reverse());
    

}
else{
    toast.error(data.msg)
}
    }
    catch(e){
        console.log(e);
        
        toast.error("An error occurred while fetching appointments")
    }
}

const completeAppointment = async (appointmentId)=>{
    try{
        const {data} = await axios.post(backendUrl+'/api/doctor/complete-appointment',{appointmentId},{headers:{dtoken}})
        if(data.success){
            toast.success(data.msg)
            getAppointments()
        }
        else{
            toast.error(data.msg)
        }
    }
    catch(e){   
        toast.error("An error occurred while completing appointment")
    }


}

const cancelAppointment = async (appointmentId)=>{
    try{
        const {data} = await axios.post(backendUrl+'/api/doctor/cancel-appointment',{appointmentId},{headers:{dtoken}})
        if(data.success){
            toast.success(data.msg)
            getAppointments()
        }
        else{
            toast.error(data.msg)
        }
    }
    catch(e){   
        toast.error("An error occurred while completing appointment")
    }


}

const getDashboardData = async ()=>{
    try{
        const {data} = await axios.get(backendUrl+'/api/doctor/doctor-dashboard',{headers:{dtoken}})
        if(data.success){
            setDashData(data.dashData)
            console.log(data.dashData);
            
        }
        else{
            toast.error(data.msg)
        }
    }
    catch(e){
        toast.error("An error occurred while fetching dashboard data")
    }
}

const getProfileData = async ()=>{
    try{
        const {data} = await axios.get(backendUrl+'/api/doctor/profile',{headers:{dtoken}})
        // console.log(data);
        
        if(data.success){
            setProfileData(data.ProfileData)
            // console.log(data.ProfileData);
            
        }
        else{
            toast.error(data.msg)
        }
    }
    catch(e){
        toast.error("An error occurred while fetching profile data")
    }
}


const value = {
dtoken,setdToken,backendUrl,getAppointments,appointments,setAppointments,
completeAppointment,cancelAppointment,getDashboardData,dashData,
setDashData,
getProfileData,setProfileData,profileData
}

return (
    <DoctorContext.Provider value={value}>
        {props.children}
        </DoctorContext.Provider>
)
}
export default DoctorContextProvider