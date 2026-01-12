import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./auth_lab.css";
import GOBack from "../../../Components/GoBack_Btn/GoBack_Btn";
import ShowHint from "../../../Components/ShowHint_Btn/ShowHint_Btn";
import ThemeSwitcher from "../../../Components/ThemeSwitcher/ThemeSwitcher";

export default function Auth_lab1() {
  const hintMessage = `<p>Use the wordlist in Burp Suite's Intruder to discover the correct password.</p>`;
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  useEffect(() => {
    if (message === "success!") {
      window.open("/broken-auth/Broken_Authentication_Lab/products", "_blank");
    }
  }, [message]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        "https://digitopia-project-backend.vercel.app/api/brokenAuthLab1",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ username, password }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to send data to the server");
      }

      const data = await response.json();

      if (data.message === "success") {
        setMessage("success!");
      } else {
        setMessage("Login failed. Please check your credentials.");
      }
    } catch (error) {
      setMessage("An error occurred while sending data to the server.");
      console.error("Error:", error);
    }
  };

  return (
    <>
      <GOBack />
      <ShowHint hintText={hintMessage} />
      <ThemeSwitcher />
      <div className="lab1-login-container">
        <div className="lab1-login-card">
          <h3 className="lab1-login-title">Login</h3>

          <form onSubmit={handleSubmit} className="lab1-login-form">
            <div className="lab1-input-section">
              <label htmlFor="username" className="lab1-input-label">
                Username
              </label>
              <input
                type="text"
                className="lab1-input-field lab1-username-input"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>

            <div className="lab1-input-section">
              <label htmlFor="password" className="lab1-input-label">
                Password
              </label>
              <input
                type="password"
                className="lab1-input-field lab1-password-input"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <button type="submit" className="lab1-submit-btn">
              Submit
            </button>
          </form>

          {message && (
            <p
              className={`lab1-response-message ${
                message === "success!" ? "success" : "error"
              }`}
            >
              {message}
            </p>
          )}

          <div className="lab1-credentials-info">
            <p>
              <strong>Username:</strong> admin
            </p>
            <p>
              <strong>Wordlist:</strong> Seclist-10000 Common Credentials
            </p>
          </div>

          <Link to="/words-list" target="_blank" className="lab1-words-link">
            Click here to view the words list
          </Link>
        </div>
      </div>
    </>
  );
}
