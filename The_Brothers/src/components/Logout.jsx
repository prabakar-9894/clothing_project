import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { ShopContext } from "../App";
import axios from "axios";
import "/css/Logout.css"

const Logout = ({storedData,setStoredData}) => {
  const navigate = useNavigate();
  const { UserId,setUserId,setUploadedImage, uploadedImage } = useContext(ShopContext);

  const handleLogout = async (index) => {
    try {
  

      const UpdatedData = [...storedData];
    UpdatedData.splice(index,1);
    setStoredData(UpdatedData);
    localStorage.setItem("formsAllData",JSON.stringify(UpdatedData));


      alert('User logout successfully');
      navigate("/"); // Adjust the route as needed
      window.location.reload();
    } catch (err) {
      console.error("Error during logout:", err);
    }
  };

  return (
    <>{

    
      storedData.map((item,index) => (
        // <div key={index}>
<button key={index} onClick={()=>handleLogout(index)} className="LogOutBtn">
        Logout
      </button>
      // </div>
      ))
    }
      
    </>
  );
};

export default Logout;