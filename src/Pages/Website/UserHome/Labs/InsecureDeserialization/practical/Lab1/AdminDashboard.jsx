import React from "react";
import "./testpage.css";
import ThemeSwitcher from "../../../../Components/ThemeSwitcher/ThemeSwitcher";

export default function AdminDashboard() {
  return (
    <>
      <ThemeSwitcher />
      <div className="test-page-container">
        <div className="test-page-content">
          <h1 className="test-page-title">Dashboard Page</h1>
          <p className="test-page-text">Welcome Admin!!</p>
        </div>
      </div>
    </>
  );
}
