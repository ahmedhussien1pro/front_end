import React, { useState } from "react";
import JWTAdmin from "../Components/JWTAdmin";
import { jwtDecode } from "jwt-decode";
import Cookie from "cookie-universal";

export default function JWTAttacks_lab2() {
  const tokenName = "jwtToken_2";
  const [username, setUsername] = useState("");
  const cookie = Cookie();
  const [token, setToken] = useState(null);
  if (token) {
    setToken(jwtDecode(cookie.get(tokenName)));
    setUsername(token.username);
  }
  const apiEndpoint =
    "https://digitopia-project-backend.vercel.app/api/lab2jwt";
  const lab = "lab2";
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
