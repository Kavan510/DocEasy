import React from "react";
import { useContext } from "react";
import { DoctorContext } from "../../context/doctorContext";
import { AppContext } from "../../context/appContext";
import { useEffect } from "react";
import { useState } from "react";
import {toast} from 'react-toastify'
import axios from 'axios'
const DoctorProfile = () => {
  const { dtoken, getProfileData, setProfileData, profileData ,backendUrl} =
    useContext(DoctorContext);
  const { currencySymbol } = useContext(AppContext);
  const [isEdit, setIsEdit] = useState(false);

  const updateProfile = async ()=>{

  try{
    const updateData = {
      address:profileData.address,
      fees : profileData.fees,
      available :profileData.available,

    }
// console.log(updateData)
    const {data} = await axios.post(backendUrl+'/api/doctor/update-profile',updateData,{headers:{dtoken}})
    // console.log(data);
    
    if(data.success){
      getProfileData()
      setIsEdit(false)
      toast.success(data.msg)
    }else{
      toast.error(data.msg)
    }
  }
  catch(e){
    console.log(e)
    toast.error(e)
  }
  }

  useEffect(() => {
    if (dtoken) {
      getProfileData();
    }
  }, [dtoken]);

  return (
    profileData && (
      <div className="flex flex-col m-5 gap-4">
        <div>
          <img
            className="bg-primary/80 w-full sm:max-w-64 rounded-lg"
            src={profileData.image}
            alt=""
          />
        </div>

        <div className="flex-1 border border-stone-100 rounded-lg p-8py07 bg-white">
          {/* doc info name ,degree and exp */}
          <p className="flex items-center gap-2 text-3xl font-medium text-gray-700">
            {profileData.name}{" "}
          </p>
          <div className="flex items-center gap-2 mt-1 text-gray-600">
            <p>
              {profileData.degree} - {profileData.speciality}{" "}
            </p>
            <button className="py-0.5 px-2 border rounded-full text-xs ">
              {profileData.experience}{" "}
            </button>
          </div>

          {/* doc about */}
          <div>
            <p className="flex item-center gap-1 text-sm font-medium text-neutral-800 mt-3">
              About
            </p>
            <p className="text-sm text-gray-600 max-w-[700px] mt-1">
              {profileData.about}{" "}
            </p>
          </div>
          <p className="text-gray-600 font-medium mt-3">
            Appointment Fees:{" "}
            <span className="text-gray-800">
              {currencySymbol}{" "}
              {isEdit ? (
                <input
                  type="Number"
                  onChange={(e) =>
                    setProfileData((prev) => ({
                      ...prev,
                      fees: e.target.value,
                    }))
                  }
                  value={profileData.fees}
                />
              ) : (
                profileData.fees
              )}{" "}
            </span>
          </p>
          <div className="flex gap-2 py-2">
            <p>Address: </p>
            <p className="text-sm">
              {isEdit ? (
                <input
                  type="text"
                  onChange={(e) =>
                    setProfileData((prev) => ({
                      ...prev,
                      address: { ...prev.address, line1: e.target.value },
                    }))
                  }
                  value={profileData.address.line1}
                />
              ) : (
                profileData.address.line1
              )}
              <br />
              {isEdit ? (
                <input
                  type="text"
                  onChange={(e) =>
                    setProfileData((prev) => ({
                      ...prev,
                      address: { ...prev.address, line2: e.target.value },
                    }))
                  }
                  value={profileData.address.line2}
                />
              ) : (
                profileData.address.line2
              )}
            </p>
          </div>

          <div className="flex gap-1 pt-2">
            <input onChange={()=>isEdit && setProfileData(prev=> ({...prev,available:!prev.available}))} checked={profileData.available} type="checkbox" />
            <label htmlFor="">Available</label>
          </div>

              {isEdit
              ?
              <button 
            onClick={updateProfile}
            className="px-4 py-1 border border-primary text-sm rounded-full mt-2  hover:bg-primary hover:text-white hover:scale-105 transition-all duration-300"
          >
            Save
          </button>

          :
          <button
            onClick={() => setIsEdit(true)}
            className="px-4 py-1 border border-primary text-sm rounded-full mt-2  hover:bg-primary hover:text-white hover:scale-105 transition-all duration-300"
          >
            Edit
          </button>

              }
         
          
        </div>
      </div>
    )
  );
};

export default DoctorProfile;
