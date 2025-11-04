import React, { useContext, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { ShopContext } from "../context/ShopContext";

const Login = () => {
  const { setToken, navigate, backendUrl } = useContext(ShopContext);
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  // ✅ Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // ✅ Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !formData.email ||
      !formData.password ||
      (!isLogin && !formData.fullName)
    ) {
      toast.error("⚠️ Please fill all required fields!");
      return;
    }

    if (!isLogin && formData.password !== formData.confirmPassword) {
      toast.error("⚠️ Passwords do not match!");
      return;
    }

    try {
      setLoading(true);
      const url = backendUrl + `/api/user/${isLogin ? "login" : "register"}`;
      const payload = isLogin
        ? {
            email: formData.email,
            password: formData.password,
          }
        : {
            name: formData.fullName,
            email: formData.email,
            password: formData.password,
          };

      const response = await axios.post(url, payload);

      if (response.data.success) {
        const receivedToken = response.data.token;
        localStorage.setItem("token", receivedToken);
        setToken(receivedToken);

        toast.success(
          isLogin ? "Logged in successfully!" : "Registered successfully!"
        );

        // Navigate to admin dashboard or home
        navigate("/");

        // Reset form
        setFormData({
          fullName: "",
          email: "",
          password: "",
          confirmPassword: "",
        });
      } else {
        toast.error(`❌ ${response.data.message}`);
      }
    } catch (error) {
      console.error(error);
      toast.error(
        error.response?.data?.message ||
          "Something went wrong, please try again!"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-[80vh] bg-gray-50 px-4">
      <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-lg border border-gray-100">
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
            placeholder="Email Address"
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
            disabled={loading}
            className={`w-full cursor-pointer py-2 rounded-lg font-semibold transition ${
              loading
                ? "bg-pink-400 cursor-not-allowed"
                : "bg-pink-600 hover:bg-pink-700 text-white"
            }`}
          >
            {loading ? "Processing..." : isLogin ? "Login" : "Register"}
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
