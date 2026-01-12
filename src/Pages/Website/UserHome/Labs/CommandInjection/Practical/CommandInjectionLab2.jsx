import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import GOBack from "../../../Components/GoBack_Btn/GoBack_Btn";
import ShowHint from "../../../Components/ShowHint_Btn/ShowHint_Btn";
import "./CommandInjectionLabs.css";
import Image1 from "../../../assets/img/Command Injection/resim.jpg";
import Image2 from "../../../assets/img/Command Injection/resim2.jpg";
import Image3 from "../../../assets/img/Command Injection/resim3.jpg";
import ThemeSwitcher from "../../../Components/ThemeSwitcher/ThemeSwitcher";

export default function CommandInjectionLab2() {
  const hintMessage = `<p>Try to add “;” to the URL </p>`;
  const navigate = useNavigate();
  const location = useLocation();
  const [showStock, setShowStock] = useState(null);
  const [apiResponse, setApiResponse] = useState("");
  const searchParams = new URLSearchParams(location.search);
  const productId = searchParams.get("product_id");
  const queryParams = location.search;

  let ip = "";
  if (productId) {
    const match = productId.match(/^\d+(.*)$/);
    ip = match && match[1] ? match[1].trim() : "";
  }
  const isValidInput = (input) => {
    const regex = /^[a-zA-Z0-9\s.\-;:,=()]+$/;
    return regex.test(input);
  };

  useEffect(() => {
    if (ip) {
      const validIp = isValidInput(ip) ? ip : "";

      if (!validIp) {
        setApiResponse("Error: Invalid input format");
        return;
      }
      console.log("Sending valid input:", validIp);
      const requestData = { ip: validIp, queryParams: queryParams };
      console.log("Request Data:", requestData);

      fetch(
        "https://digitopia-project-backend.vercel.app/api/commendInjectionLab2",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(requestData),
        }
      )
        .then((response) => {
          if (!response.ok) {
            console.error(
              "Error response:",
              response.status,
              response.statusText
            );
            throw new Error("Error: Unable to connect to API");
          }
          return response.json();
        })
        .then((data) => setApiResponse(data.result || "Unexpected response"))
        .catch((error) => {
          console.error(error);
          setApiResponse("Error: Unable to connect to API");
        });
    }
  }, [ip, queryParams]);
  const generateStockMessage = (stockCount) => {
    return `Stock: ${stockCount} Pieces`;
  };
  const handleCardClick = (cardId) => {
    setApiResponse("");
    setShowStock(cardId);
    navigate(`?product_id=${cardId}`);
  };

  return (
    <>
      <GOBack />
      <ShowHint hintText={hintMessage} />
      <ThemeSwitcher />
      <div className="page-container">
        <div className="image-container">
          <div className="image-card" onClick={() => handleCardClick(1)}>
            <img src={Image1} alt="Product 1" className="product-image" />
            <button className="check-button">Check</button>
          </div>
          <div className="image-card" onClick={() => handleCardClick(2)}>
            <img src={Image2} alt="Product 2" className="product-image" />
            <button className="check-button">Check</button>
          </div>
          <div className="image-card" onClick={() => handleCardClick(3)}>
            <img src={Image3} alt="Product 3" className="product-image" />
            <button className="check-button">Check</button>
          </div>
        </div>

        <div className="stock-info-container">
          {/* Show stock information only if showStock is set */}
          {showStock !== null && !apiResponse && (
            <p className="stock-info">
              {generateStockMessage(
                showStock === 1 ? 13 : showStock === 2 ? 26 : 25
              )}
            </p>
          )}

          {/* Show API response only if it's received */}
          {apiResponse && <p className="api-response">{apiResponse}</p>}
        </div>
      </div>
    </>
  );
}
