import React from "react";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <section className="bg-linear-to-r from-blue-50 to-white pt-20 md:pt-24">
      <div className="max-w-7xl mx-auto flex flex-col-reverse md:flex-row items-center px-6 md:px-12 lg:px-16 py-12 gap-8">
        {/* Left Content */}
        <div className="flex-1 text-center md:text-left space-y-6">
          <h1 className="text-4xl md:text-6xl font-extrabold text-gray-800 leading-tight">
            Discover Your <span className="text-blue-600">Perfect Style</span>
          </h1>
          <p className="text-gray-600 text-lg md:text-xl">
            Explore our latest collection designed for elegance, comfort, and
            timeless beauty.
          </p>
          <Link to="/collection">
            <div className="flex justify-center md:justify-start">
              <button className="bg-blue-600 text-white px-6 py-3 rounded-full font-medium text-lg hover:bg-blue-700 transition-all duration-300 shadow-md cursor-pointer">
                Shop Now
              </button>
            </div>
          </Link>
        </div>

        {/* Right Image */}
        <div className="flex-1 flex justify-center md:justify-end">
          <img
            src="./hasanah_logo.jpg"
            alt="Hero"
            className="w-full md:w-4/5 lg:w-3/4 object-cover rounded-2xl shadow-xl"
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;
