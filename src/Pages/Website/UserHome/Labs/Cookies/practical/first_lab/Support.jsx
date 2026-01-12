import React from "react";
import { useEffect } from "react";
import "../Support.css";
import support from "../../../../assets/img/support.png";
import { useNavigate } from "react-router-dom";
import Cookie from "cookie-universal";

export default function Support() {
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
      <div class="container-support">
        <div class="row-support">
          <h1>We're Support, How Can I Help You?</h1>
          <img src={support} alt="" />
        </div>
      </div>
    </>
  );
}
