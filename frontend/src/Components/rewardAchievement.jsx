import React, { useEffect, useState } from "react";
import axios from "axios";

const UserRewards = () => {
    const [rewards, setRewards] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const userId = localStorage.getItem("user_id");
        console.log("Fetched user_id:", userId);
    
        if (!userId) {
            setError("User ID not found in local storage.");
            setLoading(false);
            return;
        }
    
        const fetchRewards = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/rewards/user-rewards/${userId}`);
                console.log("Raw API Response:", response.data);
        
                const formattedData = Array.isArray(response.data) ? response.data : [];
        
                console.log("Formatted Data Before Setting State:", formattedData);
                setRewards([...formattedData]);
            } catch (err) {
                console.error("Error fetching rewards:", err);
                setError("Failed to load rewards.");
            } finally {
                setLoading(false);
            }
        };
    
        fetchRewards();
    }, []);
    
    if (loading) return <p className="text-center text-lg font-semibold text-blue-600 animate-pulse">Loading rewards...</p>;
    if (error) return <p className="text-center text-lg font-semibold text-red-600">{error}</p>;

    return (
        <div className="container mx-auto p-6 pt-60">
            <h2 className="text-3xl font-bold text-center mb-6 text-gray-800 uppercase tracking-wide">🎉 User Rewards</h2>

            {rewards.length === 0 ? (
                <p className="text-center text-gray-600">No rewards found.</p>
            ) : (
                <div className="overflow-x-auto">
                    <table className="w-full table-auto border-collapse shadow-lg rounded-lg overflow-hidden">
                        <thead className="bg-gradient-to-r from-blue-500 to-blue-700 text-white">
                            <tr className="uppercase tracking-wide text-sm">
                                <th className="px-5 py-3 border border-gray-200">Title</th>
                                <th className="px-5 py-3 border border-gray-200">Step ID</th>
                                <th className="px-5 py-3 border border-gray-200">Directs</th>
                                <th className="px-5 py-3 border border-gray-200">Description</th>
                                <th className="px-5 py-3 border border-gray-200">Image</th>
                                <th className="px-5 py-3 border border-gray-200">Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {rewards.map((reward, index) => (
                                <tr key={index} className={`transition hover:bg-gray-100 ${index % 2 === 0 ? "bg-gray-50" : "bg-white"}`}>
                                    <td className="px-5 py-3 border border-gray-200 text-center font-medium">{reward.title}</td>
                                    <td className="px-5 py-3 border border-gray-200 text-center">{reward.step_id}</td>
                                    <td className="px-5 py-3 border border-gray-200 text-center font-semibold text-blue-600">{reward.no_of_directs}</td>
                                    <td className="px-5 py-3 border border-gray-200 text-center">{reward.description}</td>
                                    <td className="px-5 py-3 border border-gray-200 text-center">
                                        <img src={reward.image} alt={reward.title} className="w-14 h-14 object-cover mx-auto rounded-full shadow-md border-2 border-gray-300" />
                                    </td>
                                    <td className="px-5 py-3 border border-gray-200 text-center font-semibold">
                                        <span className={`px-3 py-1 rounded-full text-white ${reward.status === "Completed" ? "bg-green-500" : "bg-yellow-500"}`}>
                                            {reward.status}
                                        </span>
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

export default UserRewards;
