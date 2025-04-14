import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react"; // Optional icon package or use emojis/icons

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    role: "user", // Default role
  });

  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        const userData = JSON.parse(storedUser);
        console.log("Stored User Data:", userData);
        if (userData?.user_id) {
          if (userData.role === "admin") {
            navigate("/admin-dashboard"); // Redirect Admin
          } else {
            navigate("/dashboard"); // Redirect User
          }
        }
      } catch (error) {
        console.error("Error parsing stored user:", error);
      }
    }
  }, [navigate]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handlePasswordToggle = () => {
    setShowPassword(true);
    setTimeout(() => setShowPassword(false), 2000); // Hide password after 3 seconds
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://localhost:5000/api/auth/login",
        formData
      );
      console.log("Full API Response:", res.data);

      if (res.data.user && res.data.token) {
        console.log("User Data from API:", res.data.user);
        localStorage.setItem("user", JSON.stringify(res.data.user));
        localStorage.setItem("user_id", res.data.user.user_id);
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("role", res.data.user.role);

        if (res.data.user.plan_id !== undefined && res.data.user.plan_id) {
          localStorage.setItem("plan_id", res.data.user.plan_id);
          console.log("Plan ID stored:", res.data.user.plan_id);
        } else {
          console.warn("Plan ID is missing from API response.");
        }

        // Redirect based on user role
        if (res.data.user.role === "admin") {
          window.location.href = "/admin-dashboard"; // Admin Dashboard
        } else {
          window.location.href = "/dashboard"; // User Dashboard
        }
      } else {
        console.error("Invalid response format:", res.data);
        alert("Login failed, invalid response from server.");
      }
    } catch (error) {
      console.error("Login Error:", error.response?.data);
      alert(error.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-xl px-8 py-10 w-full max-w-md border border-gray-200">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Welcome Back
        </h2>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-4 relative">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password"
              className="w-full p-3 pr-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
              onChange={handleChange}
              required
            />
            <button
              type="button"
              onClick={handlePasswordToggle}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-600 hover:text-blue-600"
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>

          <div className="mb-4">
            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all bg-white"
            >
              <option value="user">Login as User</option>
              <option value="admin">Login as Admin</option>
            </select>
          </div>

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-blue-600 to-blue-500 text-white p-3 rounded-lg shadow-md hover:from-blue-700 hover:to-blue-600 transition-all duration-300"
          >
            Login
          </button>

          <p className="text-center text-gray-600 mt-4">
            Don't have an account?{" "}
            <a href="/register" className="text-blue-600 hover:underline">
              Register
            </a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
