import React, { useState, useEffect } from "react";
import "./Go2Top_Btn.css";
import Aos from "aos";
export default function Go2TopBtn() {
  const [isVisible, setIsVisible] = useState(false);

  // Check scroll position and show/hide button
  const toggleVisibility = () => {
    if (window.pageYOffset > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    window.addEventListener("scroll", toggleVisibility);
    return () => {
      window.removeEventListener("scroll", toggleVisibility);
    };
  }, []);
  useEffect(() => {
    Aos.init({ duration: 1000 });
  }, []);
  return (
    <button
      className={`go-to-top-btn ${isVisible ? "show" : ""}`}
      onClick={scrollToTop}
      data-aos="fade-up"
    >
      <i className="fas fa-arrow-up go-to-top-btn-icon"></i>
    </button>
  );
}
