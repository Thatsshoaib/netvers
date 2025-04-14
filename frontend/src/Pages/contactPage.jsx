import React from "react";
import HomeNavbar from "../Components/homeNavbar";

const Contact = () => {
  return (
    <div className="font-sans">
      <HomeNavbar />

      {/* Hero Section */}
      <div className="bg-gray-900 text-white text-center py-20 md:py-32 mt-16">
        <h1 className="text-3xl md:text-4xl font-bold">Contact Us</h1>
        <p className="text-base md:text-lg text-gray-300 mt-2">
          Get in touch with us for any inquiries or assistance.
        </p>
      </div>

      {/* Contact Section */}
      <section className="py-12 px-4 md:px-8 bg-gray-100">
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 gap-10">
          {/* Contact Form */}
          <div className="bg-white p-6 md:p-8 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold text-gray-800">
              Send Us a Message
            </h2>
            <p className="text-gray-600 mt-2">
              Fill out the form below and we’ll get back to you soon.
            </p>
            <form className="mt-6">
              <div className="mb-4">
                <label className="text-gray-700">Full Name</label>
                <input
                  type="text"
                  className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder="Your Name"
                />
              </div>
              <div className="mb-4">
                <label className="text-gray-700">Email</label>
                <input
                  type="email"
                  className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder="your@email.com"
                />
              </div>
              <div className="mb-4">
                <label className="text-gray-700">Message</label>
                <textarea
                  rows="4"
                  className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder="Your message here..."
                ></textarea>
              </div>
              <button className="w-full bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 transition">
                Send Message
              </button>
            </form>
          </div>

          {/* Contact Info */}
          <div className="bg-white p-6 md:p-8 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold text-gray-800">
              Contact Information
            </h2>
            <p className="text-gray-600 mt-2">
              You can also reach us through the following contact details.
            </p>

            <div className="mt-6 space-y-4">
              <div className="flex items-center space-x-4">
                <img
                  src="https://cdn-icons-png.flaticon.com/128/724/724664.png"
                  alt="Phone"
                  className="w-5 md:w-6"
                />
                <span className="text-gray-700 text-sm md:text-lg">
                  +91 9876543210
                </span>
              </div>
              <div className="flex items-center space-x-4">
                <img
                  src="https://cdn-icons-png.flaticon.com/128/732/732200.png"
                  alt="Email"
                  className="w-5 md:w-6"
                />
                <span className="text-gray-700 text-sm md:text-lg">
                  info@GrowEx.com
                </span>
              </div>
              <div className="flex items-center space-x-4">
                <img
                  src="https://cdn-icons-png.flaticon.com/128/684/684809.png"
                  alt="Location"
                  className="w-5 md:w-6"
                />
                <span className="text-gray-700 text-sm md:text-lg">
                  123 Arvana Mall, Udaipur, India
                </span>
              </div>
            </div>

            {/* Google Map Embed (Responsive) */}
            <div className="mt-6">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3628.0518379584896!2d73.68570617481797!3d24.587407156130336!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3967e56e19ec1135%3A0xaaacc143bb062cab!2sARVANAH%20SQUARE%20-%20The%20Central%20Plaza!5e0!3m2!1sen!2sin!4v1742889361176!5m2!1sen!2sin"
                className="w-full h-60 md:h-80 rounded-md"
                allowFullScreen
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8 px-6 md:px-12">
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 text-center md:text-left">
          <div>
            <h3 className="text-lg font-semibold">GrowEx</h3>
            <p className="text-gray-400 mt-2 text-sm md:text-base">
              Leading in innovation and digital transformation.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold">Quick Links</h3>
            <ul className="text-gray-400 mt-2 space-y-2 text-sm md:text-base">
              <li>Home</li>
              <li>About</li>
              <li>Services</li>
              <li>Contact</li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold">Contact Info</h3>
            <p className="text-gray-400 mt-2 text-sm md:text-base">
              Email: info@GrowEx.com
            </p>
            <p className="text-gray-400 text-sm md:text-base">
              Phone: +91 9876543210
            </p>
          </div>
        </div>
        <div className="text-center text-gray-500 mt-6 text-sm md:text-base">
          © 2025 GrowEx. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default Contact;
