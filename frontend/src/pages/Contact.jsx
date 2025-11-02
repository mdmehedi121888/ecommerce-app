import React, { useState } from "react";
import { toast } from "react-toastify";
import { assets } from "../assets/assets";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      !formData.name ||
      !formData.email ||
      !formData.subject ||
      !formData.message
    ) {
      toast.error("Please fill in all fields!");
      return;
    }
    toast.success("Message sent successfully!");
    setFormData({ name: "", email: "", subject: "", message: "" });
  };

  return (
    <div className="min-h-[90vh] bg-gradient-to-b from-pink-50 to-white py-16 px-4">
      <div className="container mx-auto max-w-6xl">
        <h2 className="text-4xl font-extrabold text-gray-800 text-center mb-4">
          Contact Us
        </h2>
        <p className="text-center text-gray-600 mb-12 text-lg">
          Have a question or feedback? Fill out the form and we’ll get back to
          you quickly.
        </p>

        <div className="grid md:grid-cols-2 gap-10">
          {/* Contact Form */}
          <div className="bg-white p-8 rounded-2xl shadow-lg border border-pink-100">
            <h3 className="text-2xl font-semibold mb-6 text-gray-800 border-b border-pink-200 pb-2">
              Send Us a Message
            </h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                name="name"
                placeholder="Full Name"
                value={formData.name}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-pink-500 focus:ring-2 focus:ring-pink-200 transition"
              />
              <input
                type="email"
                name="email"
                placeholder="Email Address"
                value={formData.email}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-pink-500 focus:ring-2 focus:ring-pink-200 transition"
              />
              <input
                type="text"
                name="subject"
                placeholder="Subject"
                value={formData.subject}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-pink-500 focus:ring-2 focus:ring-pink-200 transition"
              />
              <textarea
                name="message"
                rows="5"
                placeholder="Your Message"
                value={formData.message}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-pink-500 focus:ring-2 focus:ring-pink-200 transition resize-none"
              />
              <button
                type="submit"
                className="w-full cursor-pointer bg-pink-600 text-white py-3 rounded-lg font-medium hover:bg-pink-700 transition shadow-md"
              >
                Send Message
              </button>
            </form>
          </div>

          {/* Contact Info & Map */}
          <div className="space-y-8">
            <div className="bg-pink-50 p-8 rounded-2xl shadow-lg border border-pink-100">
              <h3 className="text-2xl font-semibold mb-4 text-gray-800 border-b border-pink-200 pb-2">
                Contact Information
              </h3>
              <div className="space-y-4 text-gray-700">
                <div className="flex items-center gap-3">
                  <img
                    src={assets.phone_icon}
                    alt="Phone"
                    className="w-6 h-6"
                  />
                  <span className="text-gray-800 font-medium">
                    +1 234 567 890
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <img
                    src={assets.email_icon}
                    alt="Email"
                    className="w-6 h-6"
                  />
                  <span className="text-gray-800 font-medium">
                    support@ecommerce.com
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <img
                    src={assets.location_icon}
                    alt="Location"
                    className="w-6 h-6"
                  />
                  <span className="text-gray-800 font-medium">
                    123 Market Street, City, Country
                  </span>
                </div>
              </div>
            </div>

            <div className="h-64 rounded-2xl overflow-hidden shadow-lg border border-pink-100">
              <iframe
                title="Company Location"
                src="https://maps.google.com/maps?q=New%20York&t=&z=13&ie=UTF8&iwloc=&output=embed"
                width="100%"
                height="100%"
                className="border-0"
                allowFullScreen=""
                loading="lazy"
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
