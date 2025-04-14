import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import Register from "./Pages/RegistrationForm";
import Login from "./Pages/LoginForm";
import Dashboard from "./Pages/Dashboard";
import Sponsors from "./Components/mySponsors";
import UserTree from "./Components/userTree";
import Wallet from "./Components/wallet";
import Epin from "./Components/AdminEpin";
import AdminDashboard from "./Pages/AdminDashboard";
import AdminEpinHistory from "./Components/AdminEpinHistory";
import UserEpinHistory from "./Components/userEpinHistory";
import ReshareEpin from "./Components/shareEpin";
import ManageAchievements from "./Components/rewardsAdmin";
import Home from "./Pages/homePage";
import About from "./Pages/aboutUsPage";
import Services from "./Pages/servicePage";
import Contact from "./Pages/contactPage";
import Gallery from "./Pages/galleryPage";
import Profile from "./Components/profile";
import RewardsAchievment from "./Components/rewardAchievement";
import UpgradePlans from "./Components/planUpgrade"
import NewRegistration from "./Components/newRegistration"
import AdminPayout from "./Components/payoutAdmin"
import UserPayout from "./Components/payoutUser"
import WalletBalance from "./Components/walletBalance"

// Import Different Navbars
import HomeNavbar from "./Components/homeNavbar";
import UserNavbar from "./Components/Navbar";
import AdminNavbar from "./Components/AdminNavbar";

function App() {
  const [userRole, setUserRole] = useState(null);
  const [loading, setLoading] = useState(true);
  const location = useLocation();

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser?.role) {
      setUserRole(storedUser.role);
    }
    setLoading(false);
  }, []);

  if (loading) return <div>Loading...</div>;

  // Define routes for Admin and User
  const adminRoutes = [
    "/admin-dashboard",
    "/epin",
    "/admin-epin-history",
    "/rewards",
    "/usertree",
    "/sponsors", 
    "/upgrade",
    "/payout", 
    
  ];

  const userRoutes = [
    "/dashboard",
    "/sponsors",
    "/usertree",
    "/wallet",
    "/epin-history",
    "/reshare",
    "/profile",
    "/rewardachievements",
    "/newregister",
    "/payoutuser", 
    "/walletbalance", 


  ];

  // ✅ FIXED NAVBAR LOGIC (Prioritize Admin)
  let NavbarComponent = HomeNavbar; // Default navbar

  if (userRole === "admin" && adminRoutes.includes(location.pathname)) {
    NavbarComponent = AdminNavbar;
  } else if (userRole === "user" && userRoutes.includes(location.pathname)) {
    NavbarComponent = UserNavbar;
  }

  return (
    <>
      <NavbarComponent /> {/* ✅ Correct Navbar renders based on role and path */}
      <Routes>
        {/* Default Route */}
        <Route path="/" element={<Home />} />

        {/* Static Pages */}
        <Route path="/about" element={<About />} />
        <Route path="/services" element={<Services />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/gallery" element={<Gallery />} />

        {/* Authentication Routes */}
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />

        {/* User Dashboard */}
        <Route
          path="/dashboard"
          element={userRole === "admin" ? <Navigate to="/admin-dashboard" /> : <Dashboard />}
        />

        {/* Admin Dashboard */}
        <Route
          path="/admin-dashboard"
          element={userRole === "admin" ? <AdminDashboard /> : <Navigate to="/dashboard" />}
        />

        {/* Admin-Only Routes */}
        {userRole === "admin" && (
          <>
            <Route path="/epin" element={<Epin />} />
            <Route path="/admin-epin-history" element={<AdminEpinHistory />} />
            <Route path="/rewards" element={<ManageAchievements />} />
            <Route path="/usertree" element={<UserTree />} />
            <Route path="/sponsors" element={<Sponsors />} /> {/* ✅ Fixed Admin Navbar Issue */}
            <Route path="/upgrade" element={<UpgradePlans />} /> ✅ Fixed Admin Navbar Issue
            <Route path="/payout" element={<AdminPayout />} /> ✅ Fixed Admin Navbar Issue
          </>
        )}

        {/* User-Only Routes */}
        {userRole === "user" && (
          <>
            <Route path="/sponsors" element={<Sponsors />} />
            <Route path="/usertree" element={<UserTree />} />
            <Route path="/wallet" element={<Wallet />} />
            <Route path="/epin-history" element={<UserEpinHistory />} />
            <Route path="/reshare" element={<ReshareEpin />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/rewardachievements" element={<RewardsAchievment />} />
            <Route path="/newregister" element={<NewRegistration />} />
            <Route path="/payoutuser" element={<UserPayout />} />
            <Route path="/walletbalance" element={<WalletBalance />} />

          </>
        )}

        {/* 404 Redirect */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </>
  );
}

export default App;
