import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import ThemeSwitcher from "../../../../Components/ThemeSwitcher/ThemeSwitcher";
const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const BASE_URL = "http://localhost:8080/api";

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`${BASE_URL}/bLVuln-login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem("loggedIn2", "true");
        localStorage.setItem("userId", data.user.id);
        localStorage.setItem("userBalance", data.user.balance);
        localStorage.setItem("userEmail", data.user.email);
        localStorage.setItem("userName", data.user.name);
        navigate("/BL-Vuln/BL_Vuln_labs/second_lab/myaccount");
      } else {
        alert(data.message || "Invalid credentials");
      }
    } catch (error) {
      console.error(error);
      alert("An error occurred during login.");
    }
  };
  const spanCount = 400;
  return (
    <>
      <ThemeSwitcher />
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
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
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
    </>
  );
};

export default LoginPage;
