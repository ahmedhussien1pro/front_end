import React from "react";
import ProductCard from "../ProductCard/ProductCard";
import "./ProductList.css";
import { Link } from "react-router-dom";
export default function ProductList({ products }) {
  return (
    <div className="product-list">
      {products.map((product) => (
        <div key={product.id}>
          <Link to={`/product/${product.id}`} >
            <ProductCard product={product} />
          </Link>
        </div>
      ))}
    </div>
  );
}
