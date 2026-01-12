import React from "react";
import { useEffect } from "react";
import "../Admin.css";
import admin from "../../../../assets/img/admin.png";
import Cookie from "cookie-universal";
import { useNavigate } from "react-router-dom";

export default function Admin() {
  const navigate = useNavigate();
  const cookie = Cookie();
  const role = cookie.get("role") || "";
  useEffect(() => {
    if (role === "admin") {
      navigate(`/cookies/cookies_lab/first/admin`, { replace: true });
    } else if (role === "support") {
      navigate(`/cookies/cookies_lab/first/support`, { replace: true });
    } else {
      navigate(`/cookies/cookies_lab/first/login`, { replace: true });
    }
  }, [role, navigate]);

  return (
    <>
      <div class="container-admin">
        <div class="row-admin">
          <h1>Admin, Please Leave Me</h1>
          <img src={admin} alt="" />
        </div>
      </div>
    </>
  );
}
