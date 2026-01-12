import React from "react";
import "./testpage.css";
import ThemeSwitcher from "../../../../Components/ThemeSwitcher/ThemeSwitcher";

export default function TestPage() {
  return (
    <>
      <ThemeSwitcher />
      <div className="test-page-container">
        <div className="test-page-content">
          <h1 className="test-page-title">Test Page</h1>
          <p className="test-page-text">Welcome user</p>
        </div>
      </div>
    </>
  );
}
