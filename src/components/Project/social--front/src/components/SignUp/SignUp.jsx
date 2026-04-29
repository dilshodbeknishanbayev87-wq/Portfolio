import React, { useState } from "react";
import { axiosInstance } from "../request.jsx";
import { useNavigate, Link } from "react-router-dom";
import "./SignUp.css";

function SignUp() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    username: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const response = await axiosInstance.post("/auth/sign-up", formData);

      if (response.status === 201 || response.status === 200  ) {
        localStorage.setItem("accessToken", response.data.accessToken);
        localStorage.setItem("username", formData.username);

        setSuccess("Ro'yxatdan o'tish muvaffaqiyatli! Login sahifaga yo'naltiriladi...");
        setTimeout(() => navigate("/login"), 1500);
      } else {
        setError(`Xatolik yuz berdi (kod: ${response.status})`);
      }
    } catch (err) {
      if (err.response) {
        setError(err.response.data?.message || `Server xatolik berdi (kod: ${err.response.status})`);
      } else if (err.request) {
        setError("Serverga ulanishda xatolik yuz berdi. Internetni tekshiring.");
      } else {
        setError("Kutilmagan xatolik yuz berdi.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="signup-container">
      <h2>Sign Up</h2>
      <form onSubmit={handleSubmit}>
        <input name="first_name" placeholder="Firstname" value={formData.first_name} onChange={handleChange} required />
        <input name="username" placeholder="Username" value={formData.username} onChange={handleChange} required />
        <input name="last_name" placeholder="Lastname" value={formData.last_name} onChange={handleChange} required />
        <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required />
        <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} required />
        <button type="submit" disabled={isLoading}>
          {isLoading ? "Signing Up..." : "Sign Up"}
        </button>
      </form>

      {error && <p className="red">{error}</p>}
      {success && <p className="green">{success}</p>}

      <p style={{ marginTop: "10px" }}> 
        Allaqachon a'zomisiz? <Link to="/login">Login</Link>
      </p>
    </div>
  );
}

export default SignUp;