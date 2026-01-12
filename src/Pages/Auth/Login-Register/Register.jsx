import axios from "axios";
import React, { useState, useEffect } from "react";
import Cookie from "cookie-universal";
import { useNavigate } from "react-router-dom";
import "./form.css";
import "./register-login.css";
import Preloader from "../../Website/Preloader/Preloader";
export default function Register() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const cookie = Cookie();
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");
  function handleChange(e) {
    e.preventDefault();
    setForm({ ...form, [e.target.name]: e.target.value });
  }
  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post(
        "https://digitopia-project-backend.vercel.app/api/register",
        form
      );
      setLoading(false);
      const token = res.data.token;
      cookie.set("CuberWeb", token, { path: "/" });

      navigate("/authenticate", { replace: true });
    } catch (error) {
      setLoading(false);
      if (error.response && error.response.status === 409) {
        setErr("Email has already been taken.");
      } else {
        setErr("Internal server error");
      }
    }
  }
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 200);
    return () => clearTimeout(timer);
  }, []);
  return (
    <body className="login-register-body">
      {loading && <Preloader loading={loading} />}
      <div className="container">
        <div className="rows hh-100">
          <form className="form" onSubmit={handleSubmit}>
            <div className="custom-form">
              <h1 className="textcenter">Register Now</h1>
              <div className="formcontrol">
                <input
                  type="text"
                  id="name"
                  value={form.name}
                  name="name"
                  onChange={handleChange}
                  placeholder="Enter Your Name.."
                  required
                />
                <label htmlFor="name">Name:</label>
              </div>
              <div className="formcontrol">
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  required
                  placeholder="Enter Your Email.."
                />
                <label htmlFor="email">Email:</label>
              </div>
              <div className="formcontrol">
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  required
                  minLength={6}
                  placeholder="Enter Your Password.."
                />
                <label htmlFor="password">Password:</label>
              </div>
              <button type="submit" className="button-login-register">
                Register
              </button>
              {err !== "" && <span className="error">{err}</span>}
              <div className="login-link">
                <p>
                  Have an account? <a href="/login">Login</a>
                </p>
              </div>
            </div>
          </form>
        </div>
      </div>
    </body>
  );
}
