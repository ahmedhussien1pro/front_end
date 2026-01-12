import React from "react";
import { useEffect } from "react";
import "../Admin.css";
import admin from "../../../../assets/img/admin.png";
import Cookie from "cookie-universal";

import { useNavigate } from "react-router-dom";

export default function Admin() {
  const navigate = useNavigate();
  const cookie = Cookie();
  const userId = cookie.get("userId") || "";
  useEffect(() => {
    if (userId === "MQ==") {
      navigate(`/cookies/cookies_lab/second/admin`, { replace: true });
    } else if (userId === "OQ==") {
      navigate(`/cookies/cookies_lab/second/support`, { replace: true });
    } else {
      navigate(`/cookies/cookies_lab/second/login`, { replace: true });
    }
  }, [userId, navigate]);
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
