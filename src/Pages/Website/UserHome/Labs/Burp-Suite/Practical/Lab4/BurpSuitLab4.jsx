import React, { useState } from "react";
import data from "./questions.json";
import "./BurpSuitLab4.css";
import GOBack from "../../../../Components/GoBack_Btn/GoBack_Btn";
import ShowHint from "../../../../Components/ShowHint_Btn/ShowHint_Btn";
import ThemeSwitcher from "../../../../Components/ThemeSwitcher/ThemeSwitcher";

export default function BurpSuitLab4() {
  const [userAnswers, setUserAnswers] = useState(
    Array(data.data.length).fill("")
  );
  const [currentIndex, setCurrentIndex] = useState(0);
  const [completed, setCompleted] = useState(false);
  const [score, setScore] = useState(0);

  const currentQuestion = data.data[currentIndex];
  const progress = ((currentIndex + 1) / data.data.length) * 100;

  const handleInputChange = (e) => {
    const newAnswers = [...userAnswers];
    newAnswers[currentIndex] = e.target.value;
    setUserAnswers(newAnswers);
  };

  const handleNext = () => {
    if (currentIndex < data.data.length - 1) {
      setCurrentIndex((prevIndex) => prevIndex + 1);
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prevIndex) => prevIndex - 1);
    }
  };

  const handleSubmit = () => {
    let totalScore = 0;
    userAnswers.forEach((answer, index) => {
      if (
        answer.trim().toUpperCase() ===
        data.data[index].decoded_value.toUpperCase()
      ) {
        totalScore++;
      }
    });
    setScore(totalScore);
    setCompleted(true);
  };

  return (
    <>
      <GOBack />
      <ShowHint hintText="<p>Complete the Questions</p>" />
      <ThemeSwitcher />
      <div className="burp-center">
        <div className="burp-container">
          <h2 className="burp-title">Decode & Verify</h2>

          {/* Progress Bar */}
          <div className="burp-progress-container">
            <div
              className="burp-progress-bar"
              style={{ width: `${progress}%` }}
            ></div>
          </div>

          {!completed ? (
            <>
              <p className="burp-question">
                What is the decoded answer for this encoded string?
              </p>
              <ul className="burp-list">
                <li className="burp-list-item">
                  {currentQuestion.encoded_data}
                </li>
              </ul>

              {currentIndex === 4 && currentQuestion.options ? (
                <div className="burp-options">
                  {currentQuestion.options.map((option, index) => (
                    <label key={index} className="burp-option">
                      <input
                        type="radio"
                        name="question5"
                        value={option}
                        checked={userAnswers[currentIndex] === option}
                        onChange={handleInputChange}
                        className="bs-input-color"
                      />
                      {option}
                    </label>
                  ))}
                </div>
              ) : (
                <input
                  type="text"
                  className="burp-input"
                  placeholder="Enter your answer"
                  value={userAnswers[currentIndex]}
                  onChange={handleInputChange}
                />
              )}

              <div className="burp-nav-buttons">
                <button
                  className="burp-button"
                  onClick={handlePrevious}
                  disabled={currentIndex === 0}
                >
                  Previous
                </button>
                <button
                  className="burp-button"
                  onClick={handleNext}
                  disabled={currentIndex === data.data.length - 1}
                >
                  Next
                </button>
              </div>
              {currentIndex === data.data.length - 1 && (
                <button className="burp-button" onClick={handleSubmit}>
                  Submit
                </button>
              )}
            </>
          ) : (
            <p className="burp-completion">
              🎉 You have completed the quiz! Your score: {score}/
              {data.data.length}
            </p>
          )}
        </div>
      </div>
    </>
  );
}
