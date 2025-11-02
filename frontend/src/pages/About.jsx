import React, { useContext } from "react";
import { assets } from "../assets/assets";
import { ShopContext } from "./../context/ShopContext";

const About = () => {
  const { navigate } = useContext(ShopContext);
  return (
    <div className="min-h-[80vh] bg-gray-50">
      {/* Hero Section */}
      <section className="bg-pink-600 text-white py-20 px-4">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">About Us</h1>
          <p className="text-lg md:text-xl max-w-2xl mx-auto">
            We are dedicated to providing the best products with excellent
            customer service.
          </p>
        </div>
      </section>

      {/* Our Story */}
      <section className="container mx-auto py-16 px-4">
        <div className="flex flex-col md:flex-row items-center gap-8">
          <div className="md:w-1/2">
            <img
              src={assets.about_img}
              alt="Our Story"
              className="rounded-xl shadow-lg object-cover w-full h-full"
            />
          </div>
          <div className="md:w-1/2 space-y-4">
            <h2 className="text-3xl font-semibold text-gray-800">Our Story</h2>
            <p className="text-gray-600 text-lg">
              Our journey began with a vision to create an e-commerce platform
              that is not only convenient but also trusted by customers. We
              combine quality products with unmatched service.
            </p>
            <p className="text-gray-600 text-lg">
              Over the years, we have grown into a community-focused company
              that values transparency, sustainability, and customer
              satisfaction.
            </p>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="bg-gray-100 py-16 px-4">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-semibold mb-8 text-gray-800">
            Why Choose Us
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-xl transition">
              <img
                src={assets.fast_delivary}
                alt="Fast Delivery"
                className="w-16 h-16 mx-auto mb-4"
              />
              <h3 className="font-semibold text-xl mb-2">Fast Delivery</h3>
              <p className="text-gray-600">
                We ensure quick and safe delivery to your doorstep every time.
              </p>
            </div>
            <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-xl transition">
              <img
                src={assets.quality_icon}
                alt="Best Quality"
                className="w-16 h-16 mx-auto mb-4"
              />
              <h3 className="font-semibold text-xl mb-2">Best Quality</h3>
              <p className="text-gray-600">
                All our products are carefully selected to ensure top-notch
                quality.
              </p>
            </div>
            <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-xl transition">
              <img
                src={assets.support_img}
                alt="Support"
                className="w-16 h-16 mx-auto mb-4"
              />
              <h3 className="font-semibold text-xl mb-2">24/7 Support</h3>
              <p className="text-gray-600">
                Our friendly team is always ready to help you with any query.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Team */}
      <section className="container mx-auto py-16 px-4">
        <h2 className="text-3xl font-semibold mb-8 text-center text-gray-800">
          Meet Our Team
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          {[
            { name: "Alice Johnson", role: "CEO", img: assets.mehedi },
            { name: "Bob Smith", role: "CTO", img: assets.mehedi },
            { name: "Carol Lee", role: "Marketing Head", img: assets.mehedi },
          ].map((member, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-md p-6 text-center hover:shadow-xl transition"
            >
              <img
                src={member.img || "https://via.placeholder.com/150"}
                alt={member.name}
                className="w-32 h-32 rounded-full mx-auto mb-4 object-cover"
              />
              <h3 className="font-semibold text-xl">{member.name}</h3>
              <p className="text-gray-500">{member.role}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Call to Action */}
      <section className="bg-pink-600 py-12 text-white text-center px-4 rounded-t-3xl">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          Ready to Shop with Us?
        </h2>
        <p className="text-lg md:text-xl mb-6">
          Explore our products and enjoy a seamless shopping experience.
        </p>
        <button
          onClick={() => navigate("/collection")}
          className="bg-white cursor-pointer text-pink-600 font-semibold px-6 py-3 rounded-lg hover:bg-gray-100 transition"
        >
          Shop Now
        </button>
      </section>
    </div>
  );
};

export default About;
