import React from "react";
import { assets } from "../assets/assets_frontend/assets";

const About = () => {
  return (
    <div>
      <div className="text-center text-2xl pt-10 text-gray-500">
        <p>
          About <span className="font-medium text-gray-600">Us</span>
        </p>
      </div>

      <div className="flex md:flex-row flex-col my-10 gap-12">
        <img
          className="w-full md:max-w-[360px]"
          src={assets.about_image}
          alt=""
        />
        <div className="flex flex-col justify-center gap-6 md:w-2/4 text-sm text-gray-600 ">
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusantium
            molestiae ut nemo necessitatibus, deleniti ratione possimus quasi
            cumque sint doloremque, iusto reprehenderit, autem aspernatur?
            Consequatur tempora eos non. Quos, vero.
          </p>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Veniam id
            mollitia voluptatibus repellat sunt! Laboriosam rerum vero
            repudiandae quo! Modi iure unde neque est excepturi tempore rerum?
            Rerum, molestias obcaecati?
          </p>
          <b className="text-gray-800 ">Our Vision</b>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse
            dignissimos ullam dolorum ut magni, nihil, eos enim numquam ea
            temporibus doloribus ipsam adipisci, necessitatibus veniam quam
            molestiae minus consectetur vel.
          </p>
        </div>
      </div>
      <div className="text-gray-500 text-xl my-4">
        <p>
          WHY <span className="text-gray-600 font-medium">CHOOSE US</span>
        </p>
      </div>
      <div className="flex flex-col md:flex-row mb-20">
        <div className="border border-gray-300 p-16 gap-5 hover:bg-primary cursor-pointer transition-all  duration-500 ">
          <b className="text-gray-700">EFFICIENCY:</b>
          <p className="text-gray-500">
            Streamlined appointment scheduling that fits into your busy
            lifestyle.
          </p>
        </div>
        <div className="border border-gray-300 p-16 hover:bg-primary cursor-pointer ">
          <b className="text-gray-700">CONVENIENCE:</b>
          <p className="text-gray-500">
            Access to a network of trusted healthcare professionals in your
            area.
          </p>
        </div>
        <div className="border border-gray-300 p-16 hover:bg-primary cursor-pointer ">
          <b className="text-gray-700">PERSONALIZATION:</b>
          <p className="text-gray-500">
            Tailored recommendations and reminders to help you stay on top of
            your health.
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
