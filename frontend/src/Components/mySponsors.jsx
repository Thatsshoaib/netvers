import React, { useEffect, useState } from "react";
import axios from "axios";

const Sponsors = () => {
  const [sponsors, setSponsors] = useState([]);
  const [filteredSponsors, setFilteredSponsors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 5;

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (!storedUser || !storedUser.user_id) {
      setError("User not logged in. Please log in to view sponsors.");
      setLoading(false);
      return;
    }

    const fetchSponsors = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/users/sponsors?userId=${storedUser.user_id}`
        );
        setSponsors(response.data);
        setFilteredSponsors(response.data);
      } catch (err) {
        setError("Failed to fetch sponsors. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchSponsors();
  }, []);

  useEffect(() => {
    const filtered = sponsors.filter((sponsor) =>
      sponsor.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredSponsors(filtered);
    setCurrentPage(1);
  }, [searchQuery, sponsors]);

  const lastIndex = currentPage * recordsPerPage;
  const firstIndex = lastIndex - recordsPerPage;
  const currentRecords = filteredSponsors.slice(firstIndex, lastIndex);
  const totalPages = Math.ceil(filteredSponsors.length / recordsPerPage);

  if (loading)
    return <p className="text-center text-gray-600 mt-20">Loading sponsors...</p>;
  if (error)
    return <p className="text-center text-red-500 mt-20">{error}</p>;

  return (
    <div className="w-full max-w-6xl mx-auto px-4 pt-28 pb-10">
      <div className="bg-white shadow-xl rounded-2xl p-6 sm:p-10">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
          👥 My Sponsors
        </h2>

        <div className="flex justify-center mb-6">
          <input
            type="text"
            placeholder="🔍 Search by Name"
            className="w-full max-w-md px-4 py-3 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="overflow-x-auto rounded-xl border border-gray-200">
          <table className="min-w-full text-sm sm:text-base text-left">
            <thead className="bg-blue-700 text-white uppercase tracking-wider">
              <tr>
                <th className="px-6 py-4">User ID</th>
                <th className="px-6 py-4">Name</th>
                <th className="px-6 py-4">Email</th>
                <th className="px-6 py-4">Phone</th>
                <th className="px-6 py-4">Plan</th>
                <th className="px-6 py-4">Joining Date</th>
              </tr>
            </thead>
            <tbody>
              {currentRecords.map((sponsor, index) => (
                <tr
                  key={index}
                  className="border-b hover:bg-gray-50 transition duration-200"
                >
                  <td className="px-6 py-4 font-semibold text-gray-700">
                    {sponsor.user_id}
                  </td>
                  <td className="px-6 py-4">{sponsor.name}</td>
                  <td className="px-6 py-4">{sponsor.email}</td>
                  <td className="px-6 py-4">{sponsor.phone}</td>
                  <td className="px-6 py-4 font-semibold text-blue-700">
                    {sponsor.plan_id}
                  </td>
                  <td className="px-6 py-4 text-gray-600">
                    {new Date(sponsor.created_at).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {totalPages > 1 && (
          <div className="flex justify-center items-center gap-4 mt-8">
            <button
              className={`px-4 py-2 rounded-lg transition ${
                currentPage === 1
                  ? "bg-gray-300 text-gray-600 cursor-not-allowed"
                  : "bg-blue-600 text-white hover:bg-blue-700"
              }`}
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
            >
              ⬅ Prev
            </button>

            <span className="text-gray-700 font-semibold">
              Page {currentPage} of {totalPages}
            </span>

            <button
              className={`px-4 py-2 rounded-lg transition ${
                currentPage === totalPages
                  ? "bg-gray-300 text-gray-600 cursor-not-allowed"
                  : "bg-blue-600 text-white hover:bg-blue-700"
              }`}
              onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
            >
              Next ➡
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Sponsors;
