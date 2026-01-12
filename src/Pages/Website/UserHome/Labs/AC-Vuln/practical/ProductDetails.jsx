import React from "react";
import { useParams } from "react-router-dom";
import "./Lab_Style.css";
import products from "./data.json";

export default function ProductDetails() {
  const { id } = useParams();
  const product = products.find((prod) => prod.id === parseInt(id));

  if (!product) {
    return <div>Product not found</div>;
  }

  return (
    <div className="product-details">
      <div className="product-details__image">
        <img src={product.image} alt={product.title} />
      </div>
      <div className="product-details__content">
        <h2>{product.title}</h2>
        <p>{product.description}</p>
        <p className="product-details__price">${product.price}</p>
        <div className="product-details__rating">
          Rating: {product.rating.rate} ({product.rating.count} reviews)
        </div>
      </div>
    </div>
  );
}
