import React from "react";
import "./HackerLoginForm.css";
import { Link } from "react-router-dom";
const HackerLoginForm = () => {
  const spanCount = 400;

  return (
    <div
      style={{
        backgroundColor: "#000",
        position: "relative",
        width: "100vw",
        height: "100vh",
      }}
    >
      <main className="hacker-login">
        {Array.from({ length: spanCount }).map((_, index) => (
          <span key={index} className="hackerLogin-gridSpan"></span>
        ))}

        {/* Sign-in form */}
        <div className="hackerLogin-signin">
          <div className="hackerLogin-content">
            <h2>Sign In</h2>
            <div className="hacker-form">
              <div className="hackerLogin-inputBox">
                <input type="text" required />
                <i>Username</i>
              </div>
              <div className="hackerLogin-inputBox">
                <input type="password" required />
                <i>Password</i>
              </div>
              <div className="hackerLogin-links">
                <Link to="">Forgot Password?</Link>
                <Link to="">Sign Up</Link>
              </div>
              <div className="hackerLogin-inputBox">
                <input type="submit" value="Login" />
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default HackerLoginForm;
