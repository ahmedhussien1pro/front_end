import React from "react";
import "./404.css";
import { Link } from "react-router-dom";

export default function Error404() {
  return (
    <section className="page_404">
      <div>
        <div className="four_zero_four_bg">
          <h1>404</h1>
        </div>
        <div className="contant_box_404">
          <h3>Oops! Page Not Found</h3>
          <p>The page you're looking for doesn't exist or has been moved.</p>
          <Link to="/" className="link_404">
            Go Back Home
          </Link>
        </div>
      </div>
    </section>
  );
}
