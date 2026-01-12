import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import GOBack from "../../../../Components/GoBack_Btn/GoBack_Btn";
import ShowHint from "../../../../Components/ShowHint_Btn/ShowHint_Btn";
import ThemeSwitcher from "../../../../Components/ThemeSwitcher/ThemeSwitcher";
export default function Second_Lab() {
  const navigate = useNavigate();
  const hintMessage = `<p>Add Something</p>`;
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!username || !password) {
      setMessage("Username and Password are required.");
      return;
    }

    try {
      const response = await fetch(
        "https://digitopia-project-backend.vercel.app/api/ApiHackinglab2",
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
        setMessage("Login successful!");

        const userId = Number(data.data.id);

        if (userId === 1) {
          navigate(
            `/Api_Hacking/Api_Hacking_labs/lab2/DashboardAdmin/${userId}`
          );
        } else {
          navigate(
            `/Api_Hacking/Api_Hacking_labs/lab2/DashboardUser/${userId}`
          );
        }
      } else {
        setMessage("Login failed. Please check your credentials.");
      }
    } catch (error) {
      setMessage("An error occurred while sending data to the server.");
      console.error("Error:", error);
    }
  };
  const spanCount = 400;
  return (
    <>
      <GOBack />
      <ShowHint hintText={hintMessage} />
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
              <form onSubmit={handleSubmit} className="hacker-form">
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
                <div className="primary-bg p-2 mx-0 my-0">
                  <p className="secondary-text my-1">
                    Username: <strong className="main-color">user</strong>
                  </p>
                  <p className="secondary-text my-1">
                    Password: <strong className="main-color">user</strong>
                  </p>
                </div>
                <div className="hackerLogin-inputBox">
                  <input type="submit" value="Login" />
                </div>
              </form>
              {message && (
                <p
                  className={`alert text-center mt-3 fade show ${
                    message.includes("successful")
                      ? "alert-success"
                      : "alert-danger"
                  }`}
                >
                  {message}
                </p>
              )}
            </div>
          </div>
        </main>
      </div>
    </>
  );
}
