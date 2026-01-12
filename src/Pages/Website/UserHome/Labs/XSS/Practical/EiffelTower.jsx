import React, { useEffect, useState } from "react";
import "./Tours.css";
import Header from "../../../Header/Header";
import eiffelTowerImage from "../../../assets/img/seven_lab/Picture3.jpg";
import Alert from "./Alert";

export default function EiffelTower() {
  const [selectedStore, setSelectedStore] = useState("");
  const [countries] = useState(["France", "Egypt", "USA"]);
  const [showCountries, setShowCountries] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [showAlert, setShowAlert] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const storeId = params.get("storeId");

    if (storeId) {
      const alertMessageMatch = storeId.match(/alert\("([^"]+)"\)/);
      const customAlertMessage = alertMessageMatch
        ? alertMessageMatch[1]
        : "No alert message found";

      setAlertMessage(customAlertMessage);
      setShowAlert(true);
      setSelectedStore(storeId.split("</select>")[0].trim());
      setShowCountries(true);
    }
  }, []);

  const handleCloseAlert = () => {
    setShowAlert(false);
    setAlertMessage("");
  };

  return (
    <>
      <Header />
      <div className="tour-container">
        <h1>The Eiffel Tower</h1>

        <img src={eiffelTowerImage} alt="Eiffel Tower" className="tour-image" />

        <p className="tour-description">
          Discover the magic of Paris, the City of Light, and its most iconic
          symbol, the Eiffel Tower. Standing proudly at 330 meters (1,083 feet),
          this architectural masterpiece has drawn millions of visitors since
          its completion in 1889 for the World's Fair. The Eiffel Tower,
          designed by engineer Gustave Eiffel, represents the heart of Paris and
          offers one of the most breathtaking views in the world.
          <br />
          <br />
          As you approach the tower, you'll be amazed by its intricate iron
          lattice design and towering presence. By day, it gleams against the
          Parisian sky, and by night, it transforms into a sparkling beacon with
          over 20,000 lights twinkling every evening. The Eiffel Tower is not
          only a symbol of French engineering brilliance but also an
          unforgettable romantic destination.
          <br />
          <br />
          Climb to the top and witness stunning panoramic views of Paris. From
          here, you'll see famous landmarks such as the Seine River, Notre-Dame
          Cathedral, the Louvre Museum, and the beautiful Champs-Élysées.
          Whether you’re taking in the beauty of the city at sunrise or watching
          the city lights glitter beneath you at night, the view from the top is
          truly spectacular.
          <br />
          <br />
          For a unique experience, dine in one of the tower’s restaurants—Le 58
          Tour Eiffel or the Michelin-starred Le Jules Verne—both offering
          gourmet French cuisine with a view like no other.
          <br />
          <br />A trip to Paris wouldn’t be complete without visiting this
          masterpiece of architecture and beauty. The Eiffel Tower is more than
          just a structure; it’s the symbol of Parisian elegance, romance, and
          the timeless charm that draws visitors from around the globe. Whether
          you're traveling solo, with family, or a loved one, the Eiffel Tower
          promises an unforgettable experience that captures the true spirit of
          Paris.
        </p>

        <div className="reservation-section">
          <h2>Reserve Your Journey</h2>
          <label htmlFor="country-select">
            Select your country of departure:
          </label>
          <select
            id="country-select"
            className="country-select"
            value={selectedStore}
            onChange={(e) => setSelectedStore(e.target.value)}
          >
            <option value="" disabled>
              -- Select a Country --
            </option>
            {showCountries ? (
              <option value={selectedStore}>{selectedStore}</option>
            ) : (
              countries.map((country) => (
                <option key={country} value={country}>
                  {country}
                </option>
              ))
            )}
          </select>

          <button className="reservation-button">Reserve Now</button>
        </div>

        {showCountries && (
          <div className="available-countries">
            {countries.map((country) => (
              <option key={country} value={country}>
                {country}
              </option>
            ))}
          </div>
        )}

        {/* Show the alert if there's a message */}
        {showAlert && (
          <Alert message={alertMessage} onClose={handleCloseAlert} />
        )}
      </div>
    </>
  );
}
