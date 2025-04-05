
import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "/css/AddUser.css";
import { ShopContext } from "../App";

const AddUser = () => {

  const { UserId, setUserId } = useContext(ShopContext);

  const [user, setUser] = useState({
    name: "",
    mail: "",
    contactNumber: "",
    password: "",
    confirmPassword: "",
    image: null, // To store the selected file
  });

  const [errors, setErrors] = useState({});
  const [checkboxChecked, setCheckboxChecked] = useState(false);
  const [uploadedImage, setUploadedImage] = useState(null); // To display the uploaded image URL
  

  const navigate = useNavigate();

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prev) => ({ ...prev, [name]: value }));
  };

  // Handle file input for profile image
  const handleFileChange = (e) => {
    setUser((prev) => ({ ...prev, image: e.target.files[0] })); // Save the file
  };

  // Handle checkbox for terms and conditions
  const handleCheckboxChange = (e) => {
    setCheckboxChecked(e.target.checked);
  };

  // Form validation logic
  const validateForm = () => {
    const newErrors = {};
    let isValid = true;

    if (!user.name.trim()) {
      newErrors.name = "Name is required";
      isValid = false;
    }
    if (!user.mail.trim()) {
      newErrors.mail = "Email is required";
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(user.mail)) {
      newErrors.mail = "Invalid email format";
      isValid = false;
    }
    if (!user.contactNumber.trim()) {
      newErrors.contactNumber = "Contact number is required";
      isValid = false;
    }
    if (!user.password) {
      newErrors.password = "Password is required";
      isValid = false;
    } else if (user.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters long";
      isValid = false;
    }
    if (user.password !== user.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
      isValid = false;
    }
    if (!checkboxChecked) {
      newErrors.checkbox = "Please accept terms and conditions";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    const formData = new FormData();
    formData.append("name", user.name);
    formData.append("mail", user.mail);
    formData.append("contactNumber", user.contactNumber);
    formData.append("password", user.password);
    formData.append("confirmPassword", user.confirmPassword);
    if (user.image) formData.append("image", user.image);

    try {
      // Send the form data to the backend API
      const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/users`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      
      if (response.status === 201) {
        // Success! Save the token and image URL
        localStorage.setItem("token", response.data.token);
        setUserId(response.data.id); // Disp
        setUploadedImage(response.data.imageUrl); // Save the image URL for display
       
        alert("User added successfully!");
        navigate("/"); // Navigate to a welcome page or dashboard
      }
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Something went wrong!");
    }
  };


  return (
    <div className="AddformAlldata">
      <form onSubmit={handleSubmit}>
        <h2>Sign Up</h2>
        <div className="form-group">
          <input
            type="text"
            name="name"
            onChange={handleChange}
             autoComplete="off"
            placeholder="Enter Name"
          />
          <span className="error">{errors.name}</span>
        </div>

        <div className="form-group">
          <input
            type="email"
            name="mail"
            onChange={handleChange}
             autoComplete="off"
            placeholder="Enter Email"
          />
          <span className="error">{errors.mail}</span>
        </div>

        <div className="form-group">
          <input
            type="text"
            name="contactNumber"
            onChange={handleChange}
            placeholder="Enter Contact Number"
             autoComplete="off"
          />
          <span className="error">{errors.contactNumber}</span>
        </div>

        <div className="form-group">
          <input
            type="password"
            name="password"
            onChange={handleChange}
            placeholder="Enter Password"
             autoComplete="new-password"
          />
          <span className="error">{errors.password}</span>
        </div>

        <div className="form-group">
          <input
            type="password"
            name="confirmPassword"
            onChange={handleChange}
            placeholder="Confirm Password"
            autoComplete="new-password"
          />
          <span className="error">{errors.confirmPassword}</span>
        </div>

        <div className="form-group">
          <label>Profile Image:</label>
          <input type="file" className="fileImage" onChange={handleFileChange} />
        </div>

        <div className="form-group checkboxDiv">
          <label>
            <input
              type="checkbox"
              className="checkboxInput"
              checked={checkboxChecked}
              autoComplete="off"
              onChange={handleCheckboxChange}
            />
            Accept terms and conditions
          </label>
          <span className="error">{errors.checkbox}</span>
        </div>

        <button type="submit" className="submit-button">
          Submit
        </button>
        <Link to="/login">Login Account</Link>
      </form>
       

    
    </div>
  );
};

export default AddUser;
















