import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    const res = await fetch(
      "https://digitopia-project-backend.vercel.app/api/clickJackLab1-login",
      {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({ username, password }),
      }
    );
    if (res.ok) {
      // Successful login
      navigate("/Click_Jacking/Click_Jacking_labs/lab1/EditInfo");
    } else {
      alert("Login failed");
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
                  <i>UserName</i>
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
}

export default Login;
