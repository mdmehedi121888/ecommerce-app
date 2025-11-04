import React, { useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { backendUrl } from "../App";

const Login = ({ setToken }) => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const { email, password } = formData;
      const response = await axios.post(backendUrl + "/api/user/admin", {
        email,
        password,
      });
      if (response.data.success) {
        setToken(response.data.token);
        toast.success("Successfully login!");
      } else {
        toast.error("Invalid credential");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      {/* Logo / Title */}
      <div className="text-center mb-6">
        <h1 className="text-2xl font-semibold text-pink-600">Admin Login</h1>
        <p className="text-gray-500 text-sm mt-1">
          Sign in to access your dashboard
        </p>
      </div>

      {/* Login Form */}
      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="block text-gray-700 font-medium mb-1">
            Email Address
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter your email"
            required
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-pink-300 focus:outline-none"
          />
        </div>

        <div>
          <label className="block text-gray-700 font-medium mb-1">
            Password
          </label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              required
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-pink-300 focus:outline-none pr-10"
            />
            <button
              type="button"
              className="absolute right-3 top-2.5 text-gray-500 hover:text-pink-600"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? "🙈" : "👁️"}
            </button>
          </div>
        </div>

        <button
          type="submit"
          className="w-full cursor-pointer bg-pink-600 text-white font-semibold py-2 rounded-lg hover:bg-pink-700 transition duration-200"
        >
          Login
        </button>
      </form>

      {/* Footer */}
      <p className="text-center text-gray-500 text-sm mt-6">
        © {new Date().getFullYear()} Admin Dashboard
      </p>
    </div>
  );
};

export default Login;
