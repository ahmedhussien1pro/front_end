import React from "react";
import "./XSS_SEVEN.css";
import pyramidsImage from "../../../assets/img/seven_lab/Picture2.png";
import eiffelTowerImage from "../../../assets/img/seven_lab/Picture3.jpg";
import chichenItzaImage from "../../../assets/img/seven_lab/Picture4.jpg";
import tajMahalImage from "../../../assets/img/seven_lab/Picture5.jpg";
import hawaiiImage from "../../../assets/img/seven_lab/Picture6.jpg";
import colosseumImage from "../../../assets/img/seven_lab/Picture7.jpg";
import GoBack from "../../../Components/GoBack_Btn/GoBack_Btn";
import ShowHint from "../../../Components/ShowHint_Btn/ShowHint_Btn";

const cardData = [
  {
    id: 1,
    image: pyramidsImage,
    title: "The Pyramids of Giza",
    rating: 4.5,
    detailsLink: "/xss/xss_lab/seven_lab/details/Pyramids-of-Giza",
  },
  {
    id: 2,
    image: eiffelTowerImage,
    title: "The Eiffel Tower",
    rating: 4.0,
    detailsLink: "/xss/xss_lab/seven_lab/details/The-Eiffel-Tower",
  },
  {
    id: 3,
    image: chichenItzaImage,
    title: "The Pyramid of Chichén Itzá",
    rating: 4.8,
    detailsLink: "/xss/xss_lab/seven_lab/details/Pyramid-of-Chichén Itzá",
  },
  {
    id: 4,
    image: tajMahalImage,
    title: "The Taj Mahal",
    rating: 4.2,
    detailsLink: "/xss/xss_lab/seven_lab/details/The-Taj-Mahal",
  },
  {
    id: 5,
    image: hawaiiImage,
    title: "Paradise of Hawaii",
    rating: 3.9,
    detailsLink: "/xss/xss_lab/seven_lab/details/Paradise-of-Hawaii",
  },
  {
    id: 6,
    image: colosseumImage,
    title: "Unveiling the Secrets of the Colosseum",
    rating: 4.7,
    detailsLink: "/xss/xss_lab/seven_lab/details/Colosseum",
  },
];

export default function XSS_SEVEN() {
  const handleDetailsClick = (detailsLink, id) => {
    const query = `details=${id}`; // Incrementing number based on card's id
    const newUrl = `${detailsLink}?${query}`;
    window.location.href = newUrl;
  };

  return (
    <>
      <GoBack />
      <ShowHint />
      <div className="xss-card-container">
        {cardData.map((card) => (
          <div key={card.id} className="xss-card">
            <img src={card.image} alt={card.title} className="xss-card-image" />
            <h3 className="xss-card-title">{card.title}</h3>
            <div className="xss-card-rating">⭐ {card.rating}</div>
            <button
              className="xss-card-details-button"
              onClick={() => handleDetailsClick(card.detailsLink, card.id)} // Pass id to increase the number
            >
              Details
            </button>
          </div>
        ))}
      </div>
    </>
  );
}
