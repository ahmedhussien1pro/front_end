import React, { useState, useEffect } from "react";
import axios from "axios";
import Cookie from "cookie-universal";
import "./Settings.css";
export default function Settings() {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [token, setToken] = useState("");
  useEffect(() => {
    const cookie = Cookie();
    const retrievedToken = cookie.get("CuberWeb");
    setToken(retrievedToken);
  }, []);
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      setErrorMessage("New passwords do not match!");
      return;
    }
    setLoading(true);
    setErrorMessage("");
    setSuccessMessage("");
    setShowSuccessMessage(false);
    try {
      const response = await axios.post(
        "https://digitopia-project-backend.vercel.app/api/reset-password",
        {
          oldPassword,
          newPassword,
          confirmPassword,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response?.data?.msg) {
        setSuccessMessage(response.data.msg);
        setShowSuccessMessage(true);
      } else {
        setErrorMessage("Unexpected response from server.");
      }
    } catch (error) {
      console.error("API Error:", error.response?.data);
      setErrorMessage(
        error.response?.data?.message ||
          "Failed to reset password. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      <div className="settings-container">
        <form className="reset-password-form" onSubmit={handleSubmit}>
          <h2>Reset Password</h2>
          {showSuccessMessage && (
            <div className="success-message-box show">
              <p>{successMessage}</p>
              <button onClick={() => setShowSuccessMessage(false)}>
                Dismiss
              </button>
            </div>
          )}
          {errorMessage && (
            <p className="error-message-settings">{errorMessage}</p>
          )}
          <div className="form-group">
            <label>Old Password</label>
            <input
              type="password"
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>New Password</label>
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>Confirm New Password</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="reset-button" disabled={loading}>
            {loading ? "Resetting..." : "Reset Password"}
          </button>
        </form>
      </div>
    </>
  );
}
