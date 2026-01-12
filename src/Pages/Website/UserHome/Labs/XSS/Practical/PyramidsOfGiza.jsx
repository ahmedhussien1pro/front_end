import React, { useEffect, useState } from "react";
import "./Tours.css";
import Header from "../../../Header/Header";
import pyramidsImage from "../../../assets/img/seven_lab/Picture2.png";
import Alert from "./Alert";

export default function PyramidsOfGiza() {
  const [selectedStore, setSelectedStore] = useState("");
  const [countries] = useState(["Egypt", "France", "USA"]);
  const [showCountries, setShowCountries] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [showAlert, setShowAlert] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const storeId = params.get("storeId");

    if (storeId) {
      // Extract the alert message dynamically
      const alertMessageMatch = storeId.match(/alert\("([^"]+)"\)/);
      const customAlertMessage = alertMessageMatch
        ? alertMessageMatch[1]
        : "No alert message found";

      // Set the alert message to the extracted value
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
        <h1>The Pyramids of Giza</h1>

        <img
          src={pyramidsImage}
          alt="Pyramids of Giza"
          className="tour-image"
        />

        <p className="tour-description">
          Embark on an unforgettable journey to Egypt, a land where ancient
          history and modern beauty merge. At the heart of this timeless
          destination lies one of the most extraordinary wonders of the
          world—the Pyramids of Giza. These magnificent structures have stood
          the test of time for over 4,500 years, offering visitors a glimpse
          into the mysteries of the ancient Egyptian civilization.
          <br />
          <br />
          The Great Pyramid, built for the Pharaoh Khufu, is the largest of the
          three and remains one of the Seven Wonders of the Ancient World. As
          you stand before this architectural marvel, you’ll be awestruck by its
          sheer size and precision, crafted from millions of limestone blocks,
          each weighing several tons. Alongside it are the pyramids of Khafre
          and Menkaure, each with its own unique history and beauty.
          <br />
          <br />
          Surrounding these towering monuments is the stunning desert landscape,
          where the golden sands stretch endlessly under a bright blue sky. The
          contrast between the vast desert and the solid, eternal presence of
          the Pyramids creates a view that is nothing short of spectacular.
          <br />
          <br />
          A visit to the Pyramids would not be complete without seeing the Great
          Sphinx, the majestic half-human, half-lion statue that has guarded the
          tombs for millennia. As you explore, you’ll uncover fascinating
          stories of ancient rituals, the lives of the pharaohs, and the
          incredible achievements of the civilization that built these timeless
          structures.
          <br />
          <br />
          Whether you're a history enthusiast or simply seeking adventure, the
          Pyramids of Giza offer an experience unlike any other. Witness the
          magic of Egypt’s past while capturing moments that will last a
          lifetime.
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
