import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  HiOutlineMenuAlt3,
  HiOutlineX,
  HiLogout,
  HiHome,
  HiBadgeCheck,
  HiCollection,
  HiGift,
  HiOutlineShare,
} from "react-icons/hi";

function AdminNavbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [dropdown, setDropdown] = useState("");

  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  const toggleDropdown = (menu) => {
    setDropdown((prev) => (prev === menu ? "" : menu));
  };

  return (
    <>
      {/* Navbar */}
      <nav className="bg-gradient-to-r from-gray-800 via-gray-900 to-black text-white shadow-xl fixed w-full z-50 backdrop-blur-lg bg-opacity-70">
        <div className="flex justify-between items-center h-16 px-6">
          <h1 className="text-2xl font-bold text-white">Admin Panel</h1>

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-6 items-center">
            <NavItem to="/admin-dashboard" icon={<HiHome />} text="Dashboard" />

            {/* E-PIN Dropdown */}
            <Dropdown
              label="E-PIN"
              items={[
                { to: "/epin", icon: <HiBadgeCheck />, text: "E-PINs" },
                { to: "/admin-epin-history", icon: <HiCollection />, text: "E-PIN History" },
              ]}
            />

            {/* User Dropdown */}
            <Dropdown
              label="Users"
              items={[
                { to: "/usertree", icon: <HiOutlineShare />, text: "Tree" },
                { to: "/sponsors", icon: <HiOutlineShare />, text: "Sponsors" },
              ]}
            />

            {/* Plan Dropdown */}
            <Dropdown
              label="Plans"
              items={[
                { to: "/upgrade", icon: <HiOutlineShare />, text: "Upgrade Plan" },
                { to: "/payout", icon: <HiOutlineShare />, text: "Payouts" },
              ]}
            />

            <NavItem to="/rewards" icon={<HiGift />} text="Achievements" />

            <button
              onClick={handleLogout}
              className="flex items-center gap-2 text-lg text-gray-300 hover:text-white hover:bg-red-600 px-3 py-2 rounded-lg transition-all duration-300"
            >
              <HiLogout className="text-xl" />
              Logout
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-3xl text-white md:hidden"
          >
            {isOpen ? <HiOutlineX /> : <HiOutlineMenuAlt3 />}
          </button>
        </div>
      </nav>

      {/* Mobile Dropdown Menu */}
      {isOpen && (
        <div className="fixed top-16 left-0 w-full bg-black bg-opacity-90 backdrop-blur-lg z-40 flex flex-col items-center space-y-4 py-5 md:hidden">
          <NavItem to="/admin-dashboard" icon={<HiHome />} text="Dashboard" onClick={() => setIsOpen(false)} />

          {/* E-PIN Mobile Dropdown */}
          <MobileDropdown
            label="E-PIN"
            isOpen={dropdown === "epin"}
            toggle={() => toggleDropdown("epin")}
            items={[
              { to: "/epin", icon: <HiBadgeCheck />, text: "E-PINs" },
              { to: "/admin-epin-history", icon: <HiCollection />, text: "E-PIN History" },
            ]}
            closeMenu={() => setIsOpen(false)}
          />

          {/* Users Mobile Dropdown */}
          <MobileDropdown
            label="Users"
            isOpen={dropdown === "users"}
            toggle={() => toggleDropdown("users")}
            items={[
              { to: "/usertree", icon: <HiOutlineShare />, text: "Tree" },
              { to: "/sponsors", icon: <HiOutlineShare />, text: "Sponsors" },
            ]}
            closeMenu={() => setIsOpen(false)}
          />

          {/* Plans Mobile Dropdown */}
          <MobileDropdown
            label="Plans"
            isOpen={dropdown === "plans"}
            toggle={() => toggleDropdown("plans")}
            items={[
              { to: "/upgrade", icon: <HiOutlineShare />, text: "Upgrade Plan" },
              { to: "/payout", icon: <HiOutlineShare />, text: "Payouts" },
            ]}
            closeMenu={() => setIsOpen(false)}
          />

          <NavItem to="/rewards" icon={<HiGift />} text="Achievements" onClick={() => setIsOpen(false)} />

          <button
            onClick={handleLogout}
            className="flex items-center gap-3 text-lg text-gray-300 hover:text-white hover:bg-red-600 px-4 py-2 rounded-lg transition-all duration-300"
          >
            <HiLogout className="text-xl" />
            Logout
          </button>
        </div>
      )}

      <div className="pt-16" />
    </>
  );
}

// Reusable Nav Item
const NavItem = ({ to, icon, text, onClick }) => (
  <Link
    to={to}
    onClick={onClick}
    className="flex items-center gap-2 text-lg text-gray-300 hover:text-white hover:bg-gray-700 px-3 py-2 rounded-lg transition-all duration-300"
  >
    <span className="text-xl">{icon}</span>
    {text}
  </Link>
);

// Desktop Dropdown Component
const Dropdown = ({ label, items }) => {
  const [isHovered, setIsHovered] = useState(false);
  return (
    <div
      className="relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <button className="text-lg text-gray-300 hover:text-white px-3 py-2 rounded-lg transition">
        {label}
      </button>
      {isHovered && (
        <div className="absolute top-full left-0 bg-gray-800 rounded-lg shadow-md mt-1 z-50 w-48">
          {items.map((item, idx) => (
            <NavItem key={idx} {...item} />
          ))}
        </div>
      )}
    </div>
  );
};

// Mobile Dropdown
const MobileDropdown = ({ label, items, isOpen, toggle, closeMenu }) => (
  <div className="w-full px-4">
    <button
      onClick={toggle}
      className="w-full flex justify-between items-center text-lg text-gray-300 hover:text-white px-3 py-2 rounded-lg transition"
    >
      {label}
      <span>{isOpen ? "▲" : "▼"}</span>
    </button>
    {isOpen && (
      <div className="flex flex-col mt-1 space-y-2 ml-4">
        {items.map((item, idx) => (
          <NavItem key={idx} {...item} onClick={closeMenu} />
        ))}
      </div>
    )}
  </div>
);

export default AdminNavbar;
