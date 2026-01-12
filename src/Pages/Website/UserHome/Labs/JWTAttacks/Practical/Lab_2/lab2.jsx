import React from "react";
import JWTLogin from "../Components/JWTLogin";

export default function JWTAttacks_lab2() {
  const apiEndpoint =
    "https://digitopia-project-backend.vercel.app/api/lab2jwt";
  const tokenName = "jwtToken_2";
  const hint =
    "This lab uses a JWT-based mechanism for handling sessions. The server is insecurely configured to accept unsigned JWTs. To solve the lab, modify your session token to gain access to the admin panel at <strong>/admin</strong>, then delete the user <strong>ALi</strong> .You can log in to your own account using the following <strong>credentials: cyber : clab</strong><br/>Try modifying the JWT using Burp Suites JWT Editor to solve the lab! 🚀";
  const lab = "lab2";
  return (
    <div>
      <JWTLogin
        apiEndpoint={apiEndpoint}
        hint={hint}
        lab={lab}
        tokenName={tokenName}
      />
    </div>
  );
}
