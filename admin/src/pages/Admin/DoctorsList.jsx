import React, { useContext, useEffect } from "react";
import { AdminContext } from "../../context/adminContext";
import axios from "axios";

const DoctorsList = () => {
  const { doctors, getAllDoctors, atoken, changeAvailibility, backendUrl } =
    useContext(AdminContext);

  // Fetch all doctors when the token is available
  useEffect(() => {
    if (atoken) {
      getAllDoctors();
    }
  }, [atoken]);

  const removeDocHandler = async (docId) => {
    try {
      await axios.delete(`${backendUrl}/api/admin/remove-doctor/${docId}`, {
        headers: { atoken },
      });
      await getAllDoctors();
    } catch (error) {
      console.error(
        "Failed to remove doctor:",
        error.response?.data || error.message
      );
    }
  };

  return (
    <div className="px-4 sm:px-8 lg:px-16 py-6 bg-gray-50 min-h-screen">
      <h1 className="text-lg font-medium mb-4">All Doctors</h1>

      <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {doctors && doctors.length > 0 ? (
          doctors.map((item, index) => (
            <div
              key={index}
              className="bg-white border border-gray-200 rounded-2xl shadow-sm hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300 overflow-hidden"
            >
              <img
                className="w-full h-56 object-cover bg-blue-50"
                src={item.image}
                alt={item.name}
              />
              <div className="p-5 flex flex-col justify-between h-[calc(100%-14rem)]">
                <div>
                  <div
                    className={`flex items-center gap-2 text-sm font-medium mb-2 ${
                      item.available ? "text-green-600" : "text-red-600"
                    }`}
                  >
                    <input
                      type="checkbox"
                      className="cursor-pointer"
                      checked={item.available || false}
                      onChange={() => changeAvailibility(item._id)}
                    />
                    <span
                      className={`w-2.5 h-2.5 rounded-full ${
                        item.available ? "bg-green-500" : "bg-red-500"
                      }`}
                    ></span>
                    {item.available ? "Available" : "Not Available"}
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 truncate">
                    {item.name}
                  </h3>
                  <p className="text-gray-500 truncate">{item.speciality}</p>
                </div>

                <button
                  onClick={() => removeDocHandler(item._id)}
                  className="mt-4 w-full py-2 text-sm bg-red-500 text-white rounded-lg hover:bg-red-600 transition-all hover:scale-102 cursor-pointer duration-200"
                >
                  Remove
                </button>
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
