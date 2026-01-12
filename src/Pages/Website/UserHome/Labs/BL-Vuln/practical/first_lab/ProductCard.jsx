import React, { useState } from "react";
import { Link } from "react-router-dom";

const ProductCard = ({ product, addToCart }) => {
  const [clicked, setClicked] = useState(false);

  const handleBuy = () => {
    addToCart(product);
    setClicked(true);
  };

  const handleRemove = () => {
    setClicked(false);
  };

  const trimmedTitle = product.title.split(" ").slice(0, 3).join(" ");

  return (
    <div className="my-product-card">
      <div className="product-card__container">
        <div
          className="product-card__top"
          style={{
            backgroundImage: `url(${product.image})`,
          }}
        ></div>
        <div
          className={`product-card__bottom ${
            clicked ? "product-card__bottom--clicked" : ""
          }`}
        >
          <div className="product-card__left">
            <div className="product-card__details">
              <h1 className="product-card__title">{trimmedTitle}</h1>
              <p className="product-card__price">${product.price.toFixed(2)}</p>
            </div>
            <div className="product-card__buy" onClick={handleBuy}>
              <i className="material-icons">add_shopping_cart</i>
            </div>
          </div>
          <div className="product-card__right">
            <div className="product-card__done">
              <i className="material-icons">done</i>
            </div>
            <div className="product-card__details product-card__details--right">
              <h1 className="product-card__title">{trimmedTitle}</h1>
              <p className="product-card__added">Added to your cart</p>
            </div>
            <div className="product-card__remove" onClick={handleRemove}>
              <i className="material-icons">clear</i>
            </div>
          </div>
        </div>
      </div>
      <div className="product-card__inside">
        <div className="product-card__icon">
          <i className="material-icons">info_outline</i>
        </div>
        <div className="product-card__contents">
          <div className="product-card__info">
            <div className="product-card__info-item">
              <span className="product-card__info-label">Category:</span>
              <span className="product-card__info-text">
                {product.category}
              </span>
            </div>
            <div className="product-card__info-item">
              <span className="product-card__info-label">Rating:</span>
              <span className="product-card__info-text">
                {product.rating.rate}
              </span>
            </div>
            <div className="product-card__info-item">
              <span className="product-card__info-label">Count:</span>
              <span className="product-card__info-text">
                {product.rating.count}
              </span>
            </div>
            <div className="product-card__info-item">
              <span className="product-card__info-label">Description:</span>
              <span className="product-card__info-text">
                {product.description.substring(0, 50)}...
              </span>
            </div>
            <div className="product-card__info-item">
              <span className="product-card__info-label">Show More</span>
              <span className="product-card__info-text">
                <Link
                  to={`/BL-Vuln/BL_Vuln_labs/first_lab/ProductDetail/${product.id}`}
                  className="text-danger"
                >
                  Click Here
                </Link>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
