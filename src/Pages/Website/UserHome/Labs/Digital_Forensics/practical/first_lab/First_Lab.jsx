import React, { useState } from "react";
import Swal from "sweetalert2";
import GoBackBtn from "../../../../Components/GoBack_Btn/GoBack_Btn";
import ShowHintBtn from "../../../../Components/ShowHint_Btn/ShowHint_Btn";
import Go2TopBtn from "../../../../Components/Go2Top_Btn/Go2Top_Btn";
import "./First_Lab.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import ThemeSwitcher from "../../../../Components/ThemeSwitcher/ThemeSwitcher";
const hintMessage = `
  <ul style="text-align: left; font-size: 16px; line-height: 1.8;">
    <li>1. Use tools like Audacity to analyze the waveform.</li>
    <li>2. Look for unusual patterns or hidden spectrogram data.</li>
  </ul>
`;

const AudioForensicsLab = () => {
  const [userMessage, setUserMessage] = useState("");
  const correctMessage = "Cyber Labs";

  const handleDownload = () => {
    const audioUrl = "/AudioForensics/AudioForensics.wav";
    const link = document.createElement("a");
    link.href = audioUrl;
    link.download = "AudioForensics.wav";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (userMessage.trim().toLowerCase() === correctMessage.toLowerCase()) {
      Swal.fire({
        icon: "success",
        title: "Congratulations!",
        text: "You successfully extracted the hidden message!",
        confirmButtonText: "Great job!",
      });
    } else {
      Swal.fire({
        icon: "error",
        title: "Try Again!",
        text: "The message you entered is incorrect. Keep trying!",
        confirmButtonText: "Okay",
      });
    }
  };

  return (
    <div className="Custom__body--bg p-5">
      <GoBackBtn />
      <ThemeSwitcher />
      <ShowHintBtn hintText={hintMessage} />
      <div className="container py-5 my-5 secondary-bg ">
        <div className="row text-center mb-3">
          <div className="col">
            <h1 className="fw-bold text-center main-color mb-2">
              Audio Forensics Lab
              <i className="fas fa-headphones-alt ms-2"></i>
            </h1>
            <p className="secondary-text mb-0">
              Uncover hidden data in audio files using forensic techniques
            </p>
          </div>
        </div>
        <hr className="mb-5 w-50 mx-auto main-color" />

        <div className="row mb-5 px-2">
          <div className="col-lg-8 mb-4">
            <section className="mb-4">
              <h4 className="mb-2" style={{ color: "var(--main-color2)" }}>
                Topic Overview{" "}
                <i className="fas fa-info-circle ms-2 text-warning"></i>
              </h4>
              <p className="secondary-text italic fs-5 ">
                In this lab, your goal is to identify and extract a hidden
                message embedded in the provided audio file. The message may be
                concealed using steganographic techniques. Use the recommended
                tools and resources to investigate the audio file’s waveform,
                spectrogram, or metadata. Once you discover the hidden message,
                submit it below.
              </p>
            </section>

            <section className="mb-4">
              <h4 className="mb-2" style={{ color: "var(--main-color2)" }}>
                Helpful Resources{" "}
                <i className="fas fa-tools ms-2 text-warning"></i>
              </h4>
              <ul>
                <li className="mb-2">
                  <FontAwesomeIcon
                    icon={faArrowRight}
                    className="me-2 text-warning"
                  />
                  <a
                    href="https://www.audacityteam.org/"
                    className="primary-link underline "
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Audacity - Audio Editing Tool
                  </a>
                </li>
                <li>
                  <FontAwesomeIcon
                    icon={faArrowRight}
                    className="me-2 text-warning"
                  />
                  <a
                    href="https://www.sonicvisualiser.org/"
                    className="primary-link underline"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Sonic Visualiser - Visualize Audio Data
                  </a>
                </li>
              </ul>
            </section>

            <section className="p-3  border rounded">
              <h4 className="mb-2 " style={{ color: "var(--main-color2)" }}>
                Pro Tips<i className="fas fa-lightbulb ms-2 text-warning"></i>
              </h4>
              <ul className="mb-0 ps-3 italic fs-5 secondary-text">
                <li>
                  <FontAwesomeIcon
                    icon={faArrowRight}
                    className="me-2 text-warning"
                  />
                  Check the spectrogram for unusual patterns or text overlays.
                  <i className="fas fa-wave-square ms-2 text-warning"></i>
                </li>
                <li>
                  <FontAwesomeIcon
                    icon={faArrowRight}
                    className="me-2 text-warning"
                  />
                  Experiment with filters, reversing the audio, or adjusting
                  speed.
                  <i className="fas fa-sliders-h ms-2 text-warning"></i>
                </li>
                <li>
                  <FontAwesomeIcon
                    icon={faArrowRight}
                    className="me-2 text-warning"
                  />
                  Inspect metadata or hidden channels for extra clues.
                  <i className="fas fa-search ms-2 text-warning"></i>
                </li>
              </ul>
            </section>
          </div>

          <div className="col-lg-4">
            <section className="mb-4">
              <h4 className="mb-3 " style={{ color: "var(--main-color2)" }}>
                Watch This Guide{" "}
                <i className="fas fa-play  ms-2 text-warning"></i>
              </h4>
              <div className="audio-lab__video-container">
                <iframe
                  src="https://www.youtube.com/embed/1EqCQrVEEVs"
                  title="Audio Forensics Guide"
                  allowFullScreen
                ></iframe>
              </div>
            </section>
          </div>
        </div>

        <div className="row">
          <div className="col-lg-6 col-md-11 mx-md-auto mb-4">
            <section className=" p-4 secondary-bg rounded shadow">
              <h4 className="main-color">
                <span className="primary-text">Step 1:</span> Download the Audio
                File <i className="fas fa-file-download ms-2 text-warning"></i>
              </h4>
              <div className="mb-4">
                <button
                  onClick={handleDownload}
                  className=" btn-main-color download-btn  mb-3 py-2 px-5"
                >
                  Download Audio File
                  <i className="fas fa-arrow-down ms-2 text-warning fs-5"></i>
                </button>
                <audio controls className="w-100 mt-3 main-color rounded">
                  <source
                    src="/AudioForensics/AudioForensics.wav"
                    type="audio/wav"
                  />
                  Your browser does not support the audio element.
                </audio>
              </div>
            </section>
          </div>

          <div className="col-lg-6 col-md-11 mx-md-auto mb-4">
            <section className=" p-4 secondary-bg rounded shadow">
              <h4 className="main-color">
                <span className="primary-text"> Step 2:</span> Extract the
                Hidden Message
                <i className="fas fa-search  ms-2 text-warning"></i>
              </h4>
              <form onSubmit={handleSubmit} className="audio-lab__message-form">
                <div className="form-group mb-3">
                  <label htmlFor="message" className="form-label">
                    Type the Hidden Message:
                  </label>
                  <input
                    type="text"
                    id="message"
                    placeholder="Enter the hidden message here"
                    value={userMessage}
                    onChange={(e) => setUserMessage(e.target.value)}
                    className="form-control focus-bg-transparent"
                    required
                  />
                </div>
                <button type="submit" className="btn-main-color2 px-4 py-1">
                  Submit
                </button>
              </form>
            </section>
          </div>
        </div>

        <Go2TopBtn />
      </div>
    </div>
  );
};

export default AudioForensicsLab;
