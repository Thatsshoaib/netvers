import React from "react";
import Navbar from "../Components/homeNavbar";

const Services = () => {
  return (
    <div className="font-sans">
      {/* Navbar */}
      <Navbar />

      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-800 to-blue-900 text-white text-center py-28 mt-16">
        <h1 className="text-5xl font-bold">Achieve Growth & Financial Independence</h1>
        <p className="text-lg text-gray-300 mt-2">
          Unlock new opportunities and build a future of success.
        </p>
      </div>

      {/* Services Section */}
      <section className="py-20 px-6 bg-gray-100">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl font-semibold text-gray-800">Our Key Benefits</h2>
          <p className="text-gray-600 mt-4 max-w-3xl mx-auto">
            Empowering individuals with the right tools, knowledge, and support to achieve financial success and personal growth.
          </p>

          {/* Service Cards */}
          <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
            {servicesData.map((service, index) => (
              <div
                key={index}
                className="bg-white p-8 rounded-lg shadow-lg transform transition-transform hover:scale-105 hover:shadow-xl"
              >
                <img src={service.icon} alt={service.title} className="w-16 mx-auto" />
                <h3 className="text-xl font-semibold text-gray-800 mt-4">{service.title}</h3>
                <p className="text-gray-600 mt-2">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-900 to-blue-800 text-white text-center">
        <h2 className="text-4xl font-semibold">Take the First Step Towards Success</h2>
        <p className="text-gray-300 mt-3 text-lg">
          Join us today and start your journey to financial independence.
        </p>
        <button className="mt-6 px-8 py-3 bg-white text-blue-700 font-semibold rounded-lg hover:bg-gray-200 transition">
          Get Started
        </button>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
          <div>
            <h3 className="text-lg font-semibold">CorporateBrand</h3>
            <p className="text-gray-400 mt-2">
              Leading in innovation and financial empowerment.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold">Quick Links</h3>
            <ul className="text-gray-400 mt-2 space-y-2">
              <li className="hover:text-white cursor-pointer">Home</li>
              <li className="hover:text-white cursor-pointer">About</li>
              <li className="hover:text-white cursor-pointer">Services</li>
              <li className="hover:text-white cursor-pointer">Contact</li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold">Contact Info</h3>
            <p className="text-gray-400 mt-2">Email: info@corporatebrand.com</p>
            <p className="text-gray-400">Phone: +91 9876543210</p>
          </div>
        </div>
        <div className="text-center text-gray-500 mt-8">
          © 2025 CorporateBrand. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

// Services Data for Growth & Financial Independence
const servicesData = [
  {
    title: "Financial Growth",
    description: "Learn how to build wealth and create long-term financial security.",
    icon: "https://cdn-icons-png.flaticon.com/128/3464/3464446.png",
  },
  {
    title: "Entrepreneurial Success",
    description: "Turn your ideas into profitable business ventures.",
    icon: "https://cdn-icons-png.flaticon.com/128/3039/3039387.png",
  },
  {
    title: "Passive Income",
    description: "Discover strategies to earn income without active work.",
    icon: "https://cdn-icons-png.flaticon.com/128/2885/2885418.png",
  },
  {
    title: "Personal Development",
    description: "Improve skills, mindset, and habits for long-term success.",
    icon: "https://cdn-icons-png.flaticon.com/128/2010/2010051.png",
  },
  {
    title: "Leadership & Networking",
    description: "Build valuable connections and grow as a leader.",
    icon: "https://cdn-icons-png.flaticon.com/128/4128/4128644.png",
  },
  {
    title: "Financial Independence",
    description: "Achieve true financial freedom and control over your future.",
    icon: "https://cdn-icons-png.flaticon.com/128/1523/1523150.png",
  },
];

export default Services;
