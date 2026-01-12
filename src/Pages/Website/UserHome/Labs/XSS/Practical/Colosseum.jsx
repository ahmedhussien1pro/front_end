import React, { useEffect, useState } from "react";
import "./Tours.css";
import colosseumImage from "../../../assets/img/seven_lab/Picture7.jpg";
import Header from "../../../Header/Header";
import Alert from "./Alert";

export default function Colosseum() {
  const [selectedCountry, setSelectedCountry] = useState("");
  const [countries] = useState(["USA", "Canada", "UK"]);
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
        <h1>Unveiling the Secrets of the Colosseum</h1>

        <img src={colosseumImage} alt="Colosseum" className="tour-image" />

        <p className="tour-description">
          Imagine stepping back in time to witness the gladiatorial contests and
          public spectacles that once captivated ancient Rome. The Colosseum, an
          architectural marvel, offers a glimpse into this bygone era. As you
          approach this iconic amphitheater, its imposing structure and
          weathered facade evoke a sense of awe.
          <br />
          <br />
          Entering the Colosseum, you're transported to a world of ancient
          history. The elliptical arena, once filled with sand and the roar of
          the crowd, now stands as a testament to Roman engineering prowess. The
          towering arches and intricate details of the outer walls showcase the
          skill and artistry of the Roman people.
          <br />
          <br />
          As you explore the Colosseum's interior, you can almost visualize the
          gladiators and wild animals that once battled within its confines. The
          underground hypogeum, where the gladiators and animals were prepared
          for their performances, offers a fascinating glimpse into the
          behind-the-scenes workings of this ancient spectacle.
          <br />
          <br />
          Climbing to the upper tiers of the Colosseum, you're rewarded with
          breathtaking panoramic views of Rome. The city's historic center, with
          its iconic landmarks like the Roman Forum and the Palatine Hill,
          unfolds before your eyes. The juxtaposition of ancient ruins and
          modern-day life creates a captivating tapestry of Rome's rich history.
          <br />
          <br />A visit to the Colosseum is not complete without experiencing
          its grandeur from the outside. As the sun sets, the Colosseum is
          bathed in a warm glow, casting long shadows and creating a magical
          atmosphere. The sight of this ancient monument against the backdrop of
          a vibrant Roman sky is truly unforgettable.
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
                setAlertMessage("Please select a country before reserving.");
                setShowAlert(true);
              }
            }}
          >
            <option value="" disabled>
              -- Select a Country --
            </option>
            {countries.map((country) => (
              <option key={country} value={country}>
                {country}
              </option>
            ))}
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
