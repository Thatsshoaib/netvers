import { useState, useEffect } from "react";
import axios from "axios";

const Rewards = () => {
  const [rewards, setRewards] = useState([]);
  const [plans, setPlans] = useState([]);
  const [formData, setFormData] = useState({
    plan_id: "",
    no_of_directs: "",
    title: "",
    image: "",
    description: "",
  });

  // ✅ Fetch Plans on Mount
  useEffect(() => {
    axios
      .get("http://localhost:5000/api/epins/plans")
      .then((res) => {
        setPlans(res.data); // ✅ Fixed here
        console.log("Plans Data:", res.data);
      })
      .catch((error) => console.error("Error fetching plans:", error));
  }, []);

  // Fetch Rewards on Mount
  useEffect(() => {
    const fetchRewards = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/rewards/all");
        if (res.data.success) setRewards(res.data.data);
      } catch (error) {
        console.error("Error fetching rewards:", error);
      }
    };

    fetchRewards();
  }, []);

  // Handle Input Change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Add Reward
  const addReward = async () => {
    try {
      await axios.post("http://localhost:5000/api/rewards/add", formData);
      setFormData({
        plan_id: "",
        no_of_directs: "",
        title: "",
        image: "",
        description: "",
      });
      // Refresh rewards after adding a new one
      const res = await axios.get("http://localhost:5000/api/rewards/all");
      if (res.data.success) setRewards(res.data.data);
    } catch (error) {
      console.error("Error adding reward:", error);
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">Manage Rewards</h2>

      {/* Form to Add Reward */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <select
          name="plan_id"
          value={formData.plan_id}
          className="w-full p-3 mb-4 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 outline-none transition"
          onChange={handleChange}
          required
        >
          <option value="">Select a Plan</option>
          {plans.map((plan) => (
            <option key={plan.plan_id} value={plan.plan_id}>
              {plan.plan_name}
            </option>
          ))}
        </select>

        <input
          type="text"
          name="no_of_directs"
          placeholder="No. of Directs"
          value={formData.no_of_directs}
          onChange={handleChange}
          className="p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
        <input
          type="text"
          name="title"
          placeholder="Title"
          value={formData.title}
          onChange={handleChange}
          className="p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
        <input
          type="text"
          name="image"
          placeholder="Image URL"
          value={formData.image}
          onChange={handleChange}
          className="p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
        <textarea
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleChange}
          className="p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 md:col-span-2"
        ></textarea>
        <button
          onClick={addReward}
          className="col-span-1 md:col-span-2 py-3 bg-indigo-600 text-white rounded-lg shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          Add Reward
        </button>
      </div>

      {/* Table displaying the rewards */}
      <div className="overflow-x-auto">
        <table className="min-w-full table-auto bg-white shadow-lg rounded-lg">
          <thead className="bg-indigo-600 text-white">
            <tr>
              <th className="px-6 py-3 text-left">ID</th>
              <th className="px-6 py-3 text-left">Plan</th>
              <th className="px-6 py-3 text-left">Directs</th>
              <th className="px-6 py-3 text-left">Title</th>
              <th className="px-6 py-3 text-left">Image</th>
              <th className="px-6 py-3 text-left">Description</th>
            </tr>
          </thead>
          <tbody>
            {rewards.map((reward) => (
              <tr key={reward.id} className="border-b hover:bg-gray-100">
                <td className="px-6 py-4 text-gray-700">{reward.id}</td>
                <td className="px-6 py-4 text-gray-700">
                  {reward.plan_name || "N/A"}
                </td>

                <td className="px-6 py-4 text-gray-700">
                  {reward.no_of_directs}
                </td>
                <td className="px-6 py-4 text-gray-700">{reward.title}</td>
                <td className="px-6 py-4 text-center">
                  {reward.image ? (
                    <img
                      src={reward.image}
                      alt="Reward"
                      className="max-w-[50px] max-h-[50px] mx-auto rounded"
                    />
                  ) : (
                    <span className="text-gray-400 italic">No image</span>
                  )}
                </td>

                <td className="px-6 py-4 text-gray-700">
                  {reward.description}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Rewards;
