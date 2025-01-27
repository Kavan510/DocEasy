import React, { useContext, useEffect, useState } from "react";
import { DoctorContext } from "../../context/doctorContext";
import { AppContext } from "../../context/appContext";
import { toast } from "react-toastify";
import axios from "axios";

const DoctorProfile = () => {
  const { dtoken, getProfileData, setProfileData, profileData, backendUrl } =
    useContext(DoctorContext);
  const { currencySymbol } = useContext(AppContext);
  const [isEdit, setIsEdit] = useState(false);

  const updateProfile = async () => {
    try {
      const updateData = {
        address: profileData.address,
        fees: profileData.fees,
        available: profileData.available,
      };

      const { data } = await axios.post(
        `${backendUrl}/api/doctor/update-profile`,
        updateData,
        { headers: { dtoken } }
      );

      if (data.success) {
        getProfileData();
        setIsEdit(false);
        toast.success(data.msg);
      } else {
        toast.error(data.msg);
      }
    } catch (e) {
      console.error(e);
      toast.error("An error occurred while updating the profile.");
    }
  };

  useEffect(() => {
    if (dtoken) {
      getProfileData();
    }
  }, [dtoken]);

  if (!profileData) {
    return null;
  }

  return (
    <div className="flex flex-col sm:flex-row gap-6 m-5">
      {/* Profile Image */}
      <div>
        <img
          className="w-full sm:max-w-xs rounded-lg shadow-md"
          src={profileData.image}
          alt="Doctor Profile"
        />
      </div>

      {/* Profile Details */}
      <div className="flex-1 border border-stone-100 rounded-lg p-6 bg-white shadow-sm">
        {/* Doctor Name, Degree, and Experience */}
        <p className="text-2xl font-bold text-gray-800">
          Dr. {profileData.name}
        </p>
        <div className="flex items-center gap-2 mt-2 text-gray-600">
          <p>
            {profileData.degree} - {profileData.speciality}
          </p>
          <span className="py-0.5 px-3 border rounded-full text-xs bg-gray-100">
            {profileData.experience}
          </span>
        </div>

        {/* About Section */}
        <div className="mt-4">
          <p className="text-lg font-semibold text-gray-800">About</p>
          <p className="text-sm text-gray-600 mt-1">{profileData.about}</p>
        </div>

        {/* Appointment Fees */}
        <p className="text-gray-800 font-medium mt-4">
          Appointment Fees:
          <span className="ml-2">
            {currencySymbol}{" "}
            {isEdit ? (
              <input
                type="number"
                className="ml-1 px-2 py-1 border rounded text-sm"
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
            )}
          </span>
        </p>

        {/* Address */}
        <div className="mt-4">
          <p className="text-gray-800 font-medium">Address:</p>
          {isEdit ? (
            <>
              <input
                type="text"
                className="mt-1 w-full px-2 py-1 border rounded text-sm"
                onChange={(e) =>
                  setProfileData((prev) => ({
                    ...prev,
                    address: { ...prev.address, line1: e.target.value },
                  }))
                }
                value={profileData.address.line1}
                placeholder="Address Line 1"
              />
              <input
                type="text"
                className="mt-2 w-full px-2 py-1 border rounded text-sm"
                onChange={(e) =>
                  setProfileData((prev) => ({
                    ...prev,
                    address: { ...prev.address, line2: e.target.value },
                  }))
                }
                value={profileData.address.line2}
                placeholder="Address Line 2"
              />
            </>
          ) : (
            <p className="text-sm text-gray-600 mt-1">
              {profileData.address.line1}
              <br />
              {profileData.address.line2}
            </p>
          )}
        </div>

        {/* Availability */}
        <div className="flex items-center gap-2 mt-4">
          <input
            type="checkbox"
            id="availability"
            className="w-4 h-4"
            onChange={() =>
              isEdit &&
              setProfileData((prev) => ({
                ...prev,
                available: !prev.available,
              }))
            }
            checked={profileData.available}
          />
          <label htmlFor="availability" className="text-gray-800">
            Available
          </label>
        </div>

        {/* Edit/Save Button */}
        <div className="mt-6">
          {isEdit ? (
            <button
              onClick={updateProfile}
              className="px-6 py-2 bg-primary text-white rounded-full hover:bg-primary hover:scale-105 cursor-pointer transition-all duration-200"
            >
              Save
            </button>
          ) : (
            <button
              onClick={() => setIsEdit(true)}
              className="px-6 py-2 bg-gray-100 text-gray-800 rounded-full hover:bg-primary hover:scale-105 cursor-pointer hover:text-white transition-all duration-200"
            >
              Edit
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default DoctorProfile;
