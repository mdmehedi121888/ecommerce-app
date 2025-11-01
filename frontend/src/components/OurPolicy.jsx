import React from "react";
import { assets } from "../assets/assets";

const OurPolicy = () => {
  return (
    <section className="bg-gray-50 py-16 px-6 md:px-12">
      <div className="max-w-6xl mx-auto text-center">
        {/* Title */}
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-12">
          Our <span className="text-blue-600">Policy</span>
        </h2>

        {/* Policy Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Card 1 */}
          <div className="bg-white rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 p-8 flex flex-col items-center text-center">
            <img
              src={assets.exchange_icon}
              alt="Exchange Policy"
              className="w-16 h-16 mb-4"
            />
            <h3 className="text-xl font-semibold text-gray-800">
              Easy Exchange Policy
            </h3>
            <p className="text-gray-600 mt-2">
              We offer a hassle-free exchange policy for all our products.
            </p>
          </div>

          {/* Card 2 */}
          <div className="bg-white rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 p-8 flex flex-col items-center text-center">
            <img
              src={assets.quality_icon}
              alt="Return Policy"
              className="w-16 h-16 mb-4"
            />
            <h3 className="text-xl font-semibold text-gray-800">
              7 Days Return Policy
            </h3>
            <p className="text-gray-600 mt-2">
              We provide a 7-day free return policy with full support.
            </p>
          </div>

          {/* Card 3 */}
          <div className="bg-white rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 p-8 flex flex-col items-center text-center">
            <img
              src={assets.support_img}
              alt="Customer Support"
              className="w-16 h-16 mb-4"
            />
            <h3 className="text-xl font-semibold text-gray-800">
              Best Customer Support
            </h3>
            <p className="text-gray-600 mt-2">
              We provide 24/7 dedicated customer support to help you anytime.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OurPolicy;
