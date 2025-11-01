import React from "react";
import {
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaLinkedinIn,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 pt-12 pb-6 px-6 md:px-12">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10 border-b border-gray-700 pb-10">
        {/* Logo & Description */}
        <div>
          <h2 className="text-3xl font-bold text-pink-500 mb-3">Hasanah</h2>
          <p className="text-gray-400">
            Discover the latest trends in fashion and lifestyle. Shop smart,
            shop stylish — your comfort is our priority.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-xl font-semibold text-white mb-4">Quick Links</h3>
          <ul className="space-y-2">
            <li>
              <a
                href="/"
                className="hover:text-pink-500 transition duration-200"
              >
                Home
              </a>
            </li>
            <li>
              <a
                href="/collection"
                className="hover:text-pink-500 transition duration-200"
              >
                Collection
              </a>
            </li>
            <li>
              <a
                href="/about"
                className="hover:text-pink-500 transition duration-200"
              >
                About
              </a>
            </li>
            <li>
              <a
                href="/contact"
                className="hover:text-pink-500 transition duration-200"
              >
                Contact
              </a>
            </li>
          </ul>
        </div>

        {/* Support */}
        <div>
          <h3 className="text-xl font-semibold text-white mb-4">Support</h3>
          <ul className="space-y-2">
            <li>
              <a
                href="#faq"
                className="hover:text-pink-500 transition duration-200"
              >
                FAQs
              </a>
            </li>
            <li>
              <a
                href="#returns"
                className="hover:text-pink-500 transition duration-200"
              >
                Return Policy
              </a>
            </li>
            <li>
              <a
                href="#privacy"
                className="hover:text-pink-500 transition duration-200"
              >
                Privacy Policy
              </a>
            </li>
            <li>
              <a
                href="#terms"
                className="hover:text-pink-500 transition duration-200"
              >
                Terms of Service
              </a>
            </li>
          </ul>
        </div>

        {/* Newsletter & Socials */}
        <div>
          <h3 className="text-xl font-semibold text-white mb-4">
            Join Our Community
          </h3>
          <p className="text-gray-400 mb-4">
            Get exclusive offers & updates directly to your inbox.
          </p>
          <form className="flex flex-col sm:flex-row gap-3">
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full px-4 py-2 rounded-full focus:outline-none focus:ring-2 focus:ring-pink-500"
            />
            <button className="bg-pink-600 text-white px-6 py-2 rounded-full hover:bg-pink-700 transition duration-300">
              Subscribe
            </button>
          </form>

          {/* Social Icons */}
          <div className="flex gap-4 mt-6 justify-center sm:justify-start">
            <a
              href="#"
              className="p-3 bg-gray-800 rounded-full hover:bg-pink-600 transition duration-300"
            >
              <FaFacebookF />
            </a>
            <a
              href="#"
              className="p-3 bg-gray-800 rounded-full hover:bg-pink-600 transition duration-300"
            >
              <FaInstagram />
            </a>
            <a
              href="#"
              className="p-3 bg-gray-800 rounded-full hover:bg-pink-600 transition duration-300"
            >
              <FaTwitter />
            </a>
            <a
              href="#"
              className="p-3 bg-gray-800 rounded-full hover:bg-pink-600 transition duration-300"
            >
              <FaLinkedinIn />
            </a>
          </div>
        </div>
      </div>

      {/* Copyright Section */}
      <div className="text-center text-gray-500 text-sm mt-8">
        © {new Date().getFullYear()}{" "}
        <span className="text-pink-500 font-semibold">Hasanah</span>. All Rights
        Reserved.
      </div>
    </footer>
  );
};

export default Footer;
