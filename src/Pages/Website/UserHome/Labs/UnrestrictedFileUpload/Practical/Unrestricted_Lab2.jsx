import React, { useState } from "react";
import "./FileUplode.css";
import Cookie from "cookie-universal";
import GOBack from "../../../Components/GoBack_Btn/GoBack_Btn";
import ShowHint from "../../../Components/ShowHint_Btn/ShowHint_Btn";
import ThemeSwitcher from "../../../Components/ThemeSwitcher/ThemeSwitcher";

const UnrestrictedLab1 = () => {
  const hintMessage = `
  <div class="hint-message">
  <p><strong>Open Burp Suite and intercept the upload of the backdoor file.
</strong></p>
  <p>change the Content-Type based on the allowed filters only.
 <code>image/png</code></p>
</div>

<style>
  .hint-message {
    background-color: #f9f9f9;
    color: #333;
    border: 1px solid #ccc;
    padding: 15px;
    margin-top: 20px;
    border-radius: 8px;
    font-size: 14px;
    font-family: 'Montserrat', sans-serif;
  }

  .hint-message p {
    margin: 10px 0;
  }

  .hint-message code {
    font-family: 'Courier New', monospace;
    background-color: #e1e1e1;
    padding: 3px 6px;
    border-radius: 4px;
  }

  .hint-message strong {
    font-weight: bold;
  }
</style>
  `;

  const [file, setFile] = useState(null);
  const [status, setStatus] = useState("");

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    setFile(selectedFile);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!file) {
      setStatus("empty");
      return;
    }

    const formData = new FormData();
    formData.append("input_image", file);

    const cookie = Cookie();
    const token = cookie.get("CuberWeb");

    try {
      const response = await fetch(
        "http://127.0.0.1:8080/api/unrestrictedFileUploadLab2",
        {
          method: "POST",
          body: formData,
          headers: {
            Authorization: `Bearer ${token}`,
          },
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

  const handleDeleteFile = () => {
    setFile(null);
    setStatus("");
    document.getElementById("input_image").value = "";
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
                  onClick={handleDeleteFile}
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
                <h3 className="mb-3 primary-text">Upload Your Files</h3>

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
                      htmlFor="input_image"
                      className="form-label primary-text"
                    >
                      Choose an image file
                    </label>
                    <input
                      className="form-control style-form-cont"
                      type="file"
                      id="input_image"
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
