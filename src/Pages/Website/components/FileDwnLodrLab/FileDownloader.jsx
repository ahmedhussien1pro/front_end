import "./FileDownloader.css";
import { useEffect, useState } from "react";
import GoBackBtn from "../GoBack_Btn/GoBack_Btn";
import ShowHintBtn from "../ShowHint_Btn/ShowHint_Btn";
import ThemeSwitcher from "../ThemeSwitcher/ThemeSwitcher";
export const FileDownloader = ({
  answerText,
  fileName,
  hint,
  labInfo,
  subject,
  title,
}) => {
  const [showSuccess, setShowSuccess] = useState(false);
  const [showFail, setShowFail] = useState(false);
  const fileUrl = `/${subject}/${fileName}`;
  useEffect(() => {
    document.title = title;
    injectKeyframes();
  }, []);
  const injectKeyframes = () => {
    const style = document.createElement("style");
    style.type = "text/css";
    style.innerHTML = `
      @keyframes explode {
        0% {
          transform: scale(0);
          opacity: 1;
        }
        100% {
          transform: scale(3);
          opacity: 0;
        }
      }
    `;
    document.head.appendChild(style);
  };
  const checkAnswer = (e) => {
    e.preventDefault();
    const answer = e.target.answer.value;
    if (answer === answerText) {
      setShowSuccess(true);
      document.getElementById("check").disabled = true;
      document.getElementById("check").innerHTML =
        '<i class="fa-solid fa-check"></i> Correct Answer';
      launchFireworks();
      setTimeout(() => {
        setShowSuccess(false);
      }, 1500);
    } else {
      setShowFail(true);
      setTimeout(() => {
        setShowFail(false);
      }, 1500);
    }
  };
  const launchFireworks = () => {
    const fireworkContainer = document.getElementById("firework");
    const numParticles = window.innerWidth > 768 ? 100 : 50;
    for (let i = 0; i < numParticles; i++) {
      const particle = document.createElement("div");
      particle.style.position = "absolute";
      particle.style.width = "10px";
      particle.style.height = "10px";
      particle.style.backgroundColor = `hsl(${Math.random() * 360}, 100%, 50%)`;
      particle.style.borderRadius = "50%";
      particle.style.left = `${Math.random() * 100}%`;
      particle.style.top = `${Math.random() * 100}%`;
      particle.style.willcChange = "transform, opacity";
      particle.style.animation = "explode 1.5s forwards";

      fireworkContainer.appendChild(particle);
      setTimeout(() => particle.remove(), 1600);
      particle.addEventListener("animationend", () => {
        particle.remove();
      });
    }
  };

  return (
    <>
      <div className="course-labcc">
        <GoBackBtn />
        <ThemeSwitcher/>
        <ShowHintBtn hintText={hint} />
        <div className="firework" id="firework"></div>
        {showSuccess && <div className="message success">Congratulations!</div>}
        {showFail && <div className="message fail">Wrong!</div>}
        <div className="container">
          <div className="faq-section-labcc">
            {labInfo && (
              <div className="fileViewer">
                <p
                  id="lab-info"
                  dangerouslySetInnerHTML={{ __html: labInfo }}
                ></p>
              </div>
            )}
            <div className="caution">
              <p>Download this file and open it on your Linux machine</p>
              <i className="fa-solid fa-triangle-exclamation"></i>
            </div>
            <div className="fileViewer info">
              <a href={fileUrl} download={fileName}>
                <button className="downloadButton">
                  <i className="fas fa-download"></i>
                  {fileName}
                </button>
              </a>
            </div>
            <div className="question-div">
              <h1 className="question">Check your Flag here:</h1>
              <form onSubmit={checkAnswer}>
                <input
                  type="text"
                  name="answer"
                  placeholder="Flag Format: flag{**********}"
                />
                <button type="submit" id="check">
                  <i className="fa-regular fa-paper-plane"></i> Submit
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
