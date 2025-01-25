import React, { useContext, useState } from "react";
import { assets } from "../../assets/assets";
import { useOutletContext } from "react-router-dom";
import { AdminContext } from "../../context/adminContext";
import { toast } from "react-toastify";
import axios from "axios";
const AddDoctor = () => {
  const [docImg,setDocImg] = useState(false)
  const [name,setName] = useState('')
  const [email,setEmail] = useState('')
  const [password,setPassword]=useState('')
  const [experience,setExperience] = useState('1 Year')
  const [fees,setFees] = useState('')
  const [speciality,setSpeciality] = useState('General physician')
  const [degree,setDegree] = useState('')
  const [address1,setAddress1]=useState('')
  const [address2,setAddress2]=useState('')
  const [about,setAbout] = useState('')
const {backendUrl,atoken} =useContext(AdminContext)

  // backend API call 

  const onSubmitHandler = async (event)=>{
    event.preventDefault()
try{

if(!docImg){
  return toast.error("Image not selected")
}

const formData= new FormData()
    
formData.append('image',docImg)
formData.append('name',name)
formData.append('email',email)
formData.append('password',password)
formData.append('experience',experience)
formData.append('fees',Number(fees))
formData.append('about',about)
formData.append('speciality',speciality)
formData.append('degree',degree)
formData.append('address',JSON.stringify({line1:address1,line2:address2}))



// console log form data
// formData.forEach((value,key) =>{
//   console.log(`${key}: ${value}`)
// })

const {data} = await axios.post(backendUrl+'/api/admin/add-doctor',formData,{headers:{atoken}})

if (data && data.msg) {
  toast.success(data.msg); 

setDocImg(false)
setName('')
setEmail('')
setPassword('')
setFees('')
setDegree('')
setAbout('')
setAddress1('')
setAddress2('')

} else {
  toast.error("Failed to add doctor. Please try again.");
}
} catch (e) {
toast.error(e.response?.data?.message || "An error occurred.");
}


  }


  return (
    <form onSubmit={onSubmitHandler} className="m-5 w-full">
      <p className="mb-5 text-2xl font-semibold text-gray-700">Add Doctor</p>
      <div className="bg-white px-8 py-8 border shadow-md rounded-lg w-full max-w-4xl max-h-[80vh] overflow-y-auto">
        {/* Upload Section */}
        <div className="flex items-center gap-6 mb-8 text-gray-500">
          <label htmlFor="doc-img" className="cursor-pointer">
            <img
              className="w-16 h-16 bg-gray-100 rounded-full object-cover border-2 border-gray-300 hover:border-gray-400"
              src={docImg? URL.createObjectURL(docImg):assets.upload_area}
              alt="Upload area"
            />
          </label>
          <input onChange={(e)=>setDocImg(e.target.files[0])} type="file" id="doc-img" hidden />
          <p className="text-sm text-gray-500">
            Upload doctor <br />
            picture
          </p>
        </div>

        {/* Form Fields */}
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left Section */}
          <div className="w-full lg:w-1/2 flex flex-col gap-6">
            {/* Doctor Name */}
            <div>
              <p className="text-sm font-medium text-gray-700">Doctor Name</p>
              <input onChange={(e)=>setName(e.target.value)} value={name}
                className="w-full border border-gray-300 rounded-md px-3 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-primary"
                type="text"
                placeholder="Name"
                required
              />
            </div>

            {/* Doctor Email */}
            <div>
              <p className="text-sm font-medium text-gray-700">Doctor Email</p>
              <input onChange={(e)=>setEmail(e.target.value)} value={email}
                className="w-full border border-gray-300 rounded-md px-3 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-primary"
                type="email"
                placeholder="Email"
                required
              />
            </div>

            {/* Doctor Password */}
            <div>
              <p className="text-sm font-medium text-gray-700">Doctor Password</p>
              <input onChange={(e)=>setPassword(e.target.value)} value={password}
                className="w-full border border-gray-300 rounded-md px-3 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-primary"
                type="password"
                placeholder="Password"
                required
              />
            </div>

            {/* Experience */}
            <div>
              <p className="text-sm font-medium text-gray-700">Experience</p>
              <select onChange={(e)=>setExperience(e.target.value)} value={experience}
                className="w-full border border-gray-300 rounded-md px-3 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <option value="">Select Experience</option>
                {[...Array(10)].map((_, i) => (
                  <option key={i} value={`${i + 1} Year`}>{`${i + 1} Year`}</option>
                ))}
              </select>
            </div>

            {/* Fees */}
            <div>
              <p className="text-sm font-medium text-gray-700">Fees</p>
              <input onChange={(e)=>setFees(e.target.value)} value={fees}
                className="w-full border border-gray-300 rounded-md px-3 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-primary"
                type="number"
                placeholder="Fees"
              />
            </div>
          </div>

          {/* Right Section */}
          <div className="w-full lg:w-1/2 flex flex-col gap-6">
            {/* Speciality */}
            <div>
              <p className="text-sm font-medium text-gray-700">Speciality</p>
              <select onChange={(e)=>setSpeciality(e.target.value)} value={speciality}
                className="w-full border border-gray-300 rounded-md px-3 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <option value="">Select Speciality</option>
                {[
                  'General physician',
                  'Gynecologist',
                  'Dermatologist',
                  'Pediatricians',
                  'Neurologist',
                  'Gastroenterologist',
                ].map((speciality, index) => (
                  <option key={index} value={speciality}>
                    {speciality}
                  </option>
                ))}
              </select>
            </div>

            {/* Education */}
            <div>
              <p className="text-sm font-medium text-gray-700">Education</p>
              <input onChange={(e)=>setDegree(e.target.value)} value={degree}
                className="w-full border border-gray-300 rounded-md px-3 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-primary"
                type="text"
                placeholder="Education"
              />
            </div>

            {/* Address */}
            <div>
              <p className="text-sm font-medium text-gray-700">Address</p>
              <input onChange={(e)=>setAddress1(e.target.value)} value={address1}
                className="w-full border border-gray-300 rounded-md px-3 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-primary"
                type="text"
                placeholder="Address Line 1"
                required
              />
              <input onChange={(e)=>setAddress2(e.target.value)} value={address2}
                className="w-full border border-gray-300 rounded-md px-3 py-2 mt-3 focus:outline-none focus:ring-2 focus:ring-primary"
                type="text"
                placeholder="Address Line 2"
                required
              />
            </div>
          </div>
        </div>

        {/* About Doctor */}
        <div className="mt-6">
          <p className="text-sm font-medium text-gray-700 mb-2">About Doctor</p>
          <textarea onChange={(e)=>setAbout(e.target.value)} value={about}
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
            placeholder="Write about the doctor"
            rows={5}
          ></textarea>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="cursor-pointer hover:scale-101 transition-all duration-300  mt-6 w-full bg-primary text-white text-base font-medium px-4 py-2 rounded-md hover:bg-primary-dark "
        >
          Add Doctor
        </button>
      </div>
    </form>
  );
};

export default AddDoctor;
