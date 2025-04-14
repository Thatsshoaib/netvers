import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "../Components/Navbar";
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";

const ReshareEpin = () => {
  const [epinCode, setEpinCode] = useState("");
  const [senderId, setSenderId] = useState("");
  const [receiverId, setReceiverId] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (userData) {
      const parsedUser = JSON.parse(userData);
      if (parsedUser.user_id) {
        setSenderId(parsedUser.user_id);
      } else {
        console.warn("⚠️ user_id not found in localStorage!");
      }
    }
  }, []);

  const handleReshare = async (e) => {
    e.preventDefault();

    if (!epinCode || !senderId || !receiverId) {
      setMessage("All fields are required!");
      return;
    }

    const isConfirmed = window.confirm(
      `📢 Share E-PIN: ${epinCode} to User ID: ${receiverId}?\nClick OK to confirm.`
    );

    if (!isConfirmed) {
      setMessage("❌ E-PIN sharing cancelled.");
      return;
    }

    try {
      const response = await axios.post("http://localhost:5000/api/epins/reshare-epin", {
        epin_code: epinCode,
        sender_id: senderId,
        receiver_id: receiverId,
      });

      setMessage(`✅ 1 E-PIN successfully shared to User ID: ${receiverId}`);
      setEpinCode("");
      setReceiverId("");
    } catch (error) {
      setMessage(error.response?.data?.error || "Something went wrong!");
    }
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-600 flex items-center justify-center px-4 pt-50">
        <div className="w-full max-w-xl bg-white/10 backdrop-blur-md rounded-2xl p-8 shadow-xl border border-white/20">
          <h2 className="text-3xl font-bold text-white text-center mb-8">
            Reshare <span className="text-indigo-400">E-PIN</span>
          </h2>
          <form onSubmit={handleReshare} className="space-y-6">
            <div>
              <label className="text-white font-medium block mb-2">E-PIN Code</label>
              <input
                type="text"
                value={epinCode}
                onChange={(e) => setEpinCode(e.target.value)}
                placeholder="Enter E-PIN code"
                className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                required
              />
            </div>

            <div>
              <label className="text-white font-medium block mb-2">Sender ID</label>
              <input
                type="text"
                value={senderId || "Fetching..."}
                disabled
                readOnly
                className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-gray-400 cursor-not-allowed"
              />
            </div>

            <div>
              <label className="text-white font-medium block mb-2">Receiver ID</label>
              <input
                type="number"
                value={receiverId}
                onChange={(e) => setReceiverId(e.target.value)}
                placeholder="Enter Receiver's User ID"
                className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-xl transition-all shadow-md hover:shadow-lg"
            >
              Reshare E-PIN
            </button>
          </form>

          {message && (
            <div className="mt-6 text-center">
              {message.includes("✅") ? (
                <p className="text-green-400 flex justify-center items-center gap-2 text-lg font-medium">
                  <FaCheckCircle />
                  {message}
                </p>
              ) : (
                <p className="text-red-400 flex justify-center items-center gap-2 text-lg font-medium">
                  <FaTimesCircle />
                  {message}
                </p>
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default ReshareEpin;
