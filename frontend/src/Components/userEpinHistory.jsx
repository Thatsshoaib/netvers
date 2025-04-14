import { useEffect, useState } from "react";
import axios from "axios";
import { BadgeCheck, Ban } from "lucide-react";

const UserEpinHistory = () => {
  const [epins, setEpins] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const epinsPerPage = 5; // Adjust how many E-PINs to show per page

  const userID = localStorage.getItem("user_id");

  useEffect(() => {
    if (!userID) {
      console.error("User ID not found in localStorage");
      return;
    }

    axios
      .get(`http://localhost:5000/api/epins/user-epins/${userID}`)
      .then((response) => {
        setEpins(response.data);
      })
      .catch((error) => {
        console.error("Error fetching E-PINs:", error.response?.data || error.message);
      });
  }, [userID]);

  // Pagination Logic
  const indexOfLastEpin = currentPage * epinsPerPage;
  const indexOfFirstEpin = indexOfLastEpin - epinsPerPage;
  const currentEpins = epins.slice(indexOfFirstEpin, indexOfLastEpin);
  const totalPages = Math.ceil(epins.length / epinsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 pt-50">
      <div className="bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl shadow-lg text-white text-center py-5 mb-8">
        <h2 className="text-3xl font-bold flex items-center justify-center gap-2">
          🎫 Your Assigned E-PINs
        </h2>
        <p className="text-sm mt-1 opacity-90">All E-PINs assigned to your account are listed below.</p>
      </div>

      {epins.length > 0 ? (
        <>
          <div className="overflow-x-auto rounded-xl shadow-lg bg-white bg-opacity-90 backdrop-blur-sm">
            <table className="min-w-full text-sm md:text-base rounded-xl overflow-hidden">
              <thead className="bg-blue-100 text-blue-800 font-semibold">
                <tr>
                  <th className="px-6 py-4 text-left border-b">Plan Name</th>
                  <th className="px-6 py-4 text-left border-b">E-PIN Code</th>
                  <th className="px-6 py-4 text-left border-b">Status</th>
                </tr>
              </thead>
              <tbody>
                {currentEpins.map((epin, index) => (
                  <tr
                    key={index}
                    className="hover:bg-blue-50 transition-all duration-200"
                  >
                    <td className="px-6 py-4 text-gray-700 border-b capitalize">
                      {epin.plan_name}
                    </td>
                    <td className="px-6 py-4 text-gray-600 border-b break-all font-mono">
                      {epin.epin_code}
                    </td>
                    <td className="px-6 py-4 border-b">
                      <span
                        className={`inline-flex items-center gap-2 px-4 py-1 rounded-full text-xs font-semibold tracking-wide shadow-sm ${
                          epin.status === "unused"
                            ? "bg-green-100 text-green-600"
                            : "bg-red-100 text-red-600"
                        }`}
                      >
                        <BadgeCheck className="w-4 h-4" />
                        {epin.status.toUpperCase()}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination Controls */}
          <div className="flex justify-center mt-6 space-x-2">
            <button
              onClick={() => paginate(currentPage - 1)}
              disabled={currentPage === 1}
              className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
            >
              Previous
            </button>

            {[...Array(totalPages)].map((_, index) => (
              <button
                key={index + 1}
                onClick={() => paginate(index + 1)}
                className={`px-4 py-2 rounded ${
                  currentPage === index + 1
                    ? "bg-blue-600 text-white"
                    : "bg-gray-200 hover:bg-gray-300"
                }`}
              >
                {index + 1}
              </button>
            ))}

            <button
              onClick={() => paginate(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </>
      ) : (
        <div className="text-center text-gray-500 mt-12">
          <Ban className="w-12 h-12 mx-auto mb-4 text-red-400" />
          <p className="text-lg font-medium">No E-PINs assigned yet.</p>
        </div>
      )}
    </div>
  );
};

export default UserEpinHistory;
