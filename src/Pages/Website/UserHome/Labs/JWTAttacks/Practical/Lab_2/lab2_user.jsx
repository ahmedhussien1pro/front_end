import React from "react";
import JWTUser from "../Components/JWTUser";

export default function JWTAttacks_lab2() {
  const apiEndpoint =
    "https://digitopia-project-backend.vercel.app/api/lab2jwt";
  const tokenName = "jwtToken_2";
  const hint = "lab2";
  const lab = "lab2";
  return (
    <div>
      <JWTUser
        hint={hint}
        lab={lab}
        tokenName={tokenName}
        apiEndpoint={apiEndpoint}
      />
    </div>
  );
}
