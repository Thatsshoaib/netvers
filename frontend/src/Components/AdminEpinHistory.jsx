import { useEffect, useState } from "react";
import {
  FaAngleLeft,
  FaAngleRight,
  FaCheckCircle,
  FaTimesCircle,
  FaUser,
  FaHashtag,
  FaCalendarAlt,
  FaClipboardList,
} from "react-icons/fa";
import { Tooltip } from "react-tooltip";

const AdminEpinHistory = () => {
  const [epins, setEpins] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const epinsPerPage = 10;

  useEffect(() => {
    fetch("http://localhost:5000/api/epins/history")
      .then((res) => {
        if (!res.ok) throw new Error(`Failed to fetch: ${res.statusText}`);
        return res.json();
      })
      .then((data) => setEpins(data))
      .catch((err) => console.error("Error fetching E-PIN history:", err));
  }, []);

  const totalPages = Math.ceil(epins.length / epinsPerPage);
  const indexOfLastEpin = currentPage * epinsPerPage;
  const indexOfFirstEpin = indexOfLastEpin - epinsPerPage;
  const currentEpins = epins.slice(indexOfFirstEpin, indexOfLastEpin);

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-gray-100 to-blue-50 p-4 md:p-6">
      <div className="bg-white shadow-xl rounded-2xl p-6 md:p-8 border">
        <h2 className="text-3xl font-bold text-blue-700 mb-8 text-center drop-shadow-sm">
          📜 E-PIN History
        </h2>

        <div className="overflow-x-auto rounded-lg">
          <table className="min-w-full table-auto border-collapse text-sm md:text-base">
            <thead>
              <tr className="bg-blue-600 text-white text-left">
                <th className="px-4 py-3 border-b border-blue-500 hover:bg-blue-700 transition-all">
                  <FaHashtag className="inline mr-2" /> ID
                </th>
                <th className="px-4 py-3 border-b border-blue-500 hover:bg-blue-700 transition-all">
                  🔑 E-PIN
                </th>
                <th className="px-4 py-3 border-b border-blue-500 hover:bg-blue-700 transition-all">
                  📌 Status
                </th>
                <th className="px-4 py-3 border-b border-blue-500 hover:bg-blue-700 transition-all">
                  <FaUser className="inline mr-2" /> Assigned To
                </th>
                <th className="px-4 py-3 border-b border-blue-500 hover:bg-blue-700 transition-all">
                  <FaCalendarAlt className="inline mr-2" /> Created At
                </th>
                <th className="px-4 py-3 border-b border-blue-500 hover:bg-blue-700 transition-all">
                  <FaClipboardList className="inline mr-2" /> Plan ID
                </th>
              </tr>
            </thead>
            <tbody>
              {currentEpins.length > 0 ? (
                currentEpins.map((epin) => (
                  <tr
                    key={epin.id}
                    className="hover:bg-blue-50 border-b border-gray-200 transition-all text-center"
                  >
                    <td className="px-4 py-3">{epin.id}</td>
                    <td className="px-4 py-3 break-all font-mono text-blue-700">{epin.epin_code}</td>
                    <td className="px-4 py-3">
                      <span
                        className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-semibold ${
                          epin.status === "used"
                            ? "bg-red-100 text-red-600"
                            : "bg-green-100 text-green-600"
                        }`}
                      >
                        {epin.status === "used" ? (
                          <>
                            <FaTimesCircle /> Used
                          </>
                        ) : (
                          <>
                            <FaCheckCircle /> Unused
                          </>
                        )}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      {epin.assigned_to || (
                        <span className="italic text-gray-500">Not Assigned</span>
                      )}
                    </td>
                    <td className="px-4 py-3">{new Date(epin.created_at).toLocaleString()}</td>
                    <td className="px-4 py-3">{epin.plan_id}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="p-6 text-center text-gray-600">
                    No E-PINs found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {epins.length > epinsPerPage && (
          <div className="flex justify-center items-center mt-8 gap-4">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="px-4 py-2 bg-blue-500 text-white rounded-lg flex items-center gap-2 shadow-md hover:bg-blue-600 transition disabled:bg-gray-300"
            >
              <FaAngleLeft /> Prev
            </button>
            <span className="text-gray-700 font-semibold">
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={() =>
                setCurrentPage((prev) => (prev < totalPages ? prev + 1 : prev))
              }
              disabled={currentPage >= totalPages}
              className="px-4 py-2 bg-blue-500 text-white rounded-lg flex items-center gap-2 shadow-md hover:bg-blue-600 transition disabled:bg-gray-300"
            >
              Next <FaAngleRight />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminEpinHistory;
