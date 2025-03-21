
import { useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

function UserList() {

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/users`)
      .then(res => setUsers(res.data))
      .catch(err => console.log("Error fetching users:", err));
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/api/users/${id}`);
      setUsers(users.filter(user => user._id !== id));
    }
  };

  return (
    <div>
      <h2>User List</h2>
      
      
      <ul>
        {users.map(user => (
          <li key={user._id} style={{ border: "1px solid #ddd", padding: "10px", margin: "10px 0", borderRadius: "5px" }}>
            <div>
              <img 
                src={user.image ? `${import.meta.env.VITE_BACKEND_URL}/uploads/${user.image}` : "https://via.placeholder.com/100"} 
                alt={user.name} 
                width="100" 
                style={{ borderRadius: "50%", marginBottom: "10px" }} 
              />
              <h3>{user.name}</h3>
              <p><strong>Email:</strong> {user.mail}</p>
              <p><strong>Contact:</strong> {user.contactNumber}</p>

              <h4>Address</h4>
              {user.address ? (
                <p>
                  {user.address.street}, {user.address.city}, {user.address.state} - {user.address.zipCode}, {user.address.country}
                </p>
              ) : (
                <p>No Address Provided</p>
              )}
            </div>

            <Link to={`/edit/${user._id}`} style={{ marginRight: "10px" }}>✏️ Edit</Link>
            <button onClick={() => handleDelete(user._id)} style={{ color: "red" }}>🗑️ Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default UserList;
