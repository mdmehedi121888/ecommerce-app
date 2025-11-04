import React, { useState } from "react";
import { toast } from "react-toastify";
import { FaUpload } from "react-icons/fa";
import { backendUrl } from "../App";
import axios from "axios";

const Add = ({ token }) => {
  const [images, setImages] = useState([null, null, null, null]);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    category: "",
    subCategory: "",
    price: "",
    sizes: [],
    bestSeller: false,
  });

  const sizeOptions = ["S", "M", "L", "XL", "XXL"];

  // ✅ Handle form input
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // ✅ Handle size toggle
  const handleSizeChange = (size) => {
    setFormData((prev) => ({
      ...prev,
      sizes: prev.sizes.includes(size)
        ? prev.sizes.filter((s) => s !== size)
        : [...prev.sizes, size],
    }));
  };

  // ✅ Handle image upload
  const handleImageUpload = (index, e) => {
    const file = e.target.files[0];
    if (!file) return;

    const newImages = [...images];
    newImages[index] = {
      file,
      preview: URL.createObjectURL(file),
    };
    setImages(newImages);
  };

  // ✅ Submit product to backend
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !formData.name ||
      !formData.description ||
      !formData.category ||
      !formData.subCategory ||
      !formData.price ||
      formData.sizes.length === 0
    ) {
      toast.error("⚠️ Please fill all required fields!");
      return;
    }

    const validImages = images.filter((img) => img !== null);
    if (validImages.length === 0) {
      toast.error("⚠️ Please upload at least one image!");
      return;
    }

    try {
      setLoading(true);

      // ✅ Build FormData
      const formDataToSend = new FormData();
      formDataToSend.append("name", formData.name);
      formDataToSend.append("description", formData.description);
      formDataToSend.append("price", formData.price);
      formDataToSend.append("category", formData.category);
      formDataToSend.append("subCategory", formData.subCategory);
      formDataToSend.append("bestSeller", formData.bestSeller);
      formDataToSend.append("sizes", JSON.stringify(formData.sizes));

      // ✅ Append images only if available
      validImages.forEach((img, index) => {
        formDataToSend.append(`image${index + 1}`, img.file);
      });

      const response = await axios.post(
        backendUrl + "/api/product/add",
        formDataToSend,
        { headers: { token } }
      );

      // console.log("formDataToSend: ", formDataToSend);
      // console.log("response: ", response);
      if (response.data.success) {
        toast.success("Product added successfully!");
        setFormData({
          name: "",
          description: "",
          category: "",
          subCategory: "",
          price: "",
          sizes: [],
          bestSeller: false,
        });
        setImages([null, null, null, null]);
      } else {
        toast.error(`❌ Failed to add product`);
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong while adding product!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white shadow-lg rounded-2xl p-6 max-w-4xl mx-auto border border-gray-100">
      <h2 className="text-2xl font-semibold text-pink-600 mb-6">
        Add New Product
      </h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* 🔹 Image Upload */}
        <div>
          <label className="block font-medium text-gray-700 mb-2">
            Product Images
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {images.map((img, index) => (
              <div
                key={index}
                className="relative border-2 border-dashed border-pink-300 rounded-lg h-32 flex items-center justify-center cursor-pointer hover:border-pink-500 transition"
                onClick={() =>
                  document.getElementById(`imageInput-${index}`).click()
                }
              >
                {img ? (
                  <img
                    src={img.preview}
                    alt={`Product ${index + 1}`}
                    className="w-full h-full object-contain rounded-lg"
                  />
                ) : (
                  <div className="flex flex-col items-center text-pink-500">
                    <FaUpload size={24} />
                    <p className="text-sm mt-1">Upload</p>
                  </div>
                )}
                <input
                  type="file"
                  id={`imageInput-${index}`}
                  accept="image/*"
                  onChange={(e) => handleImageUpload(index, e)}
                  className="hidden"
                />
              </div>
            ))}
          </div>
        </div>

        {/* 🔹 Product Name & Price */}
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-gray-700 mb-1">Product Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="border border-gray-300 rounded-lg px-3 py-2 w-full focus:ring-2 focus:ring-pink-300 focus:outline-none"
              placeholder="Enter product name"
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-1">Price ($)</label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              className="border border-gray-300 rounded-lg px-3 py-2 w-full focus:ring-2 focus:ring-pink-300 focus:outline-none"
              placeholder="Enter price"
            />
          </div>
        </div>

        {/* 🔹 Description */}
        <div>
          <label className="block text-gray-700 mb-1">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows={3}
            className="border border-gray-300 rounded-lg px-3 py-2 w-full focus:ring-2 focus:ring-pink-300 focus:outline-none resize-none"
            placeholder="Enter product description"
          />
        </div>

        {/* 🔹 Category & Subcategory */}
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-gray-700 mb-1">Category</label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="border border-gray-300 rounded-lg px-3 py-2 w-full focus:ring-2 focus:ring-pink-300 focus:outline-none"
            >
              <option value="">Select category</option>
              <option value="Men">Men</option>
              <option value="Women">Women</option>
              <option value="Kids">Kids</option>
            </select>
          </div>

          <div>
            <label className="block text-gray-700 mb-1">Sub Category</label>
            <select
              name="subCategory"
              value={formData.subCategory}
              onChange={handleChange}
              className="border border-gray-300 rounded-lg px-3 py-2 w-full focus:ring-2 focus:ring-pink-300 focus:outline-none"
            >
              <option value="">Select sub category</option>
              <option value="Topwear">Topwear</option>
              <option value="Bottomwear">Bottomwear</option>
              <option value="Winterwear">Winterwear</option>
            </select>
          </div>
        </div>

        {/* 🔹 Sizes */}
        <div>
          <label className="block text-gray-700 mb-2">Available Sizes</label>
          <div className="flex flex-wrap gap-3">
            {sizeOptions.map((size) => (
              <button
                key={size}
                type="button"
                onClick={() => handleSizeChange(size)}
                className={`px-3 py-1 rounded-full border ${
                  formData.sizes.includes(size)
                    ? "bg-pink-600 text-white border-pink-600"
                    : "border-gray-300 text-gray-700"
                } hover:bg-pink-500 hover:text-white transition`}
              >
                {size}
              </button>
            ))}
          </div>
        </div>

        {/* 🔹 Bestseller */}
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            name="bestSeller"
            checked={formData.bestSeller}
            onChange={handleChange}
            className="w-5 h-5 accent-pink-600"
          />
          <label className="text-gray-700">Add to Best Seller</label>
        </div>

        {/* 🔹 Submit */}
        <button
          type="submit"
          disabled={loading}
          className={`w-full cursor-pointer py-2 rounded-lg font-semibold transition ${
            loading
              ? "bg-pink-400 cursor-not-allowed"
              : "bg-pink-600 hover:bg-pink-700 text-white"
          }`}
        >
          {loading ? "Adding Product..." : "Add Product"}
        </button>
      </form>
    </div>
  );
};

export default Add;
