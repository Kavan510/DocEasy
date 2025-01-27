import React from 'react'
import { assets } from '../assets/assets_frontend/assets'

const Contact = () => {
  return (
    <div>
      <div className='text-center p-10'> 
        <p className='text-gray-500 text-xl'>CONTACT <span className='text-gray-700 font-semibold'>US</span></p>
      </div>
      <div className='flex flex-col md:flex-row justify-center '>
        <div>

        <img className='w-full md:w-[340px]' src={assets.contact_image} alt="" />
        </div>
        <div className='text-gray-500 pl-20 my-10 md:my-0'>
          <div className='pb-5'>
            <p className='font-medium text-gray-600'>
              OUR OFFICE
              </p>
            </div>
          <div className='pb-5'> 
            <p>394101, Mota Varachha</p>
            <p>Surat, Gujarat</p>
          </div>
          <div className='pb-5'>
            <p>
              Tel: 2084422881
              
            </p>
            <p>Email: doctor_bvn@gmail.com</p>

          </div>
          <div className='pb-4'>
            <p className='font-medium text-xl text-gray-600'>CAREERS AT NAME</p>
          </div>
          <div className='pb-4'>
            <p>Learn more about our teams and job opening</p>

          </div>
          <div>
            <button className='border p-3 border-black hover:bg-black hover:text-white transition-all durati0n-300'>Explore Jobs</button>
          </div>

        </div>
        
      </div>
    </div>
  )
}

export default Contact
