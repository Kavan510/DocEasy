import React, { useContext, useEffect } from 'react';
import { AdminContext } from '../../context/adminContext';
import { AppContext } from '../../context/appContext';
import { assets } from '../../assets/assets';

const Dashboard = () => {
  const { getDashData, atoken, cancelAppointment, dashData } = useContext(AdminContext);
  const { slotDateFormat } = useContext(AppContext);

  useEffect(() => {
    if (atoken) getDashData();
  }, [atoken, getDashData]);

  if (!dashData) {
    return null; // Handle case where `dashData` is not available
  }

  return (
    <div className="m-5 space-y-10">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {[
          {
            icon: assets.doctor_icon,
            count: dashData.doctors,
            label: 'Doctors',
          },
          {
            icon: assets.appointments_icon,
            count: dashData.appointments,
            label: 'Appointments',
          },
          {
            icon: assets.patients_icon,
            count: dashData.patients,
            label: 'Patients',
          },
        ].map((item, index) => (
          <div
            key={index}
            className="flex items-center gap-4 bg-white p-6 rounded-lg shadow-md  hover:shadow-lg transition-transform transform hover:scale-105"
          >
            <img className="w-16 h-16" src={item.icon} alt={`${item.label} Icon`} />
            <div>
              <p className="text-2xl font-bold text-gray-700">{item.count}</p>
              <p className="text-gray-500">{item.label}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Latest Bookings */}
      <div className="bg-white rounded-lg shadow-md">
        <div className="flex items-center gap-3 px-6 py-4 border-b border-stone-200 ">
          <img src={assets.list_icon} alt="List Icon" className="w-6 h-6" />
          <p className="text-lg font-semibold ">Latest Bookings</p>
        </div>

        <div className="divide-y">
          {dashData.latestAppointments.map((item, index) => (
            <div
              key={index}
              className="flex items-center px-6 py-4 gap-4 border-b border-stone-200 hover:bg-gray-100 transition-colors"
            >
              <img
                className="rounded-full w-12 h-12"
                src={item.docData.image}
                alt={`${item.docData.name}'s Profile`}
              />
              <div className="flex-1 text-sm">
                <p className="text-gray-800 font-medium">{item.docData.name}</p>
                <p className="text-gray-600">{slotDateFormat(item.slotDate)}</p>
              </div>
              {item.cancelled ? (
                <p className="text-red-500 font-medium">Cancelled</p>
              ) : item.isCompleted ? (
                <p className="text-green-500 font-medium">Completed</p>
              ) : (
                <img
                  onClick={() => cancelAppointment(item._id)}
                  className="w-8 h-8 cursor-pointer"
                  src={assets.cancel_icon}
                  alt="Cancel Appointment Icon"
                />
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
