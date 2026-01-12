import React, { useState, useEffect } from "react";
import Navigation from "./Navigation";
import ThemeSwitcher from "../../../../Components/ThemeSwitcher/ThemeSwitcher";
import "../Lab_Style.css";
const CartPage = () => {
  const [cart, setCart] = useState([]);
  const BASE_URL = "http://localhost:8080/api";

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(storedCart);
  }, []);

  const updateQuantity = (index, newQuantity) => {
    const updatedCart = [...cart];
    updatedCart[index].quantity = newQuantity;
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const removeItem = (index) => {
    const updatedCart = [...cart];
    updatedCart.splice(index, 1);
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const handleCheckout = async () => {
    if (localStorage.getItem("loggedIn2") !== "true") {
      alert("Please log in to checkout");
      return;
    }

    const userBalance = parseFloat(localStorage.getItem("userBalance")) || 0;
    const items = cart.map((item) => ({
      id: item.id,
      price: item.price,
      quantity: item.quantity,
    }));
    const totalPrice = cart.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );

    const payload = {
      items,
      totalPrice,
      userBalance,
    };

    try {
      const userId = localStorage.getItem("userId");
      const response = await fetch(
        `${BASE_URL}/bLVuln-cart/checkout/${userId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      );
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || "Checkout failed");
      }
      alert("Order placed successfully!");
      setCart([]);
      localStorage.removeItem("cart");
    } catch (error) {
      alert("Error placing order: " + error.message);
    }
  };

  return (
    <>
      <ThemeSwitcher />
      <div className="Custom__body--bg">
        <Navigation />
        <div className="container mt-5 d-flex flex-column min-vh-100">
          <h2 className=" mb-4 main-color fw-bold">
            <i className="fas fa-shopping-cart me-2"></i>
            Your Cart{" "}
            <span className=" text-danger">
              ({cart.reduce((acc, item) => acc + item.quantity, 0)}{" "}
              {cart.reduce((acc, item) => acc + item.quantity, 0) === 1
                ? "item"
                : "items"}
              )
            </span>
          </h2>

          <div className="card shadow border-0 mb-4 w-100">
            <div className="card-header primary-text">
              <strong>Shopping Details</strong>
            </div>

            <div className="card-body p-0">
              <table className="table table-hover align-middle mb-0 custom__table">
                <thead>
                  <tr>
                    <th scope="col">Item</th>
                    <th scope="col">Price</th>
                    <th scope="col">Quantity</th>
                    <th scope="col">Total</th>
                    <th scope="col">Remove</th>
                  </tr>
                </thead>
                <tbody>
                  {cart.map((item, index) => (
                    <tr key={item.id}>
                      <td>{item.title}</td>
                      <td>${item.price.toFixed(2)}</td>
                      <td style={{ maxWidth: "80px" }}>
                        <input
                          type="number"
                          value={item.quantity}
                          min="1"
                          onChange={(e) =>
                            updateQuantity(
                              index,
                              parseInt(e.target.value, 10) || 1
                            )
                          }
                          className="form-control form-control-sm"
                        />
                      </td>
                      <td>${(item.price * item.quantity).toFixed(2)}</td>
                      <td>
                        <button
                          onClick={() => removeItem(index)}
                          className="btn btn-danger btn-sm d-flex align-items-center"
                        >
                          <i className="fas fa-trash me-1 text-white"></i>
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="d-flex justify-content-between align-items-center">
            <h4 className="text-success">
              Grand Total: $
              {cart
                .reduce((total, item) => total + item.price * item.quantity, 0)
                .toFixed(2)}
            </h4>
            <button onClick={handleCheckout} className="btn btn-lg btn-success">
              <i className="fas fa-cart-plus me-2 "></i>
              Buy Now
            </button>
          </div>
        </div>

        <footer className="secondary-bg primary-text text-center py-3 mt-auto">
          <div className="container">
            <p className="mb-0">© 2025 CyberLabs. All rights reserved.</p>
          </div>
        </footer>
      </div>
    </>
  );
};

export default CartPage;
