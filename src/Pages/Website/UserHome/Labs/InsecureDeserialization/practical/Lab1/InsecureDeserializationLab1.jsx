import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./InsecureDeserializationLab1.css";
import GoBack from "../../../../Components/GoBack_Btn/GoBack_Btn";
import ShowHint from "../../../../Components/ShowHint_Btn/ShowHint_Btn";
import ThemeSwitcher from "../../../../Components/ThemeSwitcher/ThemeSwitcher";

export default function InsecureDeserializationLab1() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  const hintMessage = `<p>Decrypt BASE64 → Edit → Re-encrypt → Exploit.
Username = password = admin
https://www.base64decode.org/
</p>`;

  const handleLogin = async (e) => {
    e.preventDefault();

    if (username.toLowerCase() === "admin") {
      setErrorMessage("You are not authorized.");
      return;
    }

    const serializedData = `O:4:"User":2:{s:8:"username";s:${username.length}:"${username}";s:8:"password";s:${password.length}:"${password}";}`;

    const encodedCookies = btoa(serializedData);

    document.cookie = `session=${encodedCookies}; path=/; max-age=3600; SameSite=Lax`;

    const payload = {
      username,
      password,
      session: encodedCookies,
    };
    console.log("Data sent to API:", payload);

    try {
      const response = await fetch(
        "https://digitopia-project-backend.vercel.app/api/insecureDeserializationLab1",
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
      console.log("Success:", data);

      if (data.data.username === "admin") {
        navigate(
          "/Insecure_Deserialization/Insecure_Deserialization_Labs/lab1/AdminDashboard"
        );
      } else if (data.data.username === "test") {
        navigate(
          "/Insecure_Deserialization/Insecure_Deserialization_Labs/lab1/testPage"
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
