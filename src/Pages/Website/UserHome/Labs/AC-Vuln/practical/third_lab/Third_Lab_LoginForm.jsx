import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../Lab_Style.css";
import { Link } from "react-router-dom";

export default function Third_Lab_LoginForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // Utility function to set a cookie
  const setCookie = (name, value, days) => {
    const expires = new Date();
    expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000);
    document.cookie = `${name}=${value};expires=${expires.toUTCString()};path=/`;
  };

  const handleLogin = (e) => {
    e.preventDefault();
    const correctUsername = "ahmed";
    const correctPassword = "ahmed";

    if (username === correctUsername && password === correctPassword) {
      setCookie("isLoggedIn", "true", 7);
      setCookie("Admin", "false", 7);
      navigate("/AC-Vuln/AC_Vuln_labs/third_lab/admin");
    } else {
      setError("Invalid username or password.");
    }
  };

  const spanCount = 400;
  return (
     <>
          <div
            style={{
              backgroundColor: "#000",
              position: "relative",
              width: "100vw",
              height: "100vh",
              overflow: "hidden",
            }}
          >
            <main className="hacker-login">
              {Array.from({ length: spanCount }).map((_, index) => (
                <span key={index} className="hackerLogin-gridSpan"></span>
              ))}
    
              <div className="hackerLogin-signin">
                <div className="hackerLogin-content">
                  <h2>Sign In</h2>
                  <form onSubmit={handleLogin} className="hacker-form">
                    <div className="hackerLogin-inputBox">
                      <input
                        type="text"
                        required
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                      />
                      <i>Email</i>
                    </div>
                    <div className="hackerLogin-inputBox">
                      <input
                        type="password"
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                      <i>Password</i>
                    </div>
                    <div className="hackerLogin-links">
                      <Link to="/forgot">Forgot Password?</Link>
                      <Link to="/signup">Sign Up</Link>
                    </div>
                    <div className="hackerLogin-inputBox">
                      <input type="submit" value="Login" />
                    </div>
                  </form>
                </div>
              </div>
            </main>
      </div>
      {error && <p className="error-message">{error}</p>}
        </>
  );
}
