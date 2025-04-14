import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../Components/Navbar";

const Wallet = () => {
  const [userName, setUserName] = useState("");
  const [transactions, setTransactions] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5; // Pagination: 5 records per page

  const user = JSON.parse(localStorage.getItem("user"));
  const userId = user?.user_id;

  useEffect(() => {
    if (user) {
      setUserName(user.name);
    }
    if (userId) {
      axios
        .get(`http://localhost:5000/api/commissions/${userId}`)
        .then((response) => {
          console.log("🔹 API Response:", response.data);
          setTransactions(response.data);
        })
        .catch((error) => {
          console.error("❌ Error fetching commissions:", error);
        });
    }
  }, [userId]);

  const formatCurrency = (amount) => {
    return `₹${parseFloat(amount).toLocaleString("en-IN", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}`;
  };

  // **Group transactions by `from_user_id`**
  const groupedTransactions = transactions.reduce((acc, transaction) => {
    let existingRow = acc.find(
      (row) => row.from_user_id === transaction.from_user_id
    );

    let amount = parseFloat(transaction.amount) || 0;

    if (existingRow) {
      if (transaction.type === "Auto Spill") {
        existingRow.autospill += amount;
      } else if (transaction.type === "Direct") {
        existingRow.direct += amount;
      }
      existingRow.total = existingRow.autospill + existingRow.direct;
    } else {
      acc.push({
        from_user_id: transaction.from_user_id,
        from_user_name: transaction.from_user_name,
        autospill: transaction.type === "Auto Spill" ? amount : 0,
        direct: transaction.type === "Direct" ? amount : 0,
        date: new Date(transaction.created_at).toLocaleString(),
        total: amount,
      });
    }

    return acc;
  }, []);

  // **Search Filter (Based on User ID or Name)**
  const filteredTransactions = groupedTransactions.filter((row) =>
    row.from_user_id.toString().includes(searchQuery) ||
    row.from_user_name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // **Pagination**
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentTransactions = filteredTransactions.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredTransactions.length / itemsPerPage);

  return (
    <>
      <Navbar />
      <div className="min-h-screen flex flex-col items-center bg-gray-50 p-6 pt-40">
        {/* Welcome Message */}
        <h1 className="text-4xl font-semibold text-gray-800 mb-6">
          Welcome, {userName}
        </h1>

        {/* Search Input */}
        <input
          type="text"
          placeholder="Search by User ID or Name"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="mb-4 p-3 w-full max-w-lg border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-400"
        />

        {/* Transaction Table */}
        <div className="w-full max-w-6xl bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">
            Transaction History
          </h2>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-900 text-white text-sm uppercase">
                  <th className="p-4">From User ID</th>
                  <th className="p-4">From User Name</th>
                  <th className="p-4">Autospill</th>
                  <th className="p-4">Direct</th>
                  <th className="p-4">Date</th>
                  <th className="p-4">Total</th>
                </tr>
              </thead>
              <tbody>
                {currentTransactions.length > 0 ? (
                  currentTransactions.map((row, index) => (
                    <tr
                      key={index}
                      className="bg-gray-100 hover:bg-gray-200 transition duration-200 text-gray-900 border-b"
                    >
                      <td className="p-4">{row.from_user_id}</td>
                      <td className="p-4">{row.from_user_name}</td>
                      <td className="p-4 font-semibold">
                        {formatCurrency(row.autospill)}
                      </td>
                      <td className="p-4 font-semibold">
                        {formatCurrency(row.direct)}
                      </td>
                      <td className="p-4">{row.date}</td>
                      <td className="p-4 font-bold">{formatCurrency(row.total)}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" className="text-center p-4 text-gray-500">
                      No transactions found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination Controls */}
          {totalPages > 1 && (
            <div className="flex justify-center mt-6">
              <button
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                className={`px-4 py-2 mx-1 rounded-lg ${
                  currentPage === 1
                    ? "bg-gray-300 cursor-not-allowed"
                    : "bg-gray-900 text-white hover:bg-gray-700"
                }`}
                disabled={currentPage === 1}
              >
                Prev
              </button>
              {[...Array(totalPages)].map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentPage(index + 1)}
                  className={`px-4 py-2 mx-1 rounded-lg ${
                    currentPage === index + 1
                      ? "bg-gray-900 text-white"
                      : "bg-gray-200 hover:bg-gray-300"
                  }`}
                >
                  {index + 1}
                </button>
              ))}
              <button
                onClick={() =>
                  setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                }
                className={`px-4 py-2 mx-1 rounded-lg ${
                  currentPage === totalPages
                    ? "bg-gray-300 cursor-not-allowed"
                    : "bg-gray-900 text-white hover:bg-gray-700"
                }`}
                disabled={currentPage === totalPages}
              >
                Next
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Wallet;
