import React, { useState, useEffect } from "react";
import Navigation from "./Navigation";
import ProductCard from "./ProductCard";
import ThemeSwitcher from "../../../../Components/ThemeSwitcher/ThemeSwitcher";
const ProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(storedCart);

    fetch("https://fakestoreapi.com/products")
      .then((res) => res.json())
      .then((data) => setProducts(data));
  }, []);

  const addToCart = (product) => {
    const existingItem = cart.find((item) => item.id === product.id);
    let updatedCart;
    if (existingItem) {
      updatedCart = cart.map((item) =>
        item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
      );
    } else {
      updatedCart = [...cart, { ...product, quantity: 1 }];
    }
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  return (
    <>
      <ThemeSwitcher />
      <div className="products-page primary-bg">
        <Navigation />
        <main className="container ">
          <h1 className="my-5 text-center main-color">Our Products 🛍️ </h1>
          <div className="row">
            {products.map((product) => (
              <div key={product.id} className="col-md-4 mb-4">
                <ProductCard product={product} addToCart={addToCart} />
              </div>
            ))}
          </div>
        </main>
        <footer className="secondary-bg text-center py-3 mt-4">
          <div className="container">
            <p className="mb-0 primary-text">
              © 2025 CyberLabs. All rights reserved.
            </p>
          </div>
        </footer>
      </div>
    </>
  );
};

export default ProductsPage;
