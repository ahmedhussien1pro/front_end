import React from "react";
import { useNavigate } from "react-router-dom";

function Affirmation() {
  const navigate = useNavigate();
  React.useEffect(() => {
    window.history.replaceState(null, "", "/Click_Jacking/Click_Jacking_labs/lab1");
  }, []);

  return (
    <div className="Custom__body--bg">
      <div className="container text-center mt-5 shadow-lg p-5 secondary-bg primary-text">
      <h1 className="main-color ">Lab Finished</h1>
      <p className="secondary-text">Your account has been deleted. Please log in again to continue.</p>
      <button onClick={() => navigate("/Click_Jacking/Click_Jacking_labs/lab1")} className="btn-main-color px-5">
        Go to Login Page
      </button>
    </div>
    </div>
  );
}

export default Affirmation;
