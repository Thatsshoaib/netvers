import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaMoneyBillWave, FaCheckCircle } from "react-icons/fa";

const UserPayoutPage = () => {
  const [userId, setUserId] = useState(null);
  const [totalPayout, setTotalPayout] = useState(0);
  const [payouts, setPayouts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser?.user_id) {
      setUserId(storedUser.user_id);
    } else {
      setError("User not found. Please log in again.");
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const fetchPayoutData = async () => {
      if (!userId) return;
      try {
        const res = await axios.get(`http://localhost:5000/api/payout/user/${userId}`);
        setTotalPayout(res.data?.total || 0);
        setPayouts(res.data?.history || []);
      } catch (err) {
        console.error(err);
        setError("Failed to fetch payout data.");
      } finally {
        setLoading(false);
      }
    };
    fetchPayoutData();
  }, [userId]);

  return (
    <div className=" max-w-5xl mx-auto p-6 sm:p-10 mt-12 bg-white rounded-3xl shadow-2xl animate-fade-in ">
      <h1 className="text-4xl font-bold text-center text-gray-800 mb-10 tracking-tight">
        💰 Payout Summary
      </h1>

      {loading ? (
        <p className="text-gray-600 text-center text-lg animate-pulse">Fetching payout history...</p>
      ) : error ? (
        <p className="text-red-600 text-center text-lg">{error}</p>
      ) : (
        <>
          <div className="flex items-center justify-center gap-3 mb-8 text-2xl font-semibold text-green-600">
            <FaMoneyBillWave className="text-3xl" />
            <span>Total Earned: <span className="font-bold text-green-700">₹{totalPayout}</span></span>
          </div>

          <div className="overflow-x-auto rounded-xl shadow-md border border-gray-200">
            <table className="min-w-full divide-y divide-gray-200 text-sm text-left">
              <thead className="bg-gray-100 text-gray-700 text-xs uppercase tracking-wider">
                <tr>
                  <th className="px-6 py-4">#</th>
                  <th className="px-6 py-4">Amount</th>
                  <th className="px-6 py-4">Transaction_id</th>
                  <th className="px-6 py-4">Date</th>
                  <th className="px-6 py-4">Status</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-100">
                {payouts.length === 0 ? (
                  <tr>
                    <td colSpan="5" className="text-center py-8 text-gray-500">
                      No payouts received yet.
                    </td>
                  </tr>
                ) : (
                  payouts.map((payout, index) => (
                    <tr
                      key={payout.id}
                      className="hover:bg-gray-50 transition-all duration-150 ease-in-out"
                    >
                      <td className="px-6 py-4 font-medium text-gray-700">{index + 1}</td>
                      <td className="px-6 py-4 text-green-700 font-semibold">₹{payout.amount}</td>
                      <td className="px-6 py-4 text-gray-600">{payout.transaction_id || "-"}</td>
                      <td className="px-6 py-4 text-gray-600">
                        {new Date(payout.payout_date).toLocaleString()}
                      </td>
                      <td className="px-6 py-4">
                        <span className="inline-flex items-center gap-2 text-green-700 bg-green-100 px-3 py-1 rounded-full text-xs font-semibold">
                          <FaCheckCircle className="text-green-500" />
                          Received
                        </span>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
};

export default UserPayoutPage;
