import React, { useEffect, useState } from "react";
import "./Tours.css";
import hawaiiImage from "../../../assets/img/seven_lab/Picture6.jpg";
import Header from "../../../Header/Header";
import Alert from "./Alert";

export default function ParadiseOfHawaii() {
  const [selectedCountry, setSelectedCountry] = useState("");
  const [countries] = useState(["Mexico", "USA", "Canada"]);
  const [showCountries, setShowCountries] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

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
      setSelectedCountry(storeId.split("</select>")[0].trim());
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
        <h1>Paradise of Hawaii: A Tropical Dream</h1>

        <img
          src={hawaiiImage}
          alt="Paradise of Hawaii"
          className="tour-image"
        />

        <p className="tour-description">
          Hawaii, a tropical haven in the middle of the Pacific Ocean, offers
          some of the most breathtaking scenery in the world. With its rugged
          green mountains, stunning beaches, and vibrant ecosystems, Hawaii is
          the perfect destination for nature lovers, adventurers, and those
          seeking peace and relaxation.
          <br />
          <br />
          The islands are known for their dramatic landscapes, like the one
          captured in this image—a perfect blend of towering volcanic cliffs,
          rolling green valleys, and pristine coastlines lapped by turquoise
          waters. Whether you’re exploring the towering cliffs of the Na Pali
          Coast, hiking the volcanic craters of Haleakalā, or simply relaxing on
          the soft sands of Waikiki Beach, Hawaii has something for everyone.
          <br />
          <br />
          Snorkeling in the clear waters reveals colorful coral reefs and exotic
          marine life, while surfers can ride some of the best waves in the
          world. You can also immerse yourself in the rich cultural heritage of
          the islands, experiencing traditional hula dances, trying local
          dishes, or learning about the history of Hawaii’s native people.
          <br />
          <br />
          For those looking to explore, Hawaii’s islands offer endless
          possibilities. The Big Island is home to active volcanoes, Maui boasts
          incredible waterfalls and luxury resorts, Oahu is bustling with urban
          excitement in Honolulu, and Kauai is perfect for those who love hiking
          and untouched nature.
          <br />
          <br />
          Whether you’re after adventure, relaxation, or cultural exploration,
          Hawaii is a paradise that will leave you mesmerized by its beauty and
          unforgettable experiences.
        </p>

        <div className="reservation-section">
          <h2>Reserve Your Journey</h2>
          <label htmlFor="country-select">
            Select your country of departure:
          </label>
          <select
            id="country-select"
            className="country-select"
            value={selectedCountry}
            onChange={(e) => {
              setSelectedCountry(e.target.value);
              if (!e.target.value) {
                setShowCountries(true);
                setAlertMessage("Please select a country before reserving.");
                setShowAlert(true);
              }
            }}
          >
            <option value="" disabled>
              -- Select a Country --
            </option>
            {showCountries ? (
              <option value={selectedCountry}>{selectedCountry}</option>
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

        {showAlert && (
          <Alert message={alertMessage} onClose={handleCloseAlert} />
        )}
      </div>
    </>
  );
}
