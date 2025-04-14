import { useEffect, useState } from "react";
import axios from "axios";

const EpinPage = () => {
  const [epins, setEpins] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEpins = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get("http://localhost:5000/api/epins/user-epins", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setEpins(res.data.epins);
      } catch (error) {
        console.error("Error fetching E-PINs:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchEpins();
  }, []);

  return (
    <div className="p-4 md:p-6">
      <h2 className="text-lg md:text-2xl font-bold text-center mb-4">My Assigned E-PINs</h2>

      {loading ? (
        <p className="text-center">Loading...</p>
      ) : epins.length === 0 ? (
        <p className="text-center text-gray-500">No E-PINs assigned.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full border-collapse border border-gray-300 text-sm md:text-base">
            <thead>
              <tr className="bg-gray-200 text-gray-700">
                <th className="border p-2">E-PIN Code</th>
                <th className="border p-2">Plan</th>
                <th className="border p-2">Status</th>
              </tr>
            </thead>
            <tbody>
              {epins.map((epin) => (
                <tr key={epin.id} className="text-center hover:bg-gray-100">
                  <td className="border p-2 break-all">{epin.epin_code}</td>
                  <td className="border p-2">{epin.plan_name}</td>
                  <td className={`border p-2 font-semibold ${epin.status === "used" ? "text-red-500" : "text-green-500"}`}>
                    {epin.status.toUpperCase()}
                  </td>
                </tr>
              ))} 
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default EpinPage;
