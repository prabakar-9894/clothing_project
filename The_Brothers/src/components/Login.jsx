
import React, { useState,useContext } from "react";
import { useNavigate } from "react-router-dom";
import { ShopContext } from '../App';
import axios from "axios";
import "/css/Login.css"; 

const Login = () => {

    const { UserId, setUserId } = useContext(ShopContext);

  const [mail, setMail] = useState("");
  const [password, setPassword] = useState(""); 
  const [message, setMessage] = useState(""); 

  const navigate = useNavigate();

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Send login credentials to the server
      const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/login`, {
        mail,
        password,
      });

        // Extract user ID and token from response
        const { id, token } = response.data;

      if (response.status === 200) {
        // Store token and user ID in localStorage
      localStorage.setItem("userID", id);
      localStorage.setItem("token", token);
      setUserId(id);

        alert("Login successful!");
        setMessage(""); // Clear previous messages
        navigate("/"); // Redirect to the homepage or dashboard
      }
    } catch (error) {
      // Handle server or client errors
      if (error.response && error.response.data) {
        setMessage(error.response.data.message); // Show server-provided error message
      } else {
        setMessage("An error occurred. Please try again."); // Default error message
      }
    }
  }
  
  return (
    <div className="login-container">
      <h1>Login</h1>
      <form onSubmit={handleSubmit} className="login-form">
        {/* Email Input Field */}
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            id="email"
            type="email"
            value={mail}
            onChange={(e) => setMail(e.target.value)}
            placeholder="Enter your email"
            autoComplete="off"
            required
          />
        </div>

        {/* Password Input Field */}
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
             autoComplete="off"
            placeholder="Enter your password"
            required
          />
        </div>

        {/* Submit Button */}
        <button type="submit" className="login-button">
          Login
        </button>
      </form>

      {/* Display Message (Error or Success) */}
      {message && <p className="message">{message}</p>}

    </div>
  );
};

export default Login;
