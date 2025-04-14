import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const NewRegister = () => {
  const navigate = useNavigate();
  const [plans, setPlans] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [registeredUser, setRegisteredUser] = useState("");
  const [sponsorName, setSponsorName] = useState("");

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

  // Fetch plans
  useEffect(() => {
    const fetchPlans = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/epins/plans"
        );
        setPlans(response.data);
      } catch (error) {
        console.error("Error fetching plans:", error);
      }
    };
    fetchPlans();
  }, []);

  // Fetch sponsor name when sponsor_id changes
  useEffect(() => {
    const fetchSponsorName = async () => {
      if (formData.sponsor_id.length >= 5) {
        try {
          const res = await axios.get(
            `http://localhost:5000/api/users/${formData.sponsor_id}`
          );
          setSponsorName(res.data.name || "Not found");
        } catch {
          setSponsorName("Invalid Sponsor ID");
        }
      } else {
        setSponsorName("");
      }
    };
    fetchSponsorName();
  }, [formData.sponsor_id]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !formData.sponsor_id ||
      !formData.name ||
      !formData.email ||
      !formData.phone ||
      !formData.password
    ) {
      alert("Please fill in all required fields!");
      return;
    }

    if (formData.role === "user" && !formData.epin) {
      alert("E-PIN is required for user registration!");
      return;
    }

    if (!formData.plan_id) {
      alert("Please select a plan!");
      return;
    }

    try {
      await axios.post("http://localhost:5000/api/auth/register", formData);
      setRegisteredUser(formData.name);
      setModalOpen(true);
    } catch (error) {
      alert(error.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-b from-gray-100 to-gray-200 px-4 pt-50">
      <div className="bg-white shadow-lg rounded-2xl p-10 max-w-4xl w-full grid grid-cols-1 md:grid-cols-2 gap-10 border border-gray-200">
        {/* Info Section */}
        <div className="flex flex-col justify-center">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">
            Register a New User
          </h2>
          <p className="text-gray-600 text-lg">
            Fill out the form to register a new member under your network.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Role Selection */}
          <input type="hidden" name="role" value="user" />

          {/* Sponsor ID */}
          <input
            type="text"
            name="sponsor_id"
            placeholder="Sponsor ID (required)"
            value={formData.sponsor_id}
            onChange={handleChange}
            required
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {sponsorName && (
            <p className="text-sm text-gray-600">
              Sponsor:{" "}
              <span className="font-semibold text-blue-600">{sponsorName}</span>
            </p>
          )}

          {/* Name */}
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          {/* Email */}
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          {/* Phone */}
          <input
            type="text"
            name="phone"
            placeholder="Phone Number"
            value={formData.phone}
            onChange={handleChange}
            required
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          {/* Password */}
          <input
            type="password"
            name="password"
            placeholder="Create Password"
            value={formData.password}
            onChange={handleChange}
            required
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          {/* E-PIN */}
          {formData.role === "user" && (
            <input
              type="text"
              name="epin"
              placeholder="E-PIN"
              value={formData.epin}
              onChange={handleChange}
              required
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          )}

          {/* Plan Selection */}
          {plans.length > 0 && (
            <select
              name="plan_id"
              value={formData.plan_id}
              onChange={handleChange}
              required
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select a Plan</option>
              {plans.map((plan) => (
                <option key={plan.plan_id} value={plan.plan_id}>
                  {plan.plan_name}
                </option>
              ))}
            </select>
          )}

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
          >
            Register User
          </button>

          <p className="text-center text-gray-500 mt-3">
            You're creating this account on someone else's behalf.
          </p>
        </form>
      </div>

      {/* Success Modal */}
      {modalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40">
          <div className="bg-white p-6 rounded-xl shadow-xl text-center max-w-md w-full">
            <h3 className="text-xl font-bold text-gray-800 mb-2">
              Registration Successful
            </h3>
            <p className="text-gray-600">
              <span className="text-blue-600 font-semibold">
                {registeredUser}
              </span>{" "}
              has been successfully registered.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default NewRegister;


