import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { ShopContext } from "../App";
import axios from "axios";
import "/css/Logout.css"

const Logout = () => {
  const navigate = useNavigate();
  const { UserId,setUserId,setUploadedImage, uploadedImage } = useContext(ShopContext);

  const handleLogout = async () => {
    try {
      // Call the backend logout endpoint to clear the cookie
       await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/logout`);
      
      // Remove user data from localStorage
      localStorage.removeItem("userID");
      localStorage.removeItem("token");
      localStorage.removeItem("image");
      setUserId(null);
      setUploadedImage(null);
      // Redirect the user to the login page
      alert('User logout successfully');
      navigate("/"); // Adjust the route as needed
    } catch (err) {
      console.error("Error during logout:", err);
    }
  };

  return (
    <>
      <button onClick={handleLogout} className="LogOutBtn">
        Logout
      </button>
    </>
  );
};

export default Logout;