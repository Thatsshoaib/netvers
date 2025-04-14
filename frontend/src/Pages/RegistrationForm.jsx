import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const Register = () => {
  const navigate = useNavigate();
  const [plans, setPlans] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [registeredUser, setRegisteredUser] = useState("");
  const [registeredUserId, setRegisteredUserId] = useState("");


  const [formData, setFormData] = useState({
    role: "user",
    sponsor_id: "",
    name: "",
    email: "",
    phone: "",
    password: "",
    epin: "",
    plan_id: "",
  });

  useEffect(() => {
    const fetchPlans = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/epins/plans");
        setPlans(response.data);
      } catch (error) {
        console.error("Error fetching plans:", error);
      }
    };

    fetchPlans();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.phone || !formData.password) {
      alert("Please fill in all required fields!");
      return;
    }

    // ✅ Check for E-PIN only for users
    if (formData.role === "user" && !formData.epin) {
      alert("E-PIN is required for user registration!");
      return;
    }

    // ✅ Plan selection is required for both users and admins
    if (!formData.plan_id) {
      alert("Please select a plan!");
      return;
    }

    try {
      const res = await axios.post("http://localhost:5000/api/auth/register", formData);
      setRegisteredUser(formData.name);
      setRegisteredUserId(res.data.user_id); 
      setModalOpen(true);
    } catch (error) {
      alert(error.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-gray-50 to-gray-200 px-4 pt-20">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-lg shadow-xl w-full max-w-lg border border-gray-300"
      >
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Join Us Today</h2>

        {/* Role Selection */}
        <label className="block mb-2 text-gray-700 font-medium">Register As:</label>
        <select
          name="role"
          value={formData.role}
          className="w-full p-3 mb-4 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 outline-none transition"
          onChange={handleChange}
          required
        >
          <option value="user">User</option>
          <option value="admin">Admin</option>
        </select>

        {/* Sponsor ID (Optional) */}
        <input
          type="text"
          name="sponsor_id"
          placeholder="Sponsor ID (optional)"
          value={formData.sponsor_id}
          className="w-full p-3 mb-4 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 outline-none transition"
          onChange={handleChange}
        />

        {/* Name */}
        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={formData.name}
          className="w-full p-3 mb-4 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 outline-none transition"
          onChange={handleChange}
          required
        />

        {/* Email */}
        <input
          type="email"
          name="email"
          placeholder="Email Address"
          value={formData.email}
          className="w-full p-3 mb-4 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 outline-none transition"
          onChange={handleChange}
          required
        />

        {/* Phone */}
        <input
          type="text"
          name="phone"
          placeholder="Phone Number"
          value={formData.phone}
          className="w-full p-3 mb-4 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 outline-none transition"
          onChange={handleChange}
          required
        />

        {/* Password */}
        <input
          type="password"
          name="password"
          placeholder="Create Password"
          value={formData.password}
          className="w-full p-3 mb-4 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 outline-none transition"
          onChange={handleChange}
          required
        />

        {/* E-PIN (Only for Users) */}
        {formData.role === "user" && (
          <input
            type="text"
            name="epin"
            placeholder="E-PIN"
            value={formData.epin}
            className="w-full p-3 mb-4 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 outline-none transition"
            onChange={handleChange}
            required
          />
        )}

        {/* Plan Selection (Now Required for All) */}
        {plans.length > 0 && (
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
        )}

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-3 rounded-lg shadow-md hover:bg-blue-700 transition font-semibold"
        >
          Sign Up
        </button>

        {/* Login Redirect */}
        <p className="text-center text-gray-600 mt-4">
          Already have an account?{" "}
          <a href="/login" className="text-blue-600 font-medium hover:underline">
            Login here
          </a>
        </p>
      </form>

      {/* Success Modal */}
      {modalOpen && (
  <div className="fixed inset-0 flex items-center justify-center backdrop-blur-md bg-white/30">
    <div className="bg-white p-6 rounded-lg shadow-lg text-center w-96">
      <h3 className="text-xl font-bold text-gray-800 mb-2">Registration Successful</h3>
      <p className="text-gray-600">
        Welcome, <span className="text-blue-600 font-semibold">{registeredUser}</span>! Your account has been created.
      </p>
      <p className="text-gray-600 mt-1">
        Your Sponsor ID: <span className="text-green-600 font-semibold">{registeredUserId}</span>
      </p>
      <button
        onClick={() => {
          setModalOpen(false);
          navigate("/login");
        }}
        className="mt-4 bg-blue-600 text-white px-6 py-2 rounded-lg shadow-md hover:bg-blue-700 transition"
      >
        Go to Login
      </button>
    </div>
  </div>
)}

    </div>
  );
};

export default Register;


