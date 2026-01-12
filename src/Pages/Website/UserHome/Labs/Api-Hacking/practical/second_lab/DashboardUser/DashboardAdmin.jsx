import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { FaTrash } from "react-icons/fa";
import { Toast } from "bootstrap";
import "./DashboardAdmin.css";
import GOBack from "../../../../../Components/GoBack_Btn/GoBack_Btn";
import ShowHint from "../../../../../Components/ShowHint_Btn/ShowHint_Btn";

export default function DashboardAdmin() {
  const { id: userId } = useParams();
  const [wallpapers, setWallpapers] = useState([]);
  const [loading, setLoading] = useState(true);
  const hintMessage = `<p>Add Something</p>`;

  useEffect(() => {
    const fetchWallpapersByUserId = async () => {
      try {
        const response = await fetch(
          `https://digitopia-project-backend.vercel.app/api/wallpapers/${userId}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch wallpapers");
        }
        const data = await response.json();
        setWallpapers(data.data);
      } catch (error) {
        console.error("Error fetching wallpapers:", error);
      } finally {
        setLoading(false);
      }
    };

    if (userId) {
      fetchWallpapersByUserId();
    }
  }, [userId]);

  const handleDelete = async (id) => {
    try {
      const response = await fetch(
        `https://digitopia-project-backend.vercel.app/api/wallpapers/${userId}/${id}`,
        { method: "DELETE" }
      );
      if (!response.ok) {
        throw new Error("Error deleting wallpaper");
      }
      setWallpapers((prevWallpapers) =>
        prevWallpapers.filter((wallpaper) => wallpaper.id !== id)
      );

      const toastEl = document.getElementById("liveToast");
      const toastBody = document.getElementById("toastBody");
      if (toastBody) {
        toastBody.innerText = "Wallpaper deleted successfully";
      }
      if (toastEl) {
        const toast = new Toast(toastEl);
        toast.show();
      }
    } catch (error) {
      console.error("Error deleting wallpaper:", error);
    }
  };

  if (loading) {
    return <p>Loading wallpapers...</p>;
  }

  return (
    <div className="Custom__body--bg p-5">
      <GOBack />
      <ShowHint hintText={hintMessage} />
      <div className="container my-5 secondary-bg p-5 rounded shadow-lg">
        <h2 className="main-color text-center mb-5">Wallpaper Details</h2>
        {wallpapers.length > 0 ? (
          <div className="row">
            {wallpapers.map((wallpaper) => (
              <div className="col-md-4 mb-4" key={wallpaper.id}>
                <div className="card h-100 primary-bg shadow-sm border-0 overflow-hidden">
                  <img
                    src={`https://digitopia-project-backend.vercel.app/${wallpaper.path}`}
                    alt={wallpaper.name}
                    className="card-img-top wallpaper-thumbnail img-fluid"
                  />
                  <div className="card-body d-flex justify-content-between align-items-center">
                    <h5 className="card-title main-color mb-0">
                      {wallpaper.name}
                    </h5>
                    <button
                      className="btn delete-wallpaper-btn"
                      onClick={() => handleDelete(wallpaper.id)}
                    >
                      <FaTrash />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="no-wallpapers-message text-center">
            No wallpapers found for the given user.
          </p>
        )}
      </div>

      <div
        className="toast-container position-fixed top-0 end-0 p-3 "
        style={{ zIndex: 1055 }}
      >
        <div
          id="liveToast"
          className="toast toast-notification secondary-bg primary-text"
          role="alert"
          aria-live="assertive"
          aria-atomic="true"
        >
          <div
            className="toast-header main-color "
            style={{ background: "var(--faq-header)" }}
          >
            <strong className="me-auto">Notification</strong>
            <small>Just now</small>
            <button
              type="button"
              className="btn-close btn-close-white"
              data-bs-dismiss="toast"
              aria-label="Close"
            ></button>
          </div>
          <div className="toast-body" id="toastBody"></div>
        </div>
      </div>
    </div>
  );
}
