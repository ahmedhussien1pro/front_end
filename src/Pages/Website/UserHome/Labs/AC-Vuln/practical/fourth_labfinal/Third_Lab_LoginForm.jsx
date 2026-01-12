import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../Lab_Style.css";

export default function Third_Lab_LoginForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    const correctUsername = "ahmed";
    const correctPassword = "ahmed";

    if (username === correctUsername && password === correctPassword) {
      localStorage.setItem("isLoggedIn", "true");
      navigate("/AC-Vuln/AC_Vuln_labs/third_lab/admin");
    } else {
      setError("Invalid username or password.");
    }
  };

  return (
    <div className="lab-container">
      <h2>Login Form</h2>
      <form onSubmit={handleLogin} className="lab-form">
        <label htmlFor="username">Username</label>
        <input
          type="text"
          id="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <input type="submit" value="Log in" />
      </form>
      {error && <p className="error-message">{error}</p>}
    </div>
  );
}
