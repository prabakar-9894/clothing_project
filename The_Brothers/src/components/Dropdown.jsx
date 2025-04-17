import React, { useState } from 'react';
import '/css/Dropdown.css';

function Dropdowns() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="dropdown">
      <button onClick={toggleDropdown}>
        Dropdown
      </button>
      
      {isOpen && (
        <div className="dropdown-content">
          <a href="#">Only Option</a>
        </div>
      )}
    </div>
  );
}

export default Dropdowns;