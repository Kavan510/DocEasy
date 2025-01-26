import { createContext,useState } from "react";

export const DoctorContext= createContext()

const DoctorContextProvider = (props)=>{
const backendUrl = import.meta.env.VITE_BACKEND_URL;
const [dtoken,setdToken] = useState(localStorage.getItem('dtoken') || '')




const value = {
dtoken,setdToken,backendUrl
}

return (
    <DoctorContext.Provider value={value}>
        {props.children}
        </DoctorContext.Provider>
)
}
export default DoctorContextProvider