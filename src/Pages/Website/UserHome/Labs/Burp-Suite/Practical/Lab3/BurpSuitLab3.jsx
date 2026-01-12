import React, { useState } from "react";
import "./BurpSuitLab3.css";
import GOBack from "../../../../Components/GoBack_Btn/GoBack_Btn";
import ShowHint from "../../../../Components/ShowHint_Btn/ShowHint_Btn";
import ThemeSwitcher from "../../../../Components/ThemeSwitcher/ThemeSwitcher";

export default function BurpSuitLab3() {
  const [selectedOption, setSelectedOption] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [isCorrect, setIsCorrect] = useState(null);

  const questionData = {
    id: 1,
    question:
      "There are three valid badges in this lab, with IDs ranging from 1 to 10. Find their number.",
    options: ["1 , 2 , 10", "3 , 6 , 9", "6 , 8 , 5", "11 , 3 , 4"],
    answer: "3 , 6 , 9",
  };

  const handleSubmit = () => {
    if (selectedOption) {
      setIsCorrect(selectedOption === questionData.answer);
      setSubmitted(true);
    }
  };

  return (
    <>
      <GOBack />
      <ShowHint hintText="<p>Think logically about badge numbers!</p>" />
      <ThemeSwitcher />
      <div className="question-wrapper">
        <div className="question-box">
          <h3>{questionData.question}</h3>
          <ul className="answer-list">
            {questionData.options.map((option, index) => (
              <li key={index} className="answer-item">
                <label className="lbl-lab3">
                  <input
                    type="radio"
                    name="quiz"
                    value={option}
                    checked={selectedOption === option}
                    onChange={() => setSelectedOption(option)}
                  />
                  {option}
                </label>
              </li>
            ))}
          </ul>
          <button onClick={handleSubmit} className="btn-submit">
            Submit
          </button>

          {submitted && (
            <p
              className={`feedback-message ${
                isCorrect ? "feedback-correct" : "feedback-wrong"
              }`}
            >
              {isCorrect ? "Correct! ✅" : "Wrong ❌"}
            </p>
          )}
        </div>
      </div>
    </>
  );
}
