import { useState, useEffect } from "react";
import axios from "axios";
import {
  Loader2,
  UserCircle,
  Layers3,
  ArrowUpCircle,
  Search,
} from "lucide-react";

const UpgradePlanForm = () => {
  const [users, setUsers] = useState([]);
  const [plans, setPlans] = useState([]);
  const [userInput, setUserInput] = useState("");
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState("");
  const [selectedPlan, setSelectedPlan] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/users/users")
      .then((res) => setUsers(res.data))
      .catch((err) => console.error("Error fetching users:", err));

    axios
      .get("http://localhost:5000/api/epins/plans")
      .then((res) => setPlans(res.data))
      .catch((err) => console.error("Error fetching plans:", err));
  }, []);

  const handleUserInputChange = (e) => {
    const input = e.target.value;
    setUserInput(input);
    if (input.trim() === "") {
      setFilteredUsers([]);
      setShowSuggestions(false);
      return;
    }
    const filtered = users.filter((user) =>
      user.name.toLowerCase().includes(input.toLowerCase())
    );
    setFilteredUsers(filtered);
    setShowSuggestions(true);
  };

  const handleUserSelect = (user) => {
    setSelectedUser(user.user_id);
    setUserInput(user.name);
    setShowSuggestions(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedUser) {
      const matchedUser = users.find(
        (user) => user.name.toLowerCase() === userInput.toLowerCase()
      );
      if (matchedUser) {
        setSelectedUser(matchedUser.user_id);
      } else {
        return alert("Please select a valid user from the list.");
      }
    }

    if (!selectedPlan) return alert("Please select a plan");

    try {
      setLoading(true);
      await axios.post("http://localhost:5000/api/upgrade/admin/upgrade-plan", {
        user_id: selectedUser,
        plan_id: selectedPlan,
      });

      alert("✅ Plan upgraded successfully!");
      setSelectedUser("");
      setUserInput("");
      setSelectedPlan("");
    } catch (err) {
      console.error(err);
      alert("❌ Failed to upgrade plan");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-10 p-8 bg-white border border-gray-200 rounded-3xl shadow-lg transition-all">
      <h2 className="text-3xl font-bold text-gray-800 mb-8 flex items-center justify-center gap-2">
        <ArrowUpCircle className="text-blue-600 w-7 h-7" />
        Upgrade User Plan
      </h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* User Autocomplete Input */}
        <div className="relative">
          <label className="block text-sm font-semibold text-gray-700 mb-1">
            <span className="inline-flex items-center gap-1">
              <UserCircle className="w-4 h-4 text-blue-500" /> Select User
            </span>
          </label>
          <div className="relative">
            <input
              type="text"
              className="w-full border border-gray-300 rounded-xl px-4 py-2 pl-10 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
              placeholder="Search user name..."
              value={userInput}
              onChange={handleUserInputChange}
              onFocus={() => userInput.length > 0 && setShowSuggestions(true)}
              onBlur={() => setTimeout(() => setShowSuggestions(false), 150)}
            />
            <Search className="absolute left-3 top-2.5 text-gray-400 w-5 h-5" />
          </div>
          {showSuggestions && filteredUsers.length > 0 && (
            <ul className="absolute z-30 bg-white border border-gray-200 w-full mt-1 max-h-48 overflow-y-auto shadow-lg rounded-xl">
              {filteredUsers.map((user) => (
                <li
                  key={user.user_id}
                  className="px-4 py-2 hover:bg-blue-50 cursor-pointer transition-all"
                  onClick={() => handleUserSelect(user)}
                >
                  <span className="font-medium text-gray-800">{user.name}</span>{" "}
                  <span className="text-sm text-gray-500 ml-1">
                    (ID: {user.user_id})
                  </span>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Plan Dropdown */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">
            <span className="inline-flex items-center gap-1">
              <Layers3 className="w-4 h-4 text-blue-500" /> Select New Plan
            </span>
          </label>
          <select
            className="w-full border border-gray-300 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
            value={selectedPlan}
            onChange={(e) => setSelectedPlan(e.target.value)}
          >
            <option value="">-- Choose a Plan --</option>
            {plans.map((plan) => (
              <option key={plan.plan_id} value={plan.plan_id}>
                {plan.plan_name}
              </option>
            ))}
          </select>
        </div>

        <button
          type="submit"
          disabled={loading}
          className={`w-full flex justify-center items-center gap-2 bg-blue-600 text-white font-semibold py-2.5 px-4 rounded-xl transition-all hover:bg-blue-700 shadow-md ${
            loading ? "opacity-60 cursor-not-allowed" : ""
          }`}
        >
          {loading && <Loader2 className="animate-spin w-5 h-5" />}
          {loading ? "Upgrading..." : "Upgrade Plan"}
        </button>
      </form>
    </div>
  );
};

export default UpgradePlanForm;
