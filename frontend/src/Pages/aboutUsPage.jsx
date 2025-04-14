import React from "react";
import HomeNavbar from "../Components/homeNavbar";
import { motion } from "framer-motion";
import { FaFacebook, FaTwitter, FaLinkedin, FaLightbulb, FaCheckCircle, FaRocket } from "react-icons/fa";

const AboutUs = () => {
  return (
    <div className="font-sans">
      <HomeNavbar />

      {/* Hero Section */}
      <motion.div 
        initial={{ opacity: 0, y: -50 }} 
        animate={{ opacity: 1, y: 0 }} 
        transition={{ duration: 0.8 }}
        className="bg-gradient-to-r from-gray-900 to-gray-700 text-white text-center py-32 mt-16 relative"
      >
        <h1 className="text-5xl font-bold">About Us</h1>
        <p className="text-lg text-gray-300 mt-3 max-w-2xl mx-auto">
          Discover our journey, values, and vision for the future.
        </p>
      </motion.div>

      {/* Company Introduction */}
      <section className="py-16 px-6 bg-gray-100 text-center max-w-screen-xl mx-auto">
        <motion.h2 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="text-3xl font-semibold text-gray-800"
        >Who We Are</motion.h2>
        <p className="text-gray-600 mt-4 max-w-3xl mx-auto">
          Netverse is a forward-thinking company that drives digital transformation with cutting-edge solutions.
        </p>
      </section>

      {/* Core Values */}
      <section className="py-16 bg-gray-100 text-center max-w-screen-xl mx-auto">
        <h2 className="text-3xl font-semibold text-gray-800">Our Core Values</h2>
        <div className="mt-8 flex flex-wrap justify-center gap-6">
          {[
            { title: "Integrity", icon: <FaCheckCircle className="text-4xl text-blue-600" /> },
            { title: "Innovation", icon: <FaLightbulb className="text-4xl text-yellow-500" /> },
            { title: "Excellence", icon: <FaRocket className="text-4xl text-red-500" /> }
          ].map((value, index) => (
            <motion.div 
              key={index} 
              whileHover={{ scale: 1.05 }}
              className="bg-white p-6 rounded-lg shadow-lg w-80 flex flex-col items-center"
            >
              {value.icon}
              <h3 className="text-xl font-semibold text-gray-800 mt-3">{value.title}</h3>
              <p className="text-gray-600 mt-2">{value.title} is at the heart of everything we do.</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-12">
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
          <div>
            <h3 className="text-lg font-semibold">Netverse</h3>
            <p className="text-gray-400 mt-2">Leading in innovation and digital transformation.</p>
          </div>
          <div>
            <h3 className="text-lg font-semibold">Quick Links</h3>
            <ul className="text-gray-400 mt-2 space-y-2">
              {[
                { text: "Home", link: "/" },
                { text: "About", link: "/about" },
                { text: "Services", link: "/services" },
                { text: "Contact", link: "/contact" }
              ].map((item, index) => (
                <li key={index}>
                  <a href={item.link} className="hover:text-blue-400">{item.text}</a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold">Connect With Us</h3>
            <div className="flex justify-center md:justify-start mt-3 space-x-4 text-gray-400">
              <a href="#" className="hover:text-blue-500"><FaFacebook className="text-xl" /></a>
              <a href="#" className="hover:text-blue-400"><FaTwitter className="text-xl" /></a>
              <a href="#" className="hover:text-blue-600"><FaLinkedin className="text-xl" /></a>
            </div>
          </div>
        </div>
        <div className="text-center text-gray-500 mt-8">© 2025 CorporateBrand. All rights reserved.</div>
      </footer>
    </div>
  );
};

export default AboutUs;
