import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  FaUserCircle,
  FaEnvelope,
  FaIdBadge,
  FaClipboard,
  FaClipboardCheck,
  FaUsers,
  FaMoneyBillWave,
  FaChartLine,
  FaWallet,
  FaStar,
  FaMedal,
  FaGem,
  FaTrophy,
} from "react-icons/fa";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import { Tooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [copied, setCopied] = useState(false);
  const [stats, setStats] = useState({
    totalDirects: 0,
    totalIncome: 0,
    autoSpillIncome: 0,
    directIncome: 0,
  });

  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        const userData = JSON.parse(storedUser);
        if (userData?.user_id) {
          setUser(userData);
          fetchAllData(userData.user_id);
        } else {
          navigate("/login");
        }
      } catch {
        navigate("/login");
      }
    } else {
      navigate("/login");
    }
  }, [navigate]);

  const fetchAllData = async (userId) => {
    try {
      const [directsRes, incomeRes, autoSpillRes, directIncomeRes] =
        await Promise.all([
          axios.get(`http://localhost:5000/api/users/directs?userId=${userId}`),
          axios.get(`http://localhost:5000/api/users/income?userId=${userId}`),
          axios.get(`http://localhost:5000/api/commissions/autospill/${userId}`),
          axios.get(`http://localhost:5000/api/commissions/direct/${userId}`),
        ]);

      setStats({
        totalDirects: directsRes.data?.total_directs || 0,
        totalIncome: incomeRes.data?.total_income || 0,
        autoSpillIncome: autoSpillRes.data?.total_auto_spill || 0,
        directIncome: directIncomeRes.data?.total_direct || 0,
      });
    } catch (error) {
      console.error("Dashboard data error:", error);
    }
  };
  

  const handleCopy = () => {
    if (!user?.user_id) return;
    navigator.clipboard.writeText(`00${user.user_id}`).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  if (!user) {
    return (
      <div className="flex justify-center items-center h-screen bg-slate-100">
        <p className="text-lg font-medium text-gray-700 animate-pulse">Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 to-slate-200 p-6 pt-50">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-8">
        {/* LEFT: Profile & Stats */}
        <div className="flex flex-col gap-6 w-full lg:w-1/2">
          {/* Profile Card */}
          <div className="bg-white rounded-3xl shadow-xl border border-slate-200 p-6 flex flex-col items-center text-center">
            <div className="bg-gradient-to-r from-emerald-500 to-teal-600 rounded-full p-2 shadow-md">
              <FaUserCircle size={80} className="text-white" />
            </div>
            <h2 className="text-2xl font-bold mt-4">{user.name}</h2>
            <div className="flex items-center gap-2 text-gray-500 mt-1">
              <FaEnvelope />
              <p>{user.email}</p>
            </div>
            <div className="mt-3 flex items-center gap-2">
              <FaIdBadge className="text-emerald-500" />
              <span className="font-semibold text-gray-700">Sponsor ID:</span>
              <span className="bg-gray-100 px-3 py-1 rounded-lg font-mono border border-emerald-300 text-emerald-600">
                00{user.user_id}
              </span>
              <button onClick={handleCopy} className="text-emerald-600 hover:text-emerald-800">
                {copied ? <FaClipboardCheck /> : <FaClipboard />}
              </button>
            </div>
            {copied && <p className="text-sm text-green-500 mt-1">Copied!</p>}
            <div className="mt-4 bg-gray-100 px-4 py-1 rounded-lg text-sm flex items-center gap-2">
              <FaIdBadge className="text-yellow-500" />
              Plan: <span className="font-bold text-yellow-600">{user.plan_name || "N/A"}</span>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              {
                label: "Total Directs",
                value: stats.totalDirects,
                color: "bg-blue-100 text-blue-700",
                icon: <FaUsers className="text-xl" />,
              },
              {
                label: "Direct Commission",
                value: `₹${stats.directIncome}`,
                color: "bg-green-100 text-green-700",
                icon: <FaMoneyBillWave className="text-xl" />,
              },
              {
                label: "Auto Spill Income",
                value: `₹${stats.autoSpillIncome}`,
                color: "bg-gray-200 text-gray-700",
                icon: <FaChartLine className="text-xl" />,
              },
              {
                label: "Total Income",
                value: `₹${stats.totalIncome}`,
                color: "bg-indigo-100 text-indigo-700",
                icon: <FaWallet className="text-xl" />,
              },
            ].map((item, idx) => (
              <div
                key={idx}
                className={`rounded-xl p-5 shadow-md flex items-center justify-between hover:scale-105 transition-all duration-300 ${item.color}`}
              >
                <div>{item.icon}</div>
                <div className="text-right">
                  <p className="text-sm font-medium">{item.label}</p>
                  <h4 className="text-lg font-bold">{item.value}</h4>
                </div>
              </div>
            ))}
          </div>
        </div>
   {/* RIGHT: Plan Cards + Image Carousel */}
<div className="w-full lg:w-1/2 flex flex-col gap-6">
  {/* Plan Carousel */}
  <div className="relative">
  {/* 📱 Mobile swipe indicator */}
  <p className="text-center text-sm text-gray-600 mt-2 md:hidden animate-pulse">
    Swipe to explore plans →
  </p>

  <Slider
    dots={true}
    infinite={true}
    speed={500}
    slidesToShow={3}
    slidesToScroll={1}
    autoplay
    autoplaySpeed={2000}
    responsive={[
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
        },
      },
    ]}
  >
    {[
      { name: "Star", price: "₹2,000", color: "from-yellow-400 to-yellow-500", icon: <FaStar className="text-yellow-900 text-3xl" />, details: "Great for beginners!" },
      { name: "Bronze", price: "₹5,000", color: "from-orange-500 to-orange-600", icon: <FaMedal className="text-orange-900 text-3xl" />, details: "Includes basic bonuses." },
      { name: "Silver", price: "₹10,000", color: "from-gray-500 to-gray-600", icon: <FaMedal className="text-gray-900 text-3xl" />, details: "Unlocks more commission levels." },
      { name: "Gold", price: "₹25,000", color: "from-yellow-500 to-yellow-600", icon: <FaTrophy className="text-yellow-900 text-3xl" />, details: "Most popular plan!" },
      { name: "Diamond", price: "₹50,000", color: "from-blue-500 to-blue-600", icon: <FaGem className="text-blue-900 text-3xl" />, details: "Get high-tier payouts." },
      { name: "Platinum", price: "₹1,00,000", color: "from-gray-900 to-gray-800", icon: <FaGem className="text-gray-300 text-3xl" />, details: "Top-tier unlimited plan." },
    ].map((plan, idx) => (
      <div key={idx} className="px-2">
        {/* 🔥 Shiny border wrapper */}
        <div className="relative p-[2px] rounded-2xl bg-gradient-to-br from-white via-transparent to-[rgba(255,255,255,0.2)] hover:from-blue-400 hover:to-purple-600 transition-all duration-300 shadow-xl group">
          <div
            className={`bg-gradient-to-br ${plan.color} text-white p-6 rounded-2xl text-center flex flex-col items-center gap-3 transition-all transform hover:scale-105 relative`}
            data-tooltip-id={`tooltip-${idx}`}
          >
            {/* Plan icon */}
            <div className="bg-white p-3 rounded-full shadow">{plan.icon}</div>

            {/* Plan name */}
            <h3 className="text-xl font-bold">{plan.name}</h3>

            {/* Plan price */}
            <p className="text-lg font-semibold">{plan.price}</p>

            {/* ✅ CTA Button */}
            <button className="mt-3 bg-white text-black font-medium px-4 py-2 rounded-full hover:bg-gray-200 transition duration-300">
              Select Plan
            </button>
          </div>

          {/* 💬 Tooltip for details */}
          <Tooltip id={`tooltip-${idx}`} place="top" content={plan.details} />
        </div>
      </div>
    ))}
  </Slider>
</div>

 {/* Image Carousel */}
<div className="w-full pt-8 px-4 sm:px-6 lg:px-8">
  <Slider
    dots={true}
    infinite={true}
    speed={500}
    slidesToShow={1}
    slidesToScroll={1}
    autoplay
    autoplaySpeed={2000}
    className="rounded-xl overflow-hidden shadow-lg"
  >
    {[
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTCYO-X9I4HPWVwhXMLUox6PP2vMN1s3NKkAQ&s",
      "https://akm-img-a-in.tosshub.com/businesstoday/images/story/202203/pics003_1-sixteen_nine.jpg?size=948:533",
      "https://rightchoiceawards.com/img/slider/raveen-giving-awards-1920x930px.jpg",
    ].map((url, idx) => (
      <div key={idx}>
        <img
          src={url}
          alt={`Slide ${idx + 1}`}
          className="w-full h-40 sm:h-48 md:h-56 lg:h-60 object-cover rounded-xl"
        />
      </div>
    ))}
  </Slider>
</div>

</div>



   

      </div>
    </div>
  );
};

export default Dashboard;
