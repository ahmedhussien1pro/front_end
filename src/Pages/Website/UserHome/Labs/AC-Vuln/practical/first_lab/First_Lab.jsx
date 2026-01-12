import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import GoBackBtn from "../../../../Components/GoBack_Btn/GoBack_Btn";
import ShowHintBtn from "../../../../Components/ShowHint_Btn/ShowHint_Btn";
import Go2TopBtn from "../../../../Components/Go2Top_Btn/Go2Top_Btn";
import ThemeSwitcher from "../../../../Components/ThemeSwitcher/ThemeSwitcher";
export default function First_Lab() {
  const hintMessage = `
    <ul style="text-align: left; font-size: 16px; line-height: 1.8;">
      <li>1.
        Go to the lab and view <mark>robots.txt</mark> by appending
        <mark>/robots.txt</mark> to the lab URL. Notice that the 
        <mark>Disallow</mark> line discloses the path to the admin panel.
      </li>
      \n
      <li>2. 
        In the URL bar, replace <mark>/robots.txt</mark> with
        <mark>/administrator-panel</mark> to load the admin panel.
      </li>\n
      <li>3.
        Delete <mark>carlos</mark>.
      </li>
    </ul>
  `;
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`https://fakestoreapi.com/products`)
      .then((res) => {
        if (!res.ok) {
          throw new Error("Network response was not ok");
        }
        return res.text();
      })
      .then((text) => {
        if (!text) {
          throw new Error("No data returned");
        }
        return JSON.parse(text);
      })
      .then((data) => {
        setProducts(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);
  if (loading) {
    return (
      <div className="text-center mt-5">
        <h3>Loading products...</h3>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center mt-5">
        <h3>Error: {error}</h3>
      </div>
    );
  }
  return (
    <>
      <ThemeSwitcher />
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container">
          <Link className="navbar-brand" to="/AC-Vuln/AC_Vuln_labs">
            ShopZone
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <Link className="nav-link text-light" to="">
                  Cart 🛒
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className="nav-link text-light"
                  to="/AC-Vuln/AC_Vuln_labs/first_lab"
                >
                  Shopping
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link text-light" to="">
                  My Account
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className="btn btn-success px-3 ms-2 py-2"
                  to="/AC-Vuln/AC_Vuln_labs"
                >
                  🔑 Login
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <GoBackBtn />
      <ShowHintBtn hintText={hintMessage} />
      <div className="container">
        <h1 className="my-5 text-center">Our Products1 🛍️</h1>
        <div className="row">
          {products.map((product) => {
            // Trim the title to the first three words
            const trimmedTitle = product.title.split(" ").slice(0, 3).join(" ");
            return (
              <div key={product.id} className="col-md-4 mb-4">
                <div className="card shadow border-0">
                  <div
                    className="card-img-top"
                    style={{
                      backgroundImage: `url(${product.image})`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                      height: "300px",
                    }}
                  ></div>
                  <div className="card-body">
                    <h5 className="card-title">{trimmedTitle}</h5>
                    <p className="card-text text-success">
                      ${product.price.toFixed(2)}
                    </p>
                    <Link
                      to={`/AC-Vuln/AC_Vuln_labs/first_lab/ProductDetail/${product.id}`}
                      className="btn btn-primary"
                    >
                      Show More
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <Go2TopBtn />
      <footer className="bg-dark text-white text-center py-3 mt-4">
        <div className="container">
          <p className="mb-0">© 2025 ShopZone. All rights reserved.</p>
        </div>
      </footer>
    </>
  );
}
