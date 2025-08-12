import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AppContext } from "../context/AppContext";

const Doctors = () => {
  const navigate = useNavigate();
  const { speciality } = useParams();
  const { doctors, loading, setLoading } = useContext(AppContext);
  const [filterDoc, setFilterDoc] = useState([]);
  const [showFilter, setShowFilter] = useState(false);

  const applyFilter = () => {
    if (speciality) {
      setFilterDoc(doctors.filter((doc) => doc.speciality === speciality));
    } else {
      setFilterDoc(doctors);
    }
  };

  useEffect(() => {
    setLoading(true);
    applyFilter();
    setLoading(false);
  }, [doctors, speciality]);

  return (
    <div className="px-4 sm:px-8 lg:px-16 py-6 bg-gray-50 min-h-screen">
      <p className="text-gray-600 text-lg mb-4">
        Browse through our trusted doctors and their specialties
      </p>

      <div className="flex flex-col sm:flex-row items-start gap-6">
        {/* Filter Toggle for Mobile */}
        <button
          onClick={() => {
            setShowFilter((prev) => !prev);
          }}
          className={`py-2 px-4 border rounded-lg text-sm font-medium shadow-sm sm:hidden ${
            showFilter ? "bg-indigo-500 text-white" : "bg-white text-gray-700"
          }`}
        >
          {showFilter ? "Hide Filters" : "Show Filters"}
        </button>

        {/* Sidebar Filters */}
        <div
          className={`flex-col gap-3 text-sm font-medium text-gray-700 ${
            showFilter ? "flex" : "hidden sm:flex"
          }`}
        >
          {[
            "General physician",
            "Gynecologist",
            "Dermatologist",
            "Pediatricians",
            "Neurologist",
            "Gastroenterologist",
          ].map((spec) => (
            <p
              key={spec}
              onClick={() => navigate(`/doctors/${spec}`)}
              className={`w-[94vw] sm:w-48 px-4 py-2 border rounded-lg cursor-pointer shadow-sm hover:shadow-md hover:bg-indigo-50 transition-all duration-200 ${
                speciality === spec
                  ? "bg-indigo-100 text-indigo-700 border-indigo-300"
                  : "bg-white border-gray-300"
              }`}
            >
              {spec}
            </p>
          ))}
        </div>

        {/* Doctor Cards */}
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filterDoc.map((item, index) => {
            return (
              <div
                onClick={() => navigate(`/appointment/${item._id}`)}
                key={index}
                className="bg-white border border-gray-200 rounded-2xl shadow-sm hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300 cursor-pointer overflow-hidden"
              >
                <img
                  className="w-full h-56 object-cover bg-blue-50"
                  src={item.image}
                  alt={item.name}
                />
                <div className="p-5">
                  <div
                    className={`flex items-center gap-2 text-sm font-medium mb-2 ${
                      item.available ? "text-green-600" : "text-red-600"
                    }`}
                  >
                    <span
                      className={`w-2.5 h-2.5 rounded-full ${
                        item.available ? "bg-green-500" : "bg-red-500"
                      }`}
                    ></span>
                    {item.available ? "Available" : "Not Available"}
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900">
                    {item.name}
                  </h3>
                  <p className="text-gray-500">{item.speciality}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Doctors;
