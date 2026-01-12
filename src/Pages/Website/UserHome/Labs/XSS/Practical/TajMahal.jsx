import React, { useEffect, useState } from "react";
import "./Tours.css";
import Header from "../../../Header/Header";
import tajMahalImage from "../../../assets/img/seven_lab/Picture5.jpg";
import Alert from "./Alert";

export default function TajMahal() {
  const [selectedCountry, setSelectedCountry] = useState("");
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
        <h1>The Taj Mahal</h1>

        <img src={tajMahalImage} alt="Taj Mahal" className="tour-image" />

        <p className="tour-description">
          The Taj Mahal is a symbol of eternal love, built by the Mughal emperor
          Shah Jahan in memory of his beloved wife Mumtaz Mahal. Completed in
          1653, this stunning white marble mausoleum stands as one of the most
          iconic architectural masterpieces in the world. Located on the banks
          of the Yamuna River in Agra, India, the Taj Mahal captivates visitors
          with its breathtaking beauty and serene ambiance.
          <br />
          <br />
          The architecture of the Taj Mahal reflects a perfect blend of Islamic,
          Persian, and Indian styles. Its towering dome, elegant minarets, and
          intricate marble inlay work featuring precious stones create an
          awe-inspiring sight. As the sun rises and sets, the white marble seems
          to change color, shifting from soft pink in the morning light to
          golden hues at sunset, offering a magical experience to all who visit.
          <br />
          <br />
          The gardens surrounding the Taj Mahal, known as the Charbagh, are
          symmetrically designed and add to the tranquility of the monument. The
          long reflecting pool running down the middle of the gardens mirrors
          the beauty of the Taj Mahal, creating a picture-perfect view from
          every angle.
          <br />
          <br />
          Inside the Taj Mahal, visitors can admire the delicate carvings and
          the tomb of Mumtaz Mahal, which is adorned with exquisite marble
          lattice screens and intricate floral motifs. The monument not only
          represents a love story but also showcases the incredible
          craftsmanship of the Mughal era.
          <br />
          <br />
          Whether you’re exploring India’s rich cultural history or simply
          seeking a peaceful place of reflection, the Taj Mahal offers a truly
          unforgettable experience. A visit to this UNESCO World Heritage Site
          is a journey into the heart of India's architectural and emotional
          heritage.
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
            onChange={(e) => setSelectedCountry(e.target.value)}
          >
            <option value="" disabled>
              -- Select a Country --
            </option>
            <option value="india">India</option>
            <option value="usa">USA</option>
            <option value="uk">UK</option>
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
