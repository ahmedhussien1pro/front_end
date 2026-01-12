import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../../../../Components/HackerLoginForm/HackerLoginForm.css";
import { Link } from "react-router-dom";
import Cookie from "cookie-universal";
import ShowHintBtn from "../../../../Components/ShowHint_Btn/ShowHint_Btn";
import GoBackBtn from "../../../../Components/GoBack_Btn/GoBack_Btn";
import { jwtDecode } from "jwt-decode";
import ThemeSwitcher from "../../../../Components/ThemeSwitcher/ThemeSwitcher";

const JWTLogin = ({ apiEndpoint, hint, tokenName, lab }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");
  const [login, setLogin] = useState(false);
  const cookie = Cookie();
  const navigate = useNavigate();
  const staticExpireTime = 900000;
  const adminurl = `/jwtattacks/jwtattacks_lab/${lab}/admin`;
  const userurl = `/jwtattacks/jwtattacks_lab/${lab}/user`;

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    const data = { username, password };

    axios
      .post(`${apiEndpoint}/login`, data)
      .then((response) => {
        const token = response.data.data.token;
        const expiresIn = new Date(Date.now() + staticExpireTime);
        if (token) {
          cookie.set(tokenName, token, { expires: expiresIn });
          setLogin(true);
        }
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        setErr(error.response?.data?.message || "Invalid credentials.");
      });
  };
  useEffect(() => {
    if (login) {
      const token = cookie.get(tokenName);
      if (token) {
        try {
          const decodedToken = jwtDecode(token);
          if (decodedToken.username === "admin") {
            navigate(adminurl);
          } else {
            navigate(userurl);
          }
        } catch (e) {
          console.error("Failed to decode token:", e);
        }
      }
    }
  }, [login, cookie, navigate, tokenName, adminurl, userurl]);

  const spanCount = 400;
  const hintMessage = hint;

  return (
    <div
      style={{
        backgroundColor: "#000",
        position: "relative",
        width: "100vw",
        height: "100vh",
      }}
    >
      <GoBackBtn />
      <ShowHintBtn hintText={hintMessage} />
      <ThemeSwitcher />
      <main className="hacker-login">
        {Array.from({ length: spanCount }).map((_, index) => (
          <span key={index} className="hackerLogin-gridSpan"></span>
        ))}

        {/* Sign-in form */}
        <div className="hackerLogin-signin">
          <div className="hackerLogin-content">
            <h2>Sign In</h2>
            <form onSubmit={handleSubmit} className="hacker-form">
              <div className="hackerLogin-inputBox">
                <input
                  type="text"
                  required
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
                <i>Username</i>
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
                <Link to="">Forgot Password?</Link>
                <Link to="">Sign Up</Link>
              </div>
              <div className="hackerLogin-inputBox">
                <input
                  type="submit"
                  value={loading ? "Logging in..." : "Login"}
                  disabled={loading}
                />
              </div>
              {err && <span className="error">{err}</span>}
            </form>
          </div>
        </div>
      </main>
    </div>
  );
};

export default JWTLogin;
