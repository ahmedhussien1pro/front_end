import React, { useState, useEffect } from "react";
import "../Lab_Style.css";

export default function UserList() {
  const [isLoggedIn, setIsLoggedIn] = useState(null);
  const [users, setUsers] = useState([]);
  const [token, setToken] = useState("");

  // Fetch user list from the API
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch(
          "https://digitopia-project-backend.vercel.app/api/vulnUsers",
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (response.ok) {
          const data = await response.json();
          setUsers(data); // Assuming API returns an array of objects with id and name
        } else {
          console.error("Failed to fetch users.");
        }
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    if (token) {
      fetchUsers();
    }
  }, [token]);

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
        setUsers(users.filter((user) => user.id !== id)); // Update UI
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
