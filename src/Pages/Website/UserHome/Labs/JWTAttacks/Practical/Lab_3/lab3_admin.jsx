import React, { useState } from "react";
import JWTAdmin from "../Components/JWTAdmin";
import { jwtDecode } from "jwt-decode";
import Cookie from "cookie-universal";

export default function JWTAttacks_lab3() {
  const tokenName = "jwtToken_1";
  const [username, setUsername] = useState("");
  const cookie = Cookie();
  const [token, setToken] = useState(null);
  if (token) {
    setToken(jwtDecode(cookie.get(tokenName)));
    setUsername(token.username);
  }
  const apiEndpoint =
    "https://digitopia-project-backend.vercel.app/api/lab3jwt";
  const lab = "lab3";
  const condition = username === "admin";
  return (
    <div>
      <JWTAdmin
        apiEndpoint={apiEndpoint}
        lab={lab}
        tokenName={tokenName}
        condition={condition}
      />
    </div>
  );
}
