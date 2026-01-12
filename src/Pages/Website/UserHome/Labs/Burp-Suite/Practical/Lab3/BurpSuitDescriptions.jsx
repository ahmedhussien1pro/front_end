import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./BurpSuitLab3.css";
import GOBack from "../../../../Components/GoBack_Btn/GoBack_Btn";
import ShowHint from "../../../../Components/ShowHint_Btn/ShowHint_Btn";

export default function BurpSuitDescriptions() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [wallpaper, setWallpaper] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Allowed IDs
  const allowedIds = ["3", "6", "9"];

  useEffect(() => {
    if (!allowedIds.includes(id)) {
      setLoading(false);
      return;
    }

    const fetchWallpaperDetails = async () => {
      try {
        const response = await fetch(
          `https://digitopia-project-backend.vercel.app/api/burpsuitelab3/${id}`,
          {
            headers: {
              "Cache-Control": "no-cache",
              Pragma: "no-cache",
            },
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch wallpaper details");
        }
        const data = await response.json();
        setWallpaper(data.data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchWallpaperDetails();
  }, [id]);

  if (!allowedIds.includes(id))
    return (
      <div className="not-found-container">
        <p className="not-found-image">Not Found</p>
      </div>
    );
  if (loading) return <p>Loading wallpaper details...</p>;
  if (error) return <p className="text-danger">Error: {error}</p>;
  if (!wallpaper) return <p>Wallpaper not found.</p>;

  return (
    <>
      <GOBack />
      <ShowHint hintText="<p>Click image to go back</p>" />
      <div className="wallpaper-center">
        <div className="wallpaper-card text-center">
          <img
            src={`https://digitopia-project-backend.vercel.app/${wallpaper.path}`}
            alt={wallpaper.name}
            className="wallpaper-card__image"
            onClick={() => navigate("/Burp_Suit/Burp_Suit_Labs/lab3")}
          />
          <h3 className="wallpaper-card__title mt-3">{wallpaper.name}</h3>
          <p className="wallpaper-card__description">
            {wallpaper.description || "No description available"}
          </p>
        </div>
      </div>
    </>
  );
}
