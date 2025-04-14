import React, { useState, useEffect } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { FaUser, FaHashtag, FaLayerGroup, FaIdBadge } from "react-icons/fa";

function Epin() {
  const [plans, setPlans] = useState([]);
  const [selectedPlanID, setSelectedPlanID] = useState("");
  const [epinCount, setEpinCount] = useState("");
  const [assignedUser, setAssignedUser] = useState("");
  const [userName, setUserName] = useState("");
  const [message, setMessage] = useState("");
  const [epinHistory, setEpinHistory] = useState([]);

  useEffect(() => {
    const fetchPlans = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/epins/plans");
        setPlans(response.data);
      } catch (error) {
        console.error("Error fetching plans:", error);
      }
    };
    fetchPlans();
    fetchEpinHistory();
  }, []);

  const fetchUserName = async (id) => {
    if (!id) {
      setUserName("");
      return;
    }
    try {
      const response = await axios.get(`http://localhost:5000/api/epins/user/${id}`);
      setUserName(response.data.name);
    } catch (error) {
      setUserName("User not found");
    }
  };

  const fetchEpinHistory = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/epins/history");
      setEpinHistory(response.data);
    } catch (error) {
      console.error("Error fetching E-PIN history:", error);
    }
  };

  const generateEpins = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      const response = await axios.post("http://localhost:5000/api/epins/generate-epins", {
        planID: selectedPlanID,
        epinCount,
        assignedUser,
      });

      setMessage(response.data.message);
      fetchEpinHistory();
    } catch (error) {
      setMessage(error.response?.data?.error || "Something went wrong!");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 shadow-2xl p-8"
      >
        <h2 className="text-3xl font-bold text-center text-white mb-6">🔐 Generate E-PINs</h2>

        <form onSubmit={generateEpins} className="space-y-5">
          {/* Plan Selector */}
          <div className="relative">
            <FaLayerGroup className="absolute top-4 left-3 text-white opacity-70" />
            <select
              value={selectedPlanID}
              onChange={(e) => setSelectedPlanID(e.target.value)}
              required
              className="w-full pl-10 pr-4 py-3 rounded-lg bg-white/20 text-white placeholder-white/70 border border-white/30 focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              <option value="">Select Plan</option>
              {plans.map((plan) => (
                <option key={plan.plan_id} value={plan.plan_id} className="text-black">
                  {plan.plan_name}
                </option>
              ))}
            </select>
          </div>

          {/* Number of E-PINs */}
          <div className="relative">
            <FaHashtag className="absolute top-4 left-3 text-white opacity-70" />
            <input
              type="number"
              placeholder="Number of E-PINs"
              value={epinCount}
              onChange={(e) => setEpinCount(e.target.value)}
              required
              className="w-full pl-10 pr-4 py-3 rounded-lg bg-white/20 text-white placeholder-white/70 border border-white/30 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          {/* Assigned User ID */}
          <div className="relative">
            <FaIdBadge className="absolute top-4 left-3 text-white opacity-70" />
            <input
              type="number"
              placeholder="Assigned User ID"
              value={assignedUser}
              onChange={(e) => {
                setAssignedUser(e.target.value);
                fetchUserName(e.target.value);
              }}
              required
              className="w-full pl-10 pr-4 py-3 rounded-lg bg-white/20 text-white placeholder-white/70 border border-white/30 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          {/* Username Display */}
          {userName && (
            <p
              className={`text-center text-sm font-semibold ${
                userName === "User not found" ? "text-red-300" : "text-green-300"
              }`}
            >
              {userName}
            </p>
          )}

          {/* Submit Button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            className="w-full bg-gradient-to-r from-blue-600 to-indigo-500 hover:from-blue-500 hover:to-indigo-400 text-white font-semibold py-3 rounded-lg transition-all duration-300 shadow-lg"
          >
            🚀 Generate E-PINs
          </motion.button>
        </form>

        {/* Feedback Message */}
        {message && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center text-sm font-semibold text-green-300 mt-4"
          >
            {message}
          </motion.p>
        )}
      </motion.div>
    </div>
  );
}

export default Epin;
