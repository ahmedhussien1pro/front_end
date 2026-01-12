import React, { useState } from "react";
import axios from "axios";
import "./CommandInjectionLabs.css";
import GOBack from "../../../Components/GoBack_Btn/GoBack_Btn";
import ShowHint from "../../../Components/ShowHint_Btn/ShowHint_Btn";
import ThemeSwitcher from "../../../Components/ThemeSwitcher/ThemeSwitcher";

export default function CommandInjectionLab1() {
  const hintMessage = `<p>Try to execute a forbidden command.</p>`;
  const [ip, setIp] = useState("");
  const [result, setResult] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Send the POST request to the API
    try {
      const response = await axios.post(
        "https://digitopia-project-backend.vercel.app/api/commendInjectionLab1",
        { ip }
      );

      if (response.data && response.data.result) {
        setResult(response.data.result);
      } else {
        setResult("No result returned from the API.");
      }
    } catch (error) {
      setResult("Error: " + error.message);
    }
  };

  return (
    <>
      <GOBack />
      <ShowHint hintText={hintMessage} />
      <ThemeSwitcher />
      <div className="ping-container ">
        <div className="ping-main-wrapper">
          <div className="ping-header-wrapper">
            <h2 className="ping-title">PING</h2>
          </div>
          <div className="ping-form-wrapper col-md-auto mt-3 d-flex justify-content-center">
            <form onSubmit={handleSubmit} className="ping-form">
              <input
                className="ping-input form-control"
                type="text"
                name="ip"
                value={ip}
                onChange={(e) => setIp(e.target.value)}
                style={{ width: "500px" }}
                placeholder="Enter IP address"
              />
              <button
                type="submit"
                className="ping-button btn btn-primary mt-4"
                style={{ width: "500px" }}
              >
                Ping
              </button>
            </form>
          </div>

          {result && (
            <div
              className="ping-result mt-5 alert alert-primary"
              role="alert"
              style={{ width: "500px" }}
            >
              <strong>
                <p className="ping-result-text" style={{ textAlign: "center" }}>
                  {result}
                </p>
              </strong>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
