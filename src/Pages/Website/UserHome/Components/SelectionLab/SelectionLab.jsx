import axios from "axios";
import Footer from "../../Footer/Footer";
import GoBackBtn from "../GoBack_Btn/GoBack_Btn";
import ShowHintBtn from "../ShowHint_Btn/ShowHint_Btn";
import "../../Components/FileDwnLodrLab/FileDownloader.css";
import React, { useEffect, useState } from "react";

export const SelectionLab = ({
  api,
  description,
  hint,
  options = [],
  question,
  type,
  navigateTo = -1,
}) => {
  const [selectedFile, setSelectedFile] = useState("");
  const [fileContent, setFileContent] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    document.title = "File Inclusion Demonstration";

    // Parse the file name from the URL query parameters
    const queryParams = new URLSearchParams(window.location.search);
    const fileFromUrl = queryParams.get(type);

    if (fileFromUrl) {
      // Fetch file data from the backend
      fetchFileData(fileFromUrl);
    }
  });

  const fetchFileData = async (value) => {
    try {
      const response = await axios.get(`${api}?${type}=${value}`);

      // Use response.data directly without checking response.ok
      setFileContent(response.data);
      setError("");
    } catch (err) {
      console.error("Error fetching file:", err);
      setError("File not found or access denied.");
      setFileContent("");
    }
  };

  const handleFileChange = (e) => {
    setSelectedFile(e.target.value);
    setError(""); // Clear any previous errors
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (selectedFile) {
      // Update the URL with the selected file as a query parameter
      const newUrl = `${window.location.pathname}?${type}=${selectedFile}`;
      window.history.pushState({}, "", newUrl);
      // submitFileData(selectedFile);
      // Fetch file data from the backend
      fetchFileData(selectedFile);
    } else {
      setError("Please select a file.");
    }
  };
  return (
    <>
      <div className="course-labcc">
        <GoBackBtn navigateTo={navigateTo}/>
        <ShowHintBtn hintText={hint} />
        <div className="container">
          <div className="faq-section-labcc">
            <div className="question-div">
              <div className="text-center">
                <h2>File Inclusion Demonstration</h2>
                <p>{description}</p>
              </div>
              <form onSubmit={handleSubmit} style={{ flexDirection: "column" }}>
                <div className="selection-style">
                  <select
                    name="file"
                    onChange={handleFileChange}
                    value={selectedFile}
                  >
                    <option value="" disabled>
                      Select a File
                    </option>
                    {options.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                </div>
                <button type="submit" id="check">
                  <i className="fa-regular fa-file"></i> {question}
                </button>
              </form>
              <div className="capital-info">
                {fileContent && (
                  <div className="file-content">
                    {/* <h3>Rendered HTML:</h3> */}
                    <div
                      dangerouslySetInnerHTML={{ __html: fileContent }}
                    ></div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};
