import React, { useState, useEffect } from "react";
import GoBackBtn from "../../../../Components/GoBack_Btn/GoBack_Btn";
import ShowHintBtn from "../../../../Components/ShowHint_Btn/ShowHint_Btn";
import "../../SSRF_Labs.css";
import axios from "axios";

export default function SSRF_AdminLab() {
  const [usernames, setUserNames] = useState([]);
  const labreset = async () => {
    try {
      const response = await axios.post(
        "https://digitopia-project-backend.vercel.app/api/SSRFLab/resetLab1"
      );
      setUserNames(response.data.username);
    } catch (error) {
      console.error("Error creating users:", error);
    }
  };
  useEffect(() => {
    labreset();
  }, []);

  const deleteUser = async (username) => {
    try {
      await axios.delete(
        `https://digitopia-project-backend.vercel.app/api/SSRFLab/deleteUser/${username}`
      );
      setUserNames([]);
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  return (
    <div className="container">
      <GoBackBtn />
      <ShowHintBtn hintText="This lab demonstrates SSRF vulnerabilities." />
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
      <h1 style={{ textAlign: "center", marginBottom: 20 }}>User Management</h1>
      <ul>
        {usernames !== undefined && (
          <li className="ssrf_user_list">
            {usernames}
            <button
              onClick={() => deleteUser(usernames)}
              className="delete_user"
            >
              Delete
            </button>
          </li>
        )}
      </ul>
    </div>
  );
}
