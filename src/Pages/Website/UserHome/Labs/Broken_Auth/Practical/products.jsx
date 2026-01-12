import React from "react";
import { Link } from "react-router-dom";
import "./products.css";

// Importing images
import product1Image from "../../../assets/img/Broken Authentication/Products/appe-index.avif";
import product2Image from "../../../assets/img/Broken Authentication/Products/Burger.png";
import product3Image from "../../../assets/img/Broken Authentication/Products/chicken-wing.avif";
import product4Image from "../../../assets/img/Broken Authentication/Products/Dragon-fruit-drink.png";
import product5Image from "../../../assets/img/Broken Authentication/Products/index-burger.avif";
import product6Image from "../../../assets/img/Broken Authentication/Products/index-pizza.jpg";
import product7Image from "../../../assets/img/Broken Authentication/Products/samosa.avif";
import product8Image from "../../../assets/img/Broken Authentication/Products/service-3.jpg";

export default function Products() {
  const products = [
    {
      id: 1,
      name: "Product 1",
      price: "$10",
      image: product1Image,
      description:
        "A delicious apple-based dessert with a crispy crust and warm, sweet filling.",
    },
    {
      id: 2,
      name: "Product 2",
      price: "$20",
      image: product2Image,
      description:
        "A juicy and flavorful burger made with premium ingredients and served fresh.",
    },
    {
      id: 3,
      name: "Product 3",
      price: "$30",
      image: product3Image,
      description:
        "Crispy and tender chicken wings seasoned to perfection for any occasion.",
    },
    {
      id: 4,
      name: "Product 4",
      price: "$40",
      image: product4Image,
      description:
        "A refreshing dragon fruit drink that's as vibrant as it is tasty.",
    },
    {
      id: 5,
      name: "Product 5",
      price: "$50",
      image: product5Image,
      description:
        "A gourmet burger crafted with care, featuring bold flavors and fresh toppings.",
    },
    {
      id: 6,
      name: "Product 6",
      price: "$15",
      image: product6Image,
      description:
        "Classic pizza with a crispy crust, gooey cheese, and a variety of toppings.",
    },
    {
      id: 7,
      name: "Product 7",
      price: "$55",
      image: product7Image,
      description:
        "Golden-fried samosas stuffed with a savory filling, perfect as a snack or appetizer.",
    },
    {
      id: 8,
      name: "Product 8",
      price: "$16",
      image: product8Image,
      description:
        "A delightful dessert with layers of flavor that are sure to satisfy your sweet tooth.",
    },
  ];

  return (
    <div>
      <div className="lab4-products-container">
        <h1 className="lab4-products-title">Our Products</h1>
        <div className="lab4-products-grid">
          {products.map((product) => (
            <div key={product.id} className="product-card secondary-bg">
              <img
                src={product.image}
                alt={product.name}
                className="lab4-product-image"
              />
              <h2 className="lab4-product-name">{product.name}</h2>
              <p className="lab4-product-price">{product.price}</p>
              <p className="lab4-product-description">{product.description}</p>
            </div>
          ))}
        </div>
        <Link
          to="/broken-auth/Broken_Authentication_Lab"
          className="lab4-back-home-link"
        >
          Back to the Previous Page
        </Link>
      </div>
    </div>
  );
}
