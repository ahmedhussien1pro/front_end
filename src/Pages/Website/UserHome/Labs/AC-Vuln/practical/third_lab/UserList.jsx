import React, { useState, useEffect } from "react";
import "../Lab_Style.css";

export default function UserList() {
  const [isLoggedIn, setIsLoggedIn] = useState(null);
  const [users, setUsers] = useState([]);
  const [token] = useState("");

  // Utility function to get a cookie by name
  const getCookie = (name) => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(";").shift();
    return null;
  };

  useEffect(() => {
    const adminStatus = getCookie("Admin");

    if (adminStatus === "true") {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  const deleteUser = async (id) => {
    try {
      const response = await fetch(
        `https://digitopia-project-backend.vercel.app/api/vulnUsers/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.ok) {
        setUsers(users.filter((user) => user.id !== id));
      } else {
        console.error("Failed to delete user.");
      }
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  if (isLoggedIn === null) {
    return (
      <h2 style={{ textAlign: "center", margin: "50px 0" }}>
        Admin interface only available if logged in as an administrator
      </h2>
    );
  }

  return (
    <div className="users-container">
      <h2>Users</h2>
      {users.map((user) => (
        <div className="user-item" key={user.id}>
          <h2 className="user-name">{user.name}</h2>
          <button className="delete-btn" onClick={() => deleteUser(user.id)}>
            Delete
          </button>
        </div>
      ))}
    </div>
  );
}
