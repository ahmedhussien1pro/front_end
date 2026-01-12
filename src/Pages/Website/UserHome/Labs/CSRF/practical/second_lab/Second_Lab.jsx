import { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
import ThemeSwitcher from "../../../../Components/ThemeSwitcher/ThemeSwitcher";
const CSRFLogin = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");
  const spanCount = 400;
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(
          "https://digitopia-project-backend.vercel.app/api/getAllUsers"
        );
        setUsers(response.data);
      } catch (error) {
        setLoading(false);
        if (error.response) {
          setErr(error.response.data);
          console.error(error.response.data);
        } else {
          setErr("Network Error");
          console.error(error);
        }
      }
    };

    fetchUsers();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const user = users.find((user) => user.authority === username);
      if (user) {
        const response = await axios.post(
          "https://digitopia-project-backend.vercel.app/api/CSRFLab2",
          {
            username: user.authority,
            validPass: user.password,
            enteredPass: password,
          }
        );
        if (response.data.success) {
          Swal.fire({
            icon: "success",
            title: "Login Successful! & Lab finished",
          });
        } else {
          Swal.fire({
            icon: "error",
            title: "Login Failed!",
          });
        }
      } else {
        Swal.fire({
          icon: "error",
          title: "User not found!",
        });
      }
    } catch (error) {
      console.error("Login Error:", error);
    }
  };

  return (
    <>
      <ThemeSwitcher />
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
    </>
  );
};

export default CSRFLogin;
