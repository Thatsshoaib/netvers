import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { FiMenu, FiX } from "react-icons/fi";
import logo from "../assets/LOGO.png";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [navHeight, setNavHeight] = useState(0);
  const navRef = useRef(null);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);

    if (navRef.current) {
      setNavHeight(navRef.current.offsetHeight);
    }

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const menuItems = ["Home", "About", "Services", "Contact", "Gallery"];

  return (
    <>
      {/* Navbar */}
      <nav
        ref={navRef}
        className={`fixed w-full top-0 z-50 backdrop-blur-lg transition-all duration-300 ${
          scrolled ? "bg-[#1E3A8A]/90 shadow-lg" : "bg-[#1E3A8A]"
        }`}
        style={{ height: "4.5rem" }}
      >
        <div className="container mx-auto flex justify-between items-center py-3 px-6">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3 group">
            <img
              src={logo}
              alt="Logo"
              className="h-20 w-20 max-h-[4rem] transition-transform duration-300 group-hover:scale-110"
            />
          </Link>

          {/* Mobile Menu Icon */}
          <div className="md:hidden">
            {isOpen ? (
              <FiX
                className="text-3xl cursor-pointer text-white transition-transform duration-300 hover:scale-110"
                onClick={() => setIsOpen(false)}
              />
            ) : (
              <FiMenu
                className="text-3xl cursor-pointer text-white transition-transform duration-300 hover:scale-110"
                onClick={() => setIsOpen(true)}
              />
            )}
          </div>

          {/* Desktop Navigation */}
          <ul className="hidden md:flex space-x-8 text-lg items-center">
            {menuItems.map((item) => {
              const isActive = location.pathname === `/${item.toLowerCase()}`;
              return (
                <li key={item} className="relative group">
                  <Link
                    to={`/${item.toLowerCase()}`}
                    className="text-white transition duration-300 hover:text-[#3B82F6]"
                  >
                    {item}
                    <span
                      className={`absolute -bottom-1 left-0 w-full h-0.5 bg-[#3B82F6] transition-transform duration-300 ${
                        isActive ? "scale-x-100" : "scale-x-0"
                      } group-hover:scale-x-100`}
                    ></span>
                  </Link>
                </li>
              );
            })}
            <Link
              to="/register"
              className="px-6 py-2.5 bg-white text-[#1E3A8A] rounded-full font-medium transition-all duration-300 
              hover:bg-gradient-to-r hover:from-blue-500 hover:to-indigo-600 hover:text-white 
              hover:shadow-xl hover:scale-105"
            >
              Join Us
            </Link>
          </ul>
        </div>

        {/* Mobile Menu */}
        <div
          className={`md:hidden fixed inset-0 bg-black bg-opacity-50 backdrop-blur-lg z-40 transform ${
            isOpen ? "translate-x-0 opacity-100" : "translate-x-full opacity-0"
          } transition-transform duration-300`}
        >
          <div className="absolute right-0 w-2/3 h-full bg-[#1E3A8A] shadow-xl flex flex-col items-center py-10">
            <button
              className="absolute top-6 right-6 text-white text-3xl"
              onClick={() => setIsOpen(false)}
            >
              <FiX />
            </button>
            <ul className="flex flex-col space-y-6 items-center w-full">
              {menuItems.map((item) => {
                const isActive = location.pathname === `/${item.toLowerCase()}`;
                return (
                  <li key={item} className="relative w-full text-center">
                    <Link
                      to={`/${item.toLowerCase()}`}
                      className="block text-lg text-white transition duration-300 hover:text-[#3B82F6]"
                      onClick={() => setIsOpen(false)}
                    >
                      {item}
                      {isActive && (
                        <span className="absolute -bottom-2 left-0 w-full h-0.5 bg-[#3B82F6]"></span>
                      )}
                    </Link>
                  </li>
                );
              })}
              <li>
                <Link
                  to="/register"
                  className="px-8 py-2.5 bg-white text-[#1E3A8A] rounded-full font-medium transition-all duration-300 
                  hover:bg-gradient-to-r hover:from-blue-500 hover:to-indigo-600 hover:text-white 
                  hover:shadow-xl hover:scale-105"
                  onClick={() => setIsOpen(false)}
                >
                  Join Us
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      {/* Dynamic Margin for Preventing Overlapping */}
      <div style={{ marginTop: `${navHeight}px` }}></div>
    </>
  );
};

export default Navbar;
