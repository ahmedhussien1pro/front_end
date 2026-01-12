import React, { useState, useEffect } from "react";
import Cookie from "cookie-universal";
import "./FileUplode.css";
import GOBack from "../../../Components/GoBack_Btn/GoBack_Btn";
import ShowHint from "../../../Components/ShowHint_Btn/ShowHint_Btn";
import ThemeSwitcher from "../../../Components/ThemeSwitcher/ThemeSwitcher";

const UnrestrictedLab1 = () => {
  const hintMessage = `
  <p>Any file you will upload will be accepted; there is no constraint.</p>
  `;
  const [file, setFile] = useState(null);
  const [status, setStatus] = useState("");
  const [token, setToken] = useState("");

  useEffect(() => {
    const cookie = Cookie();
    const retrievedToken = cookie.get("CuberWeb");
    setToken(retrievedToken);
  }, []);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!file) {
      setStatus("empty");
      return;
    }

    const formData = new FormData();
    formData.append("input_file", file);

    try {
      const response = await fetch(
        "http://127.0.0.1:8080/api/unrestrictedFileUploadLab1",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        }
      );

      if (response.ok) {
        await response.json();
        setStatus("success");
      } else {
        setStatus("unsuccess");
      }
    } catch (error) {
      setStatus("unsuccess");
    }
  };

  const handleDelete = () => {
    setFile(null);
    setStatus("");
    document.getElementById("input_file").value = "";
    window.location.reload();
  };

  return (
    <>
      <GOBack />
      <ShowHint hintText={hintMessage} />
      <ThemeSwitcher />
      <div className="color-file-uploade-container">
        <div className="unique-container">
          <div className="unique-container-wrapper">
            <div className="row-file pt-5 mt-5 mb-3">
              <div className="col-md-3"></div>
              <div className="col-md-6">
                <h1 className="mb-4">
                  Subject: The Importance of Cybersecurity
                </h1>
                <p>
                  In today's digital age, cybersecurity plays a crucial role in
                  protecting sensitive information. With increasing threats like
                  phishing, malware, and ransomware, individuals and
                  organizations must implement strong security measures. This
                  includes using strong passwords, enabling multi-factor
                  authentication, and regularly updating software.
                </p>
                <p>
                  Moreover, cybersecurity awareness is vital. By educating
                  people about potential risks and safe online practices, we can
                  minimize the chances of successful cyberattacks. As technology
                  evolves, staying informed and proactive is the best defense
                  against cyber threats.
                </p>
                <p>
                  Would you like to share a photo related to your cybersecurity
                  journey? 😊 Please upload your photo!
                </p>
                <button
                  type="button"
                  className="btn btn-secondary btn-sm"
                  onClick={handleDelete}
                >
                  Delete Files
                </button>
              </div>
              <div className="col-md-3"></div>
            </div>
            <div className="row pt-3">
              <div className="col-md-3"></div>
              <div className="col-md-6">
                <div className="card-file-upload border-primary mb-4">
                  <div className="card-header-file primary-text">
                    Supported Formats: <b>GIF, JPG, JPEG, PNG</b>
                  </div>
                </div>
                <h3 className="mb-3  primary-text">Upload Your Files</h3>

                {status === "success" && (
                  <div className="alert-file alert-success" role="alert">
                    <b>File uploaded successfully!</b>
                  </div>
                )}
                {status === "unsuccess" && (
                  <div className="alert-file alert-danger" role="alert">
                    <b>File upload failed. Please try again.</b>
                  </div>
                )}
                {status === "empty" && (
                  <div className="alert-file alert-danger" role="alert">
                    <b>No file selected. Please upload a file.</b>
                  </div>
                )}

                <form onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <label
                      htmlFor="input_file"
                      className="form-label primary-text"
                    >
                      Choose a file
                    </label>
                    <input
                      className="form-control"
                      type="file"
                      id="input_file"
                      onChange={handleFileChange}
                    />
                  </div>
                  <div className="d-grid gap-2">
                    <button className="style-btn" type="submit">
                      Upload
                    </button>
                  </div>
                </form>
              </div>
              <div className="col-md-3"></div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UnrestrictedLab1;
