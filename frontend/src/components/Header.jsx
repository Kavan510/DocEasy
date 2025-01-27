import React from "react";
import { assets } from "../assets/assets_frontend/assets";

const Header = () => {
  return (
    <div className="flex flex-col md:flex-row bg-primary flex-wrap rounded-lg px-6 md:px-10">
      {/* left side */}
      <div className="md:w-1/2 flex flex-col items-start justify-center gap-4 py-10 m-auto md:py-[10vw] md:mb-[-30px]">
        <p className="text-3xl md:text-4xl lg:text-5xl text-white font-semibold leading-tight md:leading-tight lg:leading-tight">
          Book Appointment <br />
          With Trusted Doctors
        </p>

        <div className="flex flex-col md:flex-row text-light text-white items-center text-sm gap-3 ">
          <img className="w-28" src={assets.group_profiles} alt="" />
          <p>
            Your one-stop platform for hassle-free doctor appointments{" "}
          </p>
        </div>
        <a
          className="flex items-center rounded-full text-gray-600 bg-white hover:scale-105 transition-all duration-300 py-3 px-8 text-light text-sm gap-2 "
          href="#speciality"
        >
          Book Appointment <img src={assets.arrow_icon} alt="" />
        </a>
      </div>

      {/* right side */}

      <div className="md:w-1/2 relative">
        <img
          className="w-full md:absolute bottom-0 h-auto rounded-lg "
          src={assets.header_img}
          alt=""
        />
      </div>
    </div>
  );
};

export default Header;
