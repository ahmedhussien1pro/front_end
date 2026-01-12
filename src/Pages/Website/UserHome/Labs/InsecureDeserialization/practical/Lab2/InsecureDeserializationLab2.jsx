import { useState } from "react";
import { useNavigate } from "react-router-dom";
import CryptoJS from "crypto-js";
import "../Lab1/InsecureDeserializationLab1.css";
import GoBack from "../../../../Components/GoBack_Btn/GoBack_Btn";
import ShowHint from "../../../../Components/ShowHint_Btn/ShowHint_Btn";
import ThemeSwitcher from "../../../../Components/ThemeSwitcher/ThemeSwitcher";

export default function InsecureDeserializationLab2() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  const hintMessage = `<p>Decrypt BASE64 → Decrypt URL → Decrypt MD5 → Edit → Re-encrypt → Exploit.
    Username = password = admin
    https://www.base64decode.org/	
    https://10015.io/tools/md5-encrypt-decrypt
  </p>`;
  const handleLogin = async (e) => {
    e.preventDefault();
    if (username.toLowerCase() === "admin") {
      setErrorMessage("You are not authorized.");
      return;
    }
    const hashedUsername = CryptoJS.MD5(username).toString();
    const hashedPassword = CryptoJS.MD5(password).toString();
    const serializedData = `O:4:"User":3:{s:8:"username";s:32:"${hashedUsername}";s:8:"password";s:32:"${hashedPassword}";s:7:"isAdmin";i:0;}`;
    const encodedCookies = btoa(encodeURIComponent(serializedData));
    document.cookie = `session=${encodedCookies}; path=/; max-age=3600; SameSite=Lax`;
    const payload = {
      username,
      password,
      session: encodedCookies,
    };
    try {
      const response = await fetch(
        "https://digitopia-project-backend.vercel.app/api/insecureDeserializationLab2",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      );

      if (!response.ok) {
        throw new Error("Login failed");
      }
      const data = await response.json();
      if (data.data.username === "admin") {
        navigate(
          "/Insecure_Deserialization/Insecure_Deserialization_Labs/lab2/AdminDashboard"
        );
      } else if (data.data.username === "test") {
        navigate(
          "/Insecure_Deserialization/Insecure_Deserialization_Labs/lab2/testPage"
        );
      }
    } catch (error) {
      console.error("Error:", error);
      setErrorMessage("Login failed. Please try again.");
    }
  };
  return (
    <>
      <GoBack />
      <ShowHint hintText={hintMessage} />
      <ThemeSwitcher />
      <div className="InsecureDeserializationLab-container">
        <div className="InsecureDeserializationLab-form-wrapper">
          <h2 className="InsecureDeserializationLab-title">Welcome Back</h2>
          <p className="InsecureDeserializationLab-subtitle">
            Please enter your credentials to login
          </p>
          {errorMessage && (
            <p className="InsecureDeserializationLab-error">{errorMessage}</p>
          )}
          <form
            className="InsecureDeserializationLab-form"
            onSubmit={handleLogin}
          >
            <div className="InsecureDeserializationLab-input-group">
              <label>Username</label>
              <input
                type="text"
                placeholder="Enter your username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className="InsecureDeserializationLab-input-group">
              <label>Password</label>
              <input
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button className="InsecureDeserializationLab-button" type="submit">
              Login
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
