import React, { useState } from "react";

const NewsLetterBox = () => {
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    setEmail("");
  };

  return (
    <div className="bg-linear-to-r from-pink-50 to-pink-100 py-16 px-6 text-center rounded-2xl shadow-md max-w-3xl mx-auto my-16">
      <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-3">
        Subscribe Now & Get <span className="text-pink-600">20% Off</span>
      </h2>
      <p className="text-gray-600 mb-8">
        Join our newsletter to receive exclusive deals, latest arrivals, and
        special discounts — straight to your inbox!
      </p>

      <form
        onSubmit={handleSubmit}
        className="flex flex-col sm:flex-row justify-center items-center gap-3"
      >
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full sm:w-2/3 px-5 py-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-pink-400 transition"
        />
        <button
          type="submit"
          className="bg-pink-600 hover:bg-pink-700 text-white px-8 py-3 rounded-full font-semibold transition duration-300 cursor-pointer"
        >
          SUBSCRIBE
        </button>
      </form>
    </div>
  );
};

export default NewsLetterBox;
