import React from "react";
import JWTLogin from "../Components/JWTLogin";

export default function JWTAttacks_lab1() {
  const apiEndpoint =
    "https://digitopia-project-backend.vercel.app/api/lab1jwt";
  const tokenName = "jwtToken_1";
  // const tokenPath = "jwtToken_1";
  const hint = `This lab uses a JWT-based mechanism for handling sessions. Due to implementation flaws, the server doesnt verify the signature of any JWTs that it receives.To solve the lab, modify your session token to gain access to the admin panel at<strong> /admin</strong>, then delete the user <strong>Ali</strong> . You can log in to your own account using the following <strong>credentials: cyber : clab</strong><br/>Try modifying the JWT using Burp Suites JWT Editor to solve the lab! 🚀`;
  const lab = "lab1";
  return (
    <div>
      <JWTLogin
        apiEndpoint={apiEndpoint}
        hint={hint}
        lab={lab}
        tokenName={tokenName}
        condition={`username==="admin"`}
      />
    </div>
  );
}
