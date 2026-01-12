import React, { useState, useEffect } from "react";
import GoBackBtn from "../../../../Components/GoBack_Btn/GoBack_Btn";
import ShowHintBtn from "../../../../Components/ShowHint_Btn/ShowHint_Btn";
import "../../SSRF_Labs.css"; // Maintain the same styles
import products from "../../data.json";
import axios from "axios";

// Lab hint for SSRF
const hintMessage = `<span>This lab is vulnerable to SSRF due to improper validation of user-supplied input. To solve the lab, you need to submit a URL that could access internal resources such as <strong>https://digitopia-project-backend.vercel.app/admin</strong> or <strong>https://digitopia-project-backend.vercel.app/secret.txt</strong>.</span>`;

export default function SSRF_AdminLab1() {
  const [responseFromBackend, setResponseFromBackend] = useState(""); // Store backend response
  const [urlInput, setUrlInput] = useState(""); // User input for URL
  const [outOfStockMessage, setOutOfStockMessage] = useState(""); // Message from backend (e.g., stock status)
  const [isAdmin, setIsAdmin] = useState(false); // Admin check flag
  const [isDeleted, setIsDeleted] = useState(false); // Track if the file was deleted

  useEffect(() => {
    const checkAdminStatus = async () => {
      try {
        const response = await axios.get(
          "https://digitopia-project-backend.vercel.app/api/check-admin"
        );
        if (response.data.isAdmin) {
          setIsAdmin(true);
          window.location.reload();
        } else {
          setIsAdmin(false);
          window.location.reload();
        }
      } catch (error) {
        console.error("Error checking admin status:", error);
      }
    };

    checkAdminStatus();
  }, []); // Run this only once on component mount

  // Function to send URL to backend and simulate SSRF
  const sendUrlToBackend = async (url) => {
    try {
      const response = await axios.post(
        "https://digitopia-project-backend.vercel.app/api/ssrf/admin-request", // Backend endpoint
        { url } // Send user-supplied URL to backend
      );

      // Display SSRF response message from the backend
      setResponseFromBackend(response.data.message);
    } catch (error) {
      console.error("Error sending URL to backend:", error);
      setResponseFromBackend("Error: Could not fetch information.");
    }
  };

  // Function to delete the file x.txt (only for admins)
  const deleteFile = async () => {
    try {
      const response = await axios.delete(
        "https://digitopia-project-backend.vercel.app/api/delete-file",
        {
          data: { fileName: "x.txt" }, // Specify the file to delete
        }
      );
      if (response.status === 200) {
        setIsDeleted(true);
      }
    } catch (error) {
      console.error("Error deleting file:", error);
      setIsDeleted(false);
    }
  };

  // Reset the lab state
  const labreset = async () => {
    try {
      const response = await axios.get(
        "https://digitopia-project-backend.vercel.app/api/SSRFLabReset"
      );
      if (response.status === 200) {
        window.history.replaceState({}, "", window.location.pathname);
        window.location.reload();
      }
    } catch (error) {
      console.error("Error resetting:", error);
      setResponseFromBackend("Error: Could not reset.");
    }
  };

  const checkStock = async (product) => {
    try {
      const response = await axios.post(
        `https://digitopia-project-backend.vercel.app/api/SSRFLab/checkStock`,
        { productId: product.id }
      );

      // Let's simulate SSRF here by sending a manipulated message.
      const message = response.data.message;
      setOutOfStockMessage(message); // Set the message without updating the URL
    } catch (error) {
      console.error("Error sending stock check request:", error);
      setOutOfStockMessage("Error: Could not fetch stock information.");
    }
  };

  // If not admin, display access denied message
  if (!isAdmin) {
    return (
      <div className="container">
        <h1 style={{ textAlign: "center", color: "red" }}>
          Access Denied: Admins Only
        </h1>
      </div>
    );
  }

  // Regular SSRF lab interface for admin users
  return (
    <div className="container">
      <GoBackBtn />
      <ShowHintBtn hintText={hintMessage} />

      <button
        onClick={labreset}
        className="reset-btn"
        style={{
          width: "fit-content",
          marginTop: "20px",
          marginLeft: "20px",
          borderRadius: "5px",
          position: "absolute",
          left: "15%",
        }}
      >
        Reset
      </button>

      {/* Display out-of-stock message if available */}
      {outOfStockMessage && (
        <div
          className="out-of-stock-message"
          style={{
            color: "red",
            textAlign: "center",
            marginBottom: "20px",
            marginTop: "20px",
          }}
        >
          <h2>{outOfStockMessage}</h2>
        </div>
      )}

      {/* Backend response */}
      {responseFromBackend && (
        <div
          className="backend-response"
          style={{
            color: "green",
            textAlign: "center",
            marginBottom: "20px",
            marginTop: "20px",
          }}
        >
          <h2>{responseFromBackend}</h2>
        </div>
      )}

      {/* Display file deletion success/failure */}
      {isDeleted && (
        <div
          className="file-deletion-message"
          style={{
            color: "green",
            textAlign: "center",
            marginBottom: "20px",
            marginTop: "20px",
          }}
        >
          <h2>File secret.txt deleted successfully!</h2>
        </div>
      )}
      {!isDeleted && (
        <div
          className="file-deletion-message"
          style={{
            color: "red",
            textAlign: "center",
            marginBottom: "20px",
            marginTop: "20px",
          }}
        >
          <h2>Failed to delete file secret.txt.</h2>
        </div>
      )}

      <div className="ssrf__course-store">
        <div className="container">
          <h1 style={{ textAlign: "center", marginBottom: 60 }}>
            Featured Products
          </h1>
          <div className="ssrf__course-store--row-practice">
            {products.map((product) => (
              <div className="ssrf__course-store--card-store" key={product.id}>
                <div className="ssrf__course-store__card-store--functions">
                  <i className="fa-solid fa-cart-plus"></i>
                  <i className="fa-regular fa-heart"></i>
                </div>
                <img src={product.image} alt={product.title} />
                <div className="ssrf__course-store__card-store--card-text-store">
                  <button
                    onClick={() => checkStock(product)} // Send the request when clicked
                    className="text-black bg-transparent border-0"
                  >
                    {product.title}
                  </button>
                  <p className="price">${product.price}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* URL Input Section */}
      <div
        className="url-input-section"
        style={{ textAlign: "center", marginTop: "30px" }}
      >
        <h2>Enter URL to Test SSRF Vulnerability</h2>
        <input
          type="text"
          placeholder="e.g., http://localhost/admin"
          value={urlInput}
          onChange={(e) => setUrlInput(e.target.value)}
          style={{ width: "100%", padding: "10px", marginBottom: "20px" }}
        />
        <button
          onClick={() => sendUrlToBackend(urlInput)} // Trigger SSRF test with URL
          style={{
            padding: "10px 20px",
            backgroundColor: "#007bff",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          Test URL
        </button>
      </div>

      {/* Button to delete the file secret.txt */}
      <div style={{ textAlign: "center", marginTop: "20px" }}>
        <button
          onClick={deleteFile}
          style={{
            padding: "10px 20px",
            backgroundColor: "red",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          Delete secret.txt
        </button>
      </div>
    </div>
  );
}
