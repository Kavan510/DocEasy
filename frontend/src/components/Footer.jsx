import React from 'react'
import { assets } from '../assets/assets_frontend/assets'
import { PrefetchPageLinks } from 'react-router-dom'

const Footer = () => {
  return (
    <div className='md:mx-10 '>
       <div className='flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm '>
    {/* left section */}
    <div>
    <img className='mb-5 w-40' src={assets.logo} alt="" />
    <p className='w-full md:w-2/3 text-gray-600 leading-6'> Lorem ipsum dolor sit, amet consectetur adipisicing elit. Officia autem et unde dolor consectetur, velit expedita assumenda iste cupiditate beatae alias eum provident nihil ipsa molestiae repellat, earum, nemo rem.</p>
    </div>

{/* center section */}
<div className=''>
<p className='text-xl font-medium mb-5'>Company</p>
<ul className='flex flex-col gap-2 text-gray-600'>
    <li>Home</li>
    <li>About us</li>
    <li>Contact us</li>
    <li>Privacy policy</li>
</ul>
</div>

{/* right section */}

<div>
<p className='text-xl font-medium mb-5'>Get in Touch</p>
<ul className='flex flex-col gap-2 text-gray-600'> 
    <li>(209) 300-2557</li>
    <li>doctor_bvn@gmail.com</li>
</ul>
</div>



        </div> 
    <div >
        {/* ---------  Copyright text  ----- */}
        <hr/> 
        <p className='text-gray-800 py-5 text-sm text-center'>Copyright 2025@ Doctors - All Rights Reserved.</p>
    </div>
        
    </div>
  )
}

export default Footer
