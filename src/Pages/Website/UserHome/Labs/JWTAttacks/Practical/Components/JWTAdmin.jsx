import React, { useEffect, useState } from "react";
import axios from "axios";
import GoBackBtn from "../../../../Components/GoBack_Btn/GoBack_Btn";
import ShowHintBtn from "../../../../Components/ShowHint_Btn/ShowHint_Btn";
import Cookie from "cookie-universal";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import Swal from "sweetalert2";
import ThemeSwitcher from "../../../../Components/ThemeSwitcher/ThemeSwitcher";

const AdminPage = ({ apiEndpoint, tokenName, lab, hint, condition }) => {
  const [loadingDelete, setLoadingDelete] = useState(false);
  const [decoded, setDecoded] = useState(null);
  const [message] = useState(
    `<i class="fas fa-lightbulb show-hint-btn-icon"></i> User Ali has been deleted.`
  );
  const cookie = Cookie();
  const navigate = useNavigate();
  const loginURL = `/jwtattacks/jwtattacks_lab/${lab}`;
  const sentToken = cookie.get(tokenName);
  // Fetch and decode token
  useEffect(() => {
    const storedToken = cookie.get(tokenName);
    if (storedToken) {
      try {
        const decodedToken = jwtDecode(storedToken);
        // setDecoded(decodedToken);
      } catch (error) {
        console.error("Invalid token:", error);
        cookie.remove(tokenName);
        navigate(loginURL); // Redirect if token is invalid
      }
    } else {
      navigate(loginURL); // Redirect if no token is found
    }
  }, [tokenName, navigate, loginURL,cookie]);

  // Create user "Ali" if it doesn't exist and the logged user is an admin
  useEffect(() => {
    if (condition) {
      console.log("Creating user Ali...");
      createUserAli();
    }
  }, [decoded]);

  const createUserAli = () => {
    axios
      .post(
        `${apiEndpoint}/createuser`,
        {
          username: "Ali",
          password: "somepassword",
        }, // This is the request body
        {
          headers: {
            Authorization: `Bearer ${sentToken}`, // Attach JWT token
            "Content-Type": "application/json",
          },
        }
      )
      .catch(() => {
        console.log("Error creating user Ali.");
      });
  };

  const handleDeleteUser = () => {
    setLoadingDelete(true);
    axios
      .delete(`${apiEndpoint}/deleteuser`, {
        headers: {
          Authorization: `Bearer ${sentToken}`, // Attach JWT token
          "Content-Type": "application/json",
        },
        data: { username: "Ali" }, // Correct placement of request body
      })
      .then(() => {
        setLoadingDelete(false);
        console.log(message);
        Swal.fire({
          title: "Congratulations!",
          html: message, // Use the updated message
          icon: "info",
          confirmButtonText: "Got it!",
        });
      })
      .catch(() => {
        console.log("Error deleting user Ali.");
        setLoadingDelete(false);
      });
  };

  const spanCount = 400;

  return (
    <div
      style={{
        backgroundColor: "#000",
        position: "relative",
        width: "100vw",
        height: "100vh",
      }}
    >
      <GoBackBtn />
      <ShowHintBtn />
      <ThemeSwitcher/>
      <main className="hacker-login">
        {Array.from({ length: spanCount }).map((_, index) => (
          <span key={index} className="hackerLogin-gridSpan"></span>
        ))}
        <div className="hackerLogin-signin">
          <div className="hacker-login-content text-center">
            {condition ? (
              <>
                {message && (
                  <div dangerouslySetInnerHTML={{ __html: message }}></div>
                )}
                <h2 className="mb-5">Admin Dashboard</h2>
                <button onClick={handleDeleteUser} disabled={loadingDelete}>
                  {loadingDelete ? "Deleting..." : "Delete User Ali"}
                </button>
              </>
            ) : (
              <>
                <h2 className="mb-5">Access Denied</h2>
                <p>Only Admins Can Access This Page</p>
              </>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminPage;
