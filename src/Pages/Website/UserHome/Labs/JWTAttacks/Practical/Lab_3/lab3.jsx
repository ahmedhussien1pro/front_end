import React from "react";
import JWTLogin from "../Components/JWTLogin";

export default function JWTAttacks_lab3() {
  const apiEndpoint =
    "https://digitopia-project-backend.vercel.app/api/lab3jwt";
  const tokenName = "jwtToken_1";
  // const tokenPath = "jwtToken_1";
  const hint = `This lab uses a JWT-based mechanism for handling sessions. <strong>It uses an extremely weak secret key</strong> to both sign and verify tokens. This can be easily brute-forced using a <a href='https://github.com/wallarm/jwt-secrets/blob/master/jwt.secrets.list'download>Wordlist of Common Secrets</a>.<br/>To solve the lab, first brute-force the website's secret key. Once you've obtained this, use it to sign a modified session token that gives you access to the admin panel at <strong>/admin</strong>, then delete the user <strong>Ali</strong> .You can log in to your own account using the following<br/> <strong>credentials: cyber : clab</strong> <br/> We also recommend using <strong>hashcat to brute-force the secret key</strong>. For details on how to do this, see Brute forcing secret keys using hashcat.<br/>Try modifying the JWT using Burp Suites JWT Editor to solve the lab! 🚀`;
  const lab = "lab3";
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
