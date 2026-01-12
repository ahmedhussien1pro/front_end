import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import ThemeSwitcher from "../../../../Components/ThemeSwitcher/ThemeSwitcher";
const Navigation = () => {
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("loggedIn2") === "true";
    setLoggedIn(isLoggedIn);
  }, []);

  const handleLogout = () => {
    localStorage.setItem("loggedIn2", "false");
    setLoggedIn(false);
  };

  return (
    <>
      <ThemeSwitcher />
      <nav className="custom-nav">
        <ul className="custom-nav__list">
          <li className="custom-nav__item">
            <Link to="/BL-Vuln/BL_Vuln_labs/second_lab/cart">Cart</Link>
          </li>
          <li className="custom-nav__item">
            <Link to="/BL-Vuln/BL_Vuln_labs/second_lab">Shopping</Link>
          </li>
          <li className="custom-nav__item">
            <Link to="/BL-Vuln/BL_Vuln_labs/second_lab/myaccount">MyAcc</Link>
          </li>
          {loggedIn ? (
            <li className="custom-nav__item">
              <button onClick={handleLogout} className="btn btn-link">
                Logout
              </button>
            </li>
          ) : (
            <li className="custom-nav__item">
              <Link to="/BL-Vuln/BL_Vuln_labs/second_lab/login">Login</Link>
            </li>
          )}
        </ul>
      </nav>
    </>
  );
};

const DetailPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    fetch(`https://fakestoreapi.com/products/${id}`)
      .then((res) => res.json())
      .then((data) => setProduct(data));
  }, [id]);

  if (!product) return <h2>Loading...</h2>;

  return (
    <div className="Custom__body--bg">
      <Navigation />
      <div className="container mt-5  min-vh-100">
        <h2 className=" text-center mb-4 main-color fw-bold">
          {product.title}
        </h2>
        <img
          src={product.image}
          alt={product.title}
          className="img-fluid"
          style={{ maxWidth: "300px" }}
        />
        <p>{product.description}</p>
        <h4>${product.price.toFixed(2)}</h4>
        <Link to="/BL-Vuln/BL_Vuln_labs/first_lab" className="btn go-to">
          Back to Shopping
        </Link>
      </div>
      <footer className="secondary-bg primary-text text-center py-3 mt-auto ">
        <div className="container">
          <p className="mb-0">© 2025 CyberLabs. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default DetailPage;
