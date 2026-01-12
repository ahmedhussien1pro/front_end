import React, { useEffect, useState } from "react";
import "./Tours.css";
import Header from "../../../Header/Header";
import chichenItzaImage from "../../../assets/img/seven_lab/Picture4.jpg";
import Alert from "./Alert";

export default function ChichenItza() {
  const [selectedStore, setSelectedStore] = useState("");
  const [countries] = useState(["Mexico", "USA", "Canada"]);
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
        <h1>The Pyramid of Chichén Itzá</h1>

        <img src={chichenItzaImage} alt="Chichén Itzá" className="tour-image" />

        <p className="tour-description">
          Step back in time and explore the majestic Pyramid of Chichén Itzá,
          one of the New Seven Wonders of the World. Located in the Yucatán
          Peninsula, this ancient site was once a thriving city of the Maya
          civilization. The most famous structure here is "El Castillo" or the
          Temple of Kukulkan, a pyramid that rises 30 meters (98 feet) high,
          designed with impressive architectural precision.
          <br />
          <br />
          The pyramid reflects the Maya’s advanced understanding of astronomy
          and mathematics. Each of the pyramid’s four sides has 91 steps, which,
          when combined with the top platform, total 365—the number of days in
          the solar year. During the spring and autumn equinoxes, a fascinating
          phenomenon occurs: the sun casts shadows along the pyramid’s steps
          that resemble a serpent slithering down, symbolizing the descent of
          the god Kukulkan.
          <br />
          <br />
          Surrounded by lush green vegetation and bathed in the warm Mexican
          sun, the pyramid offers not only a glimpse into the ingenuity of
          ancient builders but also a sense of wonder and mysticism. Visitors
          can explore nearby temples, the Great Ball Court, and sacred cenotes,
          immersing themselves in the stories and rituals of the Maya people.
          <br />
          <br />
          Whether you’re a history enthusiast or a casual traveler, a visit to
          Chichén Itzá is an awe-inspiring journey into the heart of one of the
          most advanced civilizations of the ancient world.
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
