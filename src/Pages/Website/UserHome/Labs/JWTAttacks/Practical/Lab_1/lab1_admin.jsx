import React, { useEffect, useState } from "react";
import JWTAdmin from "../Components/JWTAdmin";
import { jwtDecode } from "jwt-decode";
import Cookie from "cookie-universal";

export default function JWTAttacks_lab1() {
  const tokenName = "jwtToken_1";
  const [username, setUsername] = useState("");
  const cookie = Cookie();

  useEffect(() => {
    const storedToken = cookie.get(tokenName);
    if (storedToken) {
      try {
        const decoded = jwtDecode(storedToken);
        setUsername(decoded.username);
      } catch (error) {
        console.error("Invalid token:", error);
      }
    }
  }, [tokenName, cookie]); // Runs only when tokenName changes

  const apiEndpoint =
    "https://digitopia-project-backend.vercel.app/api/lab1jwt";
  const lab = "lab1";
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
