import React, { useState } from "react";
import { axiosInstance } from "../request.jsx";
import { useNavigate, Link } from "react-router-dom";
import "./Login.css";

function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const response = await axiosInstance.post("/auth/login", formData);

      console.log("LOGIN RESPONSE:", response.data);


      localStorage.setItem("accessToken", response.data.access_token);
      localStorage.setItem("refreshToken", response.data.refresh_token);

 
      localStorage.setItem("username", formData.username);
      localStorage.setItem("justLoggedIn", "true");

      navigate("/home");
    } catch (err) {
      setError(err.response?.data?.detail || "Login xatolik yuz berdi");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input
          name="username"
          placeholder="Username"
          value={formData.username}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
        />
        <button type="submit" disabled={isLoading}>
          {isLoading ? "Logging in..." : "Login"}
        </button>
      </form>

      {error && <p className="red">{error}</p>}

      <p> 
        Yangi foydalanuvchisiz? <Link to="/signup">Sign Up</Link>
      </p>
      <p>
        Parolingizni unutdingizmi? <Link to="/reset-password">Reset Password</Link>
      </p>
    </div>  
  );
}

export default Login;
