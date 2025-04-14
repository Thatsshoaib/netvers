import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  FaWallet,
  FaMoneyBillWave,
  FaChartLine,
  FaArrowCircleRight,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const WalletPage = () => {
  const [stats, setStats] = useState({
    totalIncome: 0,
    autoSpillIncome: 0,
    directIncome: 0,
    walletBalance: 0,
  });

  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        const userData = JSON.parse(storedUser);
        if (userData?.user_id) {
          fetchWalletData(userData.user_id);
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

  const fetchWalletData = async (userId) => {
    try {
      const [
        totalIncomeRes,
        autoSpillIncomeRes,
        directIncomeRes,
        walletBalanceRes,
      ] = await Promise.all([
        axios.get(
          `http://localhost:5000/api/users/total-income?userId=${userId}`
        ),
        axios.get(`http://localhost:5000/api/commissions/autospill/${userId}`),
        axios.get(`http://localhost:5000/api/commissions/direct/${userId}`),
        axios.get(
          `http://localhost:5000/api/payout/wallet-balance?userId=${userId}`
        ),
      ]);

      setStats({
        totalIncome: totalIncomeRes.data?.total_income || 0,
        autoSpillIncome: autoSpillIncomeRes.data?.total_auto_spill || 0,
        directIncome: directIncomeRes.data?.total_direct || 0,
        walletBalance: walletBalanceRes.data?.wallet_balance || 0,
      });
    } catch (error) {
      console.error("Error fetching wallet data:", error);
    }
  };

  const statCards = [
    {
      label: "Total Income",
      value: `₹${stats.totalIncome}`,
      icon: <FaMoneyBillWave className="text-3xl text-green-600" />,
      bg: "from-green-100 to-green-200",
    },
    {
      label: "Direct Income",
      value: `₹${stats.directIncome}`,
      icon: <FaChartLine className="text-3xl text-blue-600" />,
      bg: "from-blue-100 to-blue-200",
    },
    {
      label: "Auto Spill Income",
      value: `₹${stats.autoSpillIncome}`,
      icon: <FaArrowCircleRight className="text-3xl text-yellow-600" />,
      bg: "from-yellow-100 to-yellow-200",
    },
    {
      label: "Wallet Balance",
      value: `₹${stats.walletBalance}`,
      icon: <FaWallet className="text-3xl text-purple-600" />,
      bg: "from-purple-100 to-purple-200",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 to-slate-200 p-6 pt-50">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl p-8 flex flex-col gap-8">
          <h2 className="text-4xl font-extrabold text-center text-gray-800 mb-2 tracking-tight">
            💼 My Wallet
          </h2>
          <p className="text-center text-gray-500 mb-6">
            Track your earnings and wallet performance here.
          </p>

          {/* Wallet Stats Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {statCards.map((item, idx) => (
              <div
                key={idx}
                className={`bg-gradient-to-br ${item.bg} p-6 rounded-xl shadow-lg hover:shadow-2xl transition-transform transform hover:scale-105`}
              >
                <div className="flex items-center gap-4">
                  <div className="bg-white p-3 rounded-full shadow">
                    {item.icon}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-600">
                      {item.label}
                    </p>
                    <h4 className="text-2xl font-bold text-gray-800">
                      {item.value}
                    </h4>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Transaction Button */}
          <div className="flex justify-end mt-4">
            <button
              onClick={() => navigate("/payoutuser")}
              className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-full shadow-lg transition-all duration-300"
            >
              <FaArrowCircleRight className="text-lg" />
              <span className="font-medium">View Transactions</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WalletPage;
