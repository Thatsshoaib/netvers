import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AuthForm = () => {
  const [isLogin, setIsLogin] = useState(true);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    username: "",
    email: "",
    number: "",
    sponsorId: "",
    plan_id: "",
    epin: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      if (isLogin) {
        // Login Request
        const response = await axios.post("http://localhost:5000/api/login", {
          username: formData.username,
          password: formData.password,
        });

        localStorage.setItem("token", response.data.token);
        localStorage.setItem("user", JSON.stringify(response.data.user));

        alert(response.data.message);
        navigate("/dashboard"); // Change route as needed
      } else {
        // Register Request
        const response = await axios.post("http://localhost:5000/api/register", formData);

        alert(response.data.message);
        setIsLogin(true);
      }
    } catch (error) {
      setError(error.response?.data?.message || "Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded shadow-md w-96">
      <h2 className="text-2xl font-bold text-center mb-4">{isLogin ? "Login" : "Register"}</h2>

      {error && <p className="text-red-500 text-center">{error}</p>}

      <form onSubmit={handleSubmit}>
        {!isLogin && (
          <>
            <input type="text" name="name" placeholder="Name" value={formData.name} onChange={handleChange} required />
            <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required />
            <input type="text" name="number" placeholder="Phone Number" value={formData.number} onChange={handleChange} required />
            <input type="text" name="sponsorId" placeholder="Sponsor ID" value={formData.sponsorId} onChange={handleChange} required />
            <input type="text" name="epin" placeholder="E-PIN" value={formData.epin} onChange={handleChange} required />
          </>
        )}

        <input type="text" name="username" placeholder="Username" value={formData.username} onChange={handleChange} required />
        <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} required />

        <button type="submit" className="btn-submit" disabled={loading}>
          {loading ? (isLogin ? "Logging in..." : "Registering...") : isLogin ? "Login" : "Register"}
        </button>

        <p className="text-center mt-2">
          {isLogin ? "Don't have an account?" : "Already have an account?"}
          <button type="button" className="text-blue-500 hover:underline ml-1" onClick={() => setIsLogin(!isLogin)}>
            {isLogin ? "Register" : "Log in"}
          </button>
        </p>
      </form>
    </div>
  );
};

export default AuthForm;
