import React, { useState } from "react";
import { axiosInstance } from "../request.jsx";
import { Link, useNavigate } from "react-router-dom";

function ResetPassword() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    code: "",
    new_pass: "",
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
      const payload = {
        username: formData.username,
        code: formData.code,       
        new_pass: formData.new_pass,
      };

      console.log("Sending payload:", payload);

      const response = await axiosInstance.post("/auth/reset-pass", payload, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.status === 200) {
        setSuccess("Parolingiz muvaffaqiyatli yangilandi! Login sahifaga yo'naltiriladi...");
        setTimeout(() => navigate("/login"), 1500);
      } else {
        setError(`Xatolik yuz berdi (kod: ${response.status})`);
      }
    } catch (err) {
      console.error("Error response:", err.response?.data);

      if (err.response) {
        setError(err.response.data?.message || `Server xatolik berdi (kod: ${err.response.status})`);
      } else if (err.request) {
        setError("Serverga ulanishda xatolik yuz berdi. Iltimos, internetni tekshiring.");
      } else {
        setError("Kutilmagan xatolik yuz berdi.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="signup-container">
      <h2>Reset Password</h2>
      <form onSubmit={handleSubmit}>
        <input
          name="username"
          placeholder="Username"
          value={formData.username}
          onChange={handleChange}
          required
        />
        <input
          type="number"          
          name="code"
          placeholder="Reset Code"
          value={formData.code}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="new_pass"
          placeholder="New Password"
          value={formData.new_pass}
          onChange={handleChange}
          required
        />
        <button type="submit" disabled={isLoading}>
          {isLoading ? "Updating..." : "Reset Password"}
        </button>
      </form>

      {error && <p className="red">{error}</p>}
      {success && <p className="green">{success}</p>}

      <p style={{ marginTop: "10px" }}>
        Esingizga tushdimi? <Link to="/login">Login</Link>
      </p>
    </div>
  );
}

export default ResetPassword;