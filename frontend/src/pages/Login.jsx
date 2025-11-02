import React, { useState } from "react";
import { toast } from "react-toastify";

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle form submit
  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      !formData.email ||
      !formData.password ||
      (!isLogin && !formData.fullName)
    ) {
      toast.error("Please fill all fields!");
      return;
    }

    if (!isLogin && formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match!");
      return;
    }

    if (isLogin) {
      toast.success("Logged in successfully!");
    } else {
      toast.success("Registered successfully!");
    }

    // Reset form
    setFormData({
      fullName: "",
      email: "",
      password: "",
      confirmPassword: "",
    });
  };

  return (
    <div className="flex items-center justify-center min-h-[60vh] bg-gray-100 px-4">
      <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-lg">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
          {isLogin ? "Login" : "Register"}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {!isLogin && (
            <input
              type="text"
              name="fullName"
              placeholder="Full Name"
              value={formData.fullName}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-pink-600 focus:ring-2 focus:ring-pink-300 transition"
            />
          )}

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:outline-pink-600 focus:ring-2 focus:ring-pink-300 transition"
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:outline-pink-600 focus:ring-2 focus:ring-pink-300 transition"
          />

          {!isLogin && (
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-pink-600 focus:ring-2 focus:ring-pink-300 transition"
            />
          )}

          <button
            type="submit"
            className="w-full cursor-pointer bg-pink-600 text-white py-2 rounded-lg font-semibold hover:bg-pink-700 transition"
          >
            {isLogin ? "Login" : "Register"}
          </button>
        </form>

        <p className="text-center mt-4 text-gray-500">
          {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
          <span
            className="text-pink-600 cursor-pointer font-semibold hover:underline"
            onClick={() => setIsLogin(!isLogin)}
          >
            {isLogin ? "Register" : "Login"}
          </span>
        </p>
      </div>
    </div>
  );
};

export default Login;
