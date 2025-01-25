import React, { useContext } from 'react';
import { AdminContext } from '../context/adminContext';
import { NavLink } from 'react-router-dom';
import { assets } from '../assets/assets';

const Sidebar = () => {
  const { atoken } = useContext(AdminContext);

  return (
    <div className="min-h-screen bg-white border-r">
      {atoken && (
        <ul className="flex flex-col gap-4 text-gray-600">
          <NavLink
            to="/admin-dashboard"
            className={({ isActive }) =>
              `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 w-40 cursor-pointer ${
                isActive ? 'bg-[#F2F3FF] border-r-4 border-primary' : ''
              }`
            }
          >
            <img src={assets.home_icon} alt="Dashboard Icon" />
            <p className='w-full'>Dashboard</p>
          </NavLink>
          <NavLink
            to="/all-appointments"
            className={({ isActive }) =>
              `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 w-40  cursor-pointer ${
                isActive ? 'bg-[#F2F3FF] border-r-4 border-primary' : ''
              }`
            }
          >
            <img src={assets.appointment_icon} alt="Appointments Icon" />
            <p className='w-full'>Appointment</p>
          </NavLink>
          <NavLink
            to="/add-doctor"
            className={({ isActive }) =>
              `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 w-40 cursor-pointer ${
                isActive ? 'bg-[#F2F3FF] border-r-4 border-primary' : ''
              }`
            }
          >
            <img src={assets.add_icon} alt="Add Doctor Icon" />
            <p>Add Doctor</p>
          </NavLink>
          <NavLink
            to="/doctor-list"
            className={({ isActive }) =>
              `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 w-40 cursor-pointer ${
                isActive ? 'bg-[#F2F3FF] border-r-4 border-primary' : ''
              }`
            }
          >
            <img src={assets.people_icon} alt="Doctors List Icon" />
            <p>Doctors list</p>
          </NavLink>
        </ul>
      )}
    </div>
  );
};

export default Sidebar;
 