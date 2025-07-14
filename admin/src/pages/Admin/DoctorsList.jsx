import React, { useContext, useEffect } from 'react';
import { AdminContext } from '../../context/adminContext';
import axios from 'axios';

const DoctorsList = () => {
  const { doctors, getAllDoctors, atoken, changeAvailibility,backendUrl } = useContext(AdminContext);

  // Fetch all doctors when the token is available
  useEffect(() => {
    if (atoken) {
      getAllDoctors();
    }
  }, [atoken]);

const removeDocHandler = async (docId) => {
  try {
    // console.log(docId);
    // console.log(atoken);
    
    const docDetails = await axios.delete(
      `${backendUrl}/api/admin/remove-doctor/${docId}`,
      {
        headers: {
          atoken
        },
      
      }
    );
  //  console.log("docDetails:"/ 
    
    console.log("Doctor removed:", docDetails.data.msg);
     await getAllDoctors();
  } catch (error) {
    console.error("Failed to remove doctor:", error.response?.data || error.message);
  }
}




  // Debugging log to monitor doctor data changes
  useEffect(() => {
    console.log('Updated doctors data:', doctors);
  }, [doctors]);

  return (
    <div className="m-5 max-h-[90vh] overflow-y-scroll">
      <h1 className="text-lg font-medium">All Doctors</h1>
      <div className="w-full flex flex-wrap gap-4 pt-5 gap-y-6">
        {doctors && doctors.length > 0 ? (
          doctors.map((item, index) => (
            <div className="border border-indigo-200 rounded-xl max-w-56 overflow-hidden" key={index}>
              <img className="bg-indigo-50 hover:bg-primary transition-all duration-500" src={item.image} alt="" />
              <div className="p-4">
                <p className="text-neutral-80 text-lg font-medium">{item.name}</p>
                <p className="text-zinc-600 text-sm">{item.speciality}</p>
                <div className='flex'>

                <div className="mt-2 flex items-center gap-1 text-sm">
                  {/* Ensure proper handling of availability toggle */}
                  <input
                    className='cursor-pointer'
                    onChange={() => changeAvailibility(item._id)} // Call the API function when toggling
                    type="checkbox"
                    checked={item.available || false} // Ensure default boolean value
                    />
                  <p>Available</p>
                </div>
                <div className='pl-3'>
                  <button onClick={()=>removeDocHandler(item._id)} className='cursor-pointer text-sm p-1 mt-2  bg-red-300  rounded transition hover:scale-105'>Remove</button>
                </div>
                    </div>
                
              </div>
            </div>
          ))
        ) : (
          <p>No doctors found.</p>
        )}
      </div>
    </div>
  );
};

export default DoctorsList;
