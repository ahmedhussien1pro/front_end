import React, { useState, useEffect } from "react";
import Navigation from "./Navigation";
import UserImage from "../defultUser.jpg";
import ThemeSwitcher from "../../../../Components/ThemeSwitcher/ThemeSwitcher";
const MyAccountPage = () => {
  const [user, setUser] = useState({
    email: "",
    name: "",
    balance: 0,
  });

  useEffect(() => {
    const loggedIn = localStorage.getItem("loggedIn1") === "true";
    if (!loggedIn) {
      window.location.href = "/BL-Vuln/BL_Vuln_labs/first_lab/login";
    } else {
      const email = localStorage.getItem("userEmail") || "";
      const name = localStorage.getItem("userName") || "";
      const balance = parseFloat(localStorage.getItem("userBalance") || "0");
      setUser({ email, name, balance });
    }
  }, []);

  return (
    <>
      <ThemeSwitcher />

      <div className="my-account-page primary-bg d-flex flex-column min-vh-100">
        <Navigation />

        <main className="container my-5 flex-grow-1">
          <h2 className="products-page-title mb-4 main-color fw-bold">
            Your Account <i className="fas fa-user-circle me-2"></i>
          </h2>

          <div className="card shadow border-0 hover-translate w-100">
            <div className="row g-0">
              <div className="col-md-4 d-flex align-items-center justify-content-center secondary-bg">
                <img
                  src={UserImage}
                  alt="Default User"
                  className="img-fluid rounded-circle p-3"
                  style={{ maxWidth: "200px" }}
                />
              </div>

              <div className="col-md-8 secondary-bg">
                <div className="card-body text-center text-md-start w-100">
                  <h5 className="card-title display-6 mb-3">
                    Hello,{" "}
                    <strong className="text-danger">
                      {user.name || "User"} !
                    </strong>
                  </h5>
                  <p className="card-text fs-5">
                    <i className="fas fa-envelope text-primary me-2"></i>
                    <strong>Your Email:</strong>{" "}
                    <span className="text-info">{user.email}</span>
                  </p>
                  <p className="card-text fs-5">
                    <i className="fas fa-wallet text-success me-2"></i>
                    <strong>Your Balance:</strong>{" "}
                    <span className="text-info">{user.balance.toFixed(2)}</span>{" "}
                    <span className="text-success">$</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </main>
        <footer className="secondary-bg text-center py-3 mt-4">
          <div className="container">
            <p className="mb-0 primary-text">
              © 2025 CyberLabs. All rights reserved.
            </p>
          </div>
        </footer>
      </div>
    </>
  );
};

export default MyAccountPage;
