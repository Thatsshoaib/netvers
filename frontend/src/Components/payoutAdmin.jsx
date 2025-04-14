import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaSearch } from "react-icons/fa";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

const USERS_PER_PAGE = 15;

const PayoutTable = () => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [payouts, setPayouts] = useState({});
  const [transactionIds, setTransactionIds] = useState({});
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const fetchAllData = async () => {
      try {
        const [incomeRes, totalsRes] = await Promise.all([
          axios.get("http://localhost:5000/api/payout/income"),
          axios.get("http://localhost:5000/api/payout/totals"),
        ]);
  
        if (incomeRes.data.success && totalsRes.data.success) {
          const incomeData = incomeRes.data.data;
          const totalsData = totalsRes.data.data;
  
          const merged = incomeData.map((user) => {
            const match = totalsData.find((t) => t.user_id === user.user_id);
            return {
              ...user,
              autospill_income: match?.autospill_commission || 0,
              direct_income: match?.direct_commission || 0,
            };
          });
  
          setUsers(merged);
          setFilteredUsers(merged);
  
          const initialPayouts = {};
          merged.forEach((user) => {
            initialPayouts[user.user_id] = user.total_income;
          });
          setPayouts(initialPayouts);
        } else {
          setError("Failed to fetch required data.");
        }
      } catch (err) {
        console.error("Error fetching payout-related data:", err);
        setError("Something went wrong while loading payout data.");
      }
    };
  
    fetchAllData();
  }, []);
  

  const handlePayAll = async () => {
    const payoutEntries = Object.entries(payouts).filter(
      ([_, amount]) => amount && !isNaN(amount) && Number(amount) > 0
    );
  
    if (payoutEntries.length === 0) {
      alert("Please enter valid payout amounts for at least one user.");
      return;
    }
  
    try {
      // Send each payout with transaction ID
      for (const [userId, amount] of payoutEntries) {
        // Ensure that each user has a valid transaction_id
        const transactionId = transactionIds[userId] || "";
  
        // Proceed if transaction ID exists
        if (!transactionId) {
          alert(`Transaction ID is missing for User ID: ${userId}`);
          return;
        }
  
        // Send the payout request
        await axios.post("http://localhost:5000/api/payout/add", {
          user_id: userId,
          amount,
                transaction_id: transactionId,
        });
      }
  
      alert("All payouts successfully processed!");
      setPayouts({});
      setTransactionIds({});
    } catch (err) {
      console.error("Error processing payouts:", err);
      alert("An error occurred during payouts. Please try again.");
    }
  };
  
  const handleSearch = (e) => {
    const value = e.target.value.toLowerCase();
    setSearchTerm(value);

    const filtered = users.filter(
      (user) =>
        user.user_name.toLowerCase().includes(value) ||
        user.user_id.toString().includes(value)
    );

    setFilteredUsers(filtered);
    setCurrentPage(1);
  };

  const exportToExcel = () => {
    const exportData = filteredUsers.map((user) => ({
      "User ID": user.user_id,
      "User Name": user.user_name,
      "Total Income (₹)": user.total_income,
      "Auto Spill Income (₹)": user.autospill_income,
      "Direct Income (₹)": user.direct_income,
      "Entered Payout (₹)": payouts[user.user_id] || "N/A",
      "Transaction ID": transactionIds[user.user_id] || "N/A",
    }));

    const worksheet = XLSX.utils.json_to_sheet(exportData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Payout Summary");

    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });

    const data = new Blob([excelBuffer], { type: "application/octet-stream" });
    saveAs(data, "payout_summary.xlsx");
  };

  const totalPages = Math.ceil(filteredUsers.length / USERS_PER_PAGE);
  const indexOfLastUser = currentPage * USERS_PER_PAGE;
  const indexOfFirstUser = indexOfLastUser - USERS_PER_PAGE;
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);

  return (
    <div className="p-6 bg-gradient-to-br from-white to-blue-50 rounded-2xl shadow-2xl w-full">
    {/* Header and Search */}
    <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 mb-8">
      <h2 className="text-3xl font-extrabold text-gray-800 tracking-tight flex items-center gap-2">
        💰 Payout Management
      </h2>
      <div className="relative w-full md:w-1/3">
        <FaSearch className="absolute top-3 left-3 text-gray-400" />
        <input
          type="text"
          value={searchTerm}
          onChange={handleSearch}
          placeholder="Search by User ID or Name"
          className="pl-10 pr-4 py-2 w-full bg-white border border-gray-300 rounded-xl shadow-sm focus:ring-2 focus:ring-blue-500 outline-none text-sm transition-all"
        />
      </div>
    </div>
  
    {/* Error Message */}
    {error && (
      <div className="mb-4 text-red-600 font-semibold text-sm bg-red-50 px-4 py-2 rounded-lg border border-red-200">
        {error}
      </div>
    )}
  
    {/* Table */}
    <div className="overflow-x-auto rounded-xl border border-gray-200 shadow-sm">
      <table className="min-w-full text-sm text-left table-auto">
        <thead className="bg-blue-100 text-blue-900 uppercase text-xs font-semibold">
          <tr>
            <th className="py-3 px-5">User ID</th>
            <th className="py-3 px-5">User Name</th>
            <th className="py-3 px-5">Total Income</th>
            <th className="py-3 px-5">Auto Spill</th>
            <th className="py-3 px-5">Direct</th>
            <th className="py-3 px-5">Payout</th>
            <th className="py-3 px-5">Transaction ID</th>
          </tr>
        </thead>
        <tbody className="bg-white text-gray-700">
          {currentUsers.length > 0 ? (
            currentUsers.map((user) => (
              <tr
                key={user.user_id}
                className="border-t hover:bg-blue-50 transition-all duration-150"
              >
                <td className="py-3 px-5">{user.user_id}</td>
                <td className="py-3 px-5 font-medium">{user.user_name}</td>
                <td className="py-3 px-5 text-green-600 font-semibold">
                  ₹{Number(user.total_income).toLocaleString()}
                </td>
                <td className="py-3 px-5 text-blue-600">
                  ₹{user.autospill_income || 0}
                </td>
                <td className="py-3 px-5 text-blue-600">
                  ₹{user.direct_income || 0}
                </td>
                <td className="py-3 px-5">
                  <input
                    type="number"
                    value={payouts[user.user_id] || ""}
                    onChange={(e) =>
                      setPayouts({
                        ...payouts,
                        [user.user_id]: e.target.value,
                      })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 text-sm outline-none transition-all"
                    placeholder="₹ Amount"
                  />
                </td>
                <td className="py-3 px-5">
                  <input
                    type="text"
                    value={transactionIds[user.user_id] || ""}
                    onChange={(e) =>
                      setTransactionIds({
                        ...transactionIds,
                        [user.user_id]: e.target.value,
                      })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 text-sm outline-none transition-all"
                    placeholder="Txn ID"
                  />
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="7" className="text-center py-6 text-gray-500">
                No matching users found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  
    {/* Footer Actions */}
    <div className="flex flex-col md:flex-row justify-between items-center mt-10 gap-6">
      {/* Buttons */}
      <div className="flex flex-wrap gap-3">
        <button
          onClick={exportToExcel}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-xl text-sm font-semibold transition-all shadow-md"
        >
          📊 Export to Excel
        </button>
        <button
          onClick={() => {
            const confirmed = window.confirm("Are you sure you want to pay all users?");
            if (confirmed) {
              handlePayAll();
            }
          }}
          className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-xl text-sm font-semibold transition-all shadow-md"
        >
          💸 Pay All Users
        </button>
      </div>

      {/* Pagination Controls */}
      <div className="flex items-center gap-3">
        <button
          disabled={currentPage === 1}
          onClick={() => setCurrentPage((prev) => prev - 1)}
          className={`px-4 py-2 rounded-lg text-sm font-medium ${
            currentPage === 1
              ? "bg-gray-200 text-gray-500 cursor-not-allowed"
              : "bg-blue-600 text-white hover:bg-blue-700"
          }`}
        >
          Prev
        </button>
        <span className="text-sm text-gray-700 font-semibold">
          Page {currentPage} of {totalPages}
        </span>
        <button
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage((prev) => prev + 1)}
          className={`px-4 py-2 rounded-lg text-sm font-medium ${
            currentPage === totalPages
              ? "bg-gray-200 text-gray-500 cursor-not-allowed"
              : "bg-blue-600 text-white hover:bg-blue-700"
          }`}
        >
          Next
        </button>
      </div>
    </div>
  </div>
  );
};

export default PayoutTable;
