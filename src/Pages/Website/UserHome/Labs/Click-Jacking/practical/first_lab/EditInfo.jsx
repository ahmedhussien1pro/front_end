import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

function EditInfo() {
  const [account, setAccount] = useState(null);
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchAccount() {
      try {
        const res = await fetch(
          "https://digitopia-project-backend.vercel.app/api/clickJackLab1-account"
        );
        if (res.ok) {
          const data = await res.json();
          setAccount(data.account);
          setEmail(data.account.email || "");
        } else {
          console.error("Failed to fetch account data");
        }
      } catch (error) {
        console.error("Error:", error);
      }
    }
    fetchAccount();
  }, []);

  const handleEmailUpdate = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(
        "https://digitopia-project-backend.vercel.app/api/clickJackLab1-edit-info",
        {
          method: "POST",
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
          body: new URLSearchParams({
            email,
            id: account ? account.id : 1,
          }),
        }
      );
      if (res.ok) {
        Swal.fire("Success", "Email updated successfully", "success");
      } else {
        Swal.fire("Error", "Failed to update email", "error");
      }
    } catch (error) {
      console.error(error);
      Swal.fire("Error", "An error occurred", "error");
    }
  };

  return (
    <div className="Custom__body--bg">
      <div className="container my-5 m-auto">
        <div className="row justify-content-center">
          <div className="col-md-8">
            <div className="card shadow-lg secondary-bg primary-text">
              <div className=" main-color text-center my-4 display-4">
                <h2>Edit Account Information</h2>
              </div>
              <div className="card-body">
                {account ? (
                  <div className="mb-4">
                    <p className="fs-5">
                      <strong className="main-color">Username:</strong>{" "}
                      {account.username}
                    </p>
                    <p className="fs-5">
                      <strong className="main-color">Email:</strong>{" "}
                      {account.email || "Not set"}
                    </p>
                  </div>
                ) : (
                  <p className="text-center">Loading account data...</p>
                )}

                <form onSubmit={handleEmailUpdate}>
                  <div className="form-floating mb-3">
                    <input
                      type="email"
                      placeholder="name@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      id="floatingInput"
                      className="form-control focus-bg-transparent"
                    />
                    <label htmlFor="floatingInput">Update Email</label>
                  </div>
                  <div className="d-grid gap-2">
                    <button
                      type="submit"
                      className="btn-main-color px-5  mx-auto"
                    >
                      Update Email
                    </button>
                  </div>
                </form>
              </div>
              <div className="card-footer text-center">
                <button
                  className="btn-main-color2 mx-auto px-5"
                  onClick={() =>
                    navigate(
                      "/Click_Jacking/Click_Jacking_labs/lab1/EditInfo/ExploitPanel"
                    )
                  }
                >
                  Go to Exploit Panel
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditInfo;
