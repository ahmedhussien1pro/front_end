import React, { useEffect, useState } from "react";
import "../Lab_Style.css";
import { Link } from "react-router-dom";
import ProductList from "../../../../Components/ProductList/ProductList";
import GoBackBtn from "../../../../Components/GoBack_Btn/GoBack_Btn";
import products from "../data.json";
import ShowHintBtn from "../../../../Components/ShowHint_Btn/ShowHint_Btn";
import Go2TopBtn from "../../../../Components/Go2Top_Btn/Go2Top_Btn";

export default function Third_Lab() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const getCookie = (name) => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(";").shift();
    return null;
  };

  useEffect(() => {
    const loggedInStatus = getCookie("isLoggedIn");
    const adminStatus = getCookie("Admin");

    if (loggedInStatus === "true" && adminStatus === "true") {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  const hintMessage = `
  <ul style="text-align: left; font-size: 16px; line-height: 1.8;">
    <li>1. Browse to <code>/admin </code> and observe that you can't access the admin panel.</li>
    <li>2. Browse to the login page.</li>
    <li>3. In Burp Proxy, turn interception on and enable response interception.</li>
    <li>4. Complete and submit the login page, and forward the resulting request in Burp.</li>
    <li>5. Observe that the response sets the cookie <code>Admin=false</code>. Change it to <code>Admin=true</code>.</li>
    <li>6. Load the admin panel and delete <code>carlos</code>.</li>
  </ul>
`;

  return (
    <div className="Custom__body--bg">
      <GoBackBtn />
      <ShowHintBtn hintText={hintMessage} />
      <div className="container">
        <h1 style={{ textAlign: "center", marginBlock: "50px" }}>Products </h1>
        <Link to={`/AC-Vuln/AC_Vuln_labs/third_lab/login`} className="btn-main-color">Login</Link>
        {isLoggedIn && (
          <Link to={`/AC-Vuln/AC_Vuln_labs/third_lab/admin`}>Go to Admin</Link>
        )}
        <ProductList products={products} />
        <Go2TopBtn />
      </div>
    </div>
  );
}
