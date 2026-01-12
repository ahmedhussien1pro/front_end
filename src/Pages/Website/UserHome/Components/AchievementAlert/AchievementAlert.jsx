import React from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function AchievementAlert() {
  const handleAchievement = () => {
    toast.success("🎉 Achievement Unlocked: React Master!", {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });
  };

  return (
    <div>
      <button onClick={handleAchievement}>Show Achievement</button>
      <ToastContainer />
    </div>
  );
}

export default AchievementAlert;
