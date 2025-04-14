import React, { useState, useEffect } from "react";
import {
  FaUserCircle,
  FaWallet,
  FaMoneyCheckAlt,
  FaSignOutAlt,
  FaBars,
  FaTimes,
} from "react-icons/fa";
import {
  MdDashboard,
  MdOutlineBusiness,
  MdAccountCircle,
} from "react-icons/md";
import { AiOutlineDown } from "react-icons/ai";
import { RiUserAddLine } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import Logo from "../assets/LOGO.png"; // Import the logo image

const Navbar = () => {
  const navigate = useNavigate();
  const [openDropdown, setOpenDropdown] = useState(null);
  const [userName, setUserName] = useState("User");
  const [isMenuOpen, setIsMenuOpen] = useState(false); // Mobile menu state

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser && storedUser.name) {
      setUserName(storedUser.name);
    }
  }, []);

  // Function to toggle dropdown
  const handleDropdownToggle = (dropdown) => {
    setOpenDropdown(openDropdown === dropdown ? null : dropdown);
  };
// Renders a single nav button
const renderNavButton = (label, path, icon) => (
  <button
    onClick={() => navigate(path)}
    className="flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-teal-600 transition text-white font-medium"
  >
    {icon}
    {label}
  </button>
);

// Renders a dropdown
const renderDropdown = (label, key, icon, items) => (
  <div className="relative group dropdown-menu">
    <button
      onClick={() => handleDropdownToggle(key)}
      className="flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-teal-600 transition font-medium"
    >
      {icon}
      {label}
      <AiOutlineDown className="ml-1 transition-transform group-hover:rotate-180" />
    </button>
    {openDropdown === key && (
      <div className="absolute left-0 mt-2 w-56 bg-white text-gray-900 border border-gray-200 shadow-lg rounded-lg z-50">
        {items.map((item, index) => (
          <button
            key={index}
            onClick={() => navigate(item.path)}
            className="block w-full text-left px-4 py-3 hover:bg-teal-100 hover:text-teal-800 transition"
          >
            {item.label}
          </button>
        ))}
      </div>
    )}
  </div>
);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest(".dropdown-menu")) {
        setOpenDropdown(null);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-slate-900 shadow-md text-white">
  {/* Upper Section */}
  <div className="flex justify-between items-center px-6 py-4 border-b border-slate-800">
    {/* Logo */}
    <div className="flex items-center space-x-2">
      <img src={Logo} alt="Logo" className="h-14 w-auto" />
    </div>

    {/* Mobile Toggle */}
    <button
      className="text-white text-2xl md:hidden transition-transform"
      onClick={() => setIsMenuOpen(!isMenuOpen)}
    >
      {isMenuOpen ? <FaTimes /> : <FaBars />}
    </button>

    {/* User Info */}
    <div className="hidden md:flex items-center space-x-3">
      <span className="text-teal-400 font-medium tracking-wide">{userName}</span>
      <FaUserCircle className="text-3xl text-teal-400" />
    </div>
  </div>

  {/* Menu Section */}
  <div className={`bg-slate-800 transition-all duration-300 md:flex md:justify-between px-6 py-3 ${isMenuOpen ? "block" : "hidden"} md:block`}>
    <div className="flex flex-col md:flex-row gap-2 md:gap-6">

      {/* Reusable Button */}
      {renderNavButton("Dashboard", "/dashboard", <MdDashboard />)}

      {/* Registration Dropdown */}
      {renderDropdown(
        "New Registration",
        "registration",
        <RiUserAddLine />,
        [
          { label: "Register Member", path: "/newregister" }
        ]
      )}

      {/* Business Dropdown */}
      {renderDropdown(
        "Business",
        "business",
        <MdOutlineBusiness />,
        [
          { label: "My Directs", path: "/sponsors" },
          { label: "Plan Tree", path: "/usertree" },
          { label: "Rank Achievement", path: "/rewardachievements" }
        ]
      )}

      {/* Account Dropdown */}
      {renderDropdown(
        "Account",
        "account",
        <MdAccountCircle />,
        [
          { label: "Profile", path: "/profile" },
          { label: "Change Password", path: "/change-password" },
          { label: "Change Wallet Password", path: "/change-wallet-password" }
        ]
      )}

      {/* Wallet Dropdown */}
      {renderDropdown(
        "Wallet",
        "wallet",
        <FaWallet />,
        [
          { label: "Wallet", path: "/walletbalance" },
          { label: "Sponsors", path: "/wallet" },
          { label: "E-Pin History", path: "/epin-history" },
          { label: "Share E-Pin", path: "/reshare" }
        ]
      )}

      {/* Payout */}
      {renderNavButton("Payout", "/payoutuser", <FaMoneyCheckAlt />)}
    </div>

    {/* Logout */}
    <button
      onClick={handleLogout}
      className="mt-4 md:mt-0 bg-red-600 hover:bg-red-700 transition px-5 py-2 rounded-lg flex items-center gap-2 text-white font-medium"
    >
      <FaSignOutAlt />
      Logout
    </button>
  </div>
</nav>

  );
};

export default Navbar;
