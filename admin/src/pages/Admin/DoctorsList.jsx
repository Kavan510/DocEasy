import React, { useContext, useEffect } from 'react';
import { AdminContext } from '../../context/adminContext';

const DoctorsList = () => {
  const { doctors, getAllDoctors, atoken, changeAvailibility } = useContext(AdminContext);

  // Fetch all doctors when the token is available
  useEffect(() => {
    if (atoken) {
      getAllDoctors();
    }
  }, [atoken]);

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
