import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import "./MCQQuiz.css";

// Sound imports
import correctSound from "./sound-effects/correct-ans.mp3";
import wrongSound from "./sound-effects/wrong-ans.mp3";
import { useNavigate } from "react-router-dom";
import passedSound from "./sound-effects/quiz-passed.mp3";
import failedSound from "./sound-effects/quiz-failed.mp3";

// Replace with your own image
import quizImage from "./side.jpg";

const MCQQuiz = ({ questionsData }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [quizStarted, setQuizStarted] = useState(false);
  const [timer, setTimer] = useState(60);
  const [submitted, setSubmitted] = useState(false); // Prevent multiple submissions

  const maxStepsToShow = 5;
  const navigate = useNavigate();

  const getAnimationClass = (index) => {
    const delays = ["", "delay-100", "delay-200", "delay-300"];
    return `mcq-quiz__bounce-left ${delays[index] || ""}`;
  };

  // Show start alert on mount
  useEffect(() => {
    Swal.fire({
      title: "Welcome!",
      text: "Are you ready to start the quiz?",
      icon: "info",
      showCancelButton: true,
      confirmButtonText: "Start",
      cancelButtonText: "Cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        setQuizStarted(true);
      } else if (
        result.isDismissed &&
        result.dismiss === Swal.DismissReason.cancel
      ) {
        navigate(-1);
      }
    });
  }, []);

  // Timer countdown and auto-submit when time is up
  useEffect(() => {
    let interval = null;
    if (quizStarted && timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    }
    if (quizStarted && timer === 0 && !submitted) {
      handleSubmit(true);
    }
    return () => clearInterval(interval);
  }, [quizStarted, timer, submitted]);

  const playSound = (sound) => {
    new Audio(sound).play();
  };

  const handleOptionChange = (e) => {
    const answer = e.target.value;
    setSelectedAnswers({
      ...selectedAnswers,
      [questionsData[currentQuestion].id]: answer,
    });
  };

  const goToNextQuestion = (e) => {
    e.preventDefault();
    if (!selectedAnswers[questionsData[currentQuestion].id]) {
      Swal.fire({
        title: "Error!",
        text: "Please choose an option!",
        icon: "error",
        confirmButtonText: "OK",
      });
      return;
    }
    if (currentQuestion < questionsData.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const goToPreviousQuestion = (e) => {
    e.preventDefault();
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const computeScore = () => {
    let score = 0;
    questionsData.forEach((question) => {
      if (selectedAnswers[question.id] === question.answer) {
        score += 5;
      }
    });
    return score;
  };

  // forceSubmit flag bypasses validation for unanswered current question
  const handleSubmit = (forceSubmit = false, e) => {
    if (e) e.preventDefault();
    if (submitted) return;
    if (!selectedAnswers[questionsData[currentQuestion].id] && !forceSubmit) {
      Swal.fire({
        title: "Error!",
        text: "Please choose an option!",
        icon: "error",
        confirmButtonText: "OK",
      });
      return;
    }
    setSubmitted(true);
    const finalScore = computeScore();
    const passingScore = questionsData.length * 5 * 0.75;
    if (finalScore >= passingScore) {
      playSound(passedSound);
      Swal.fire({
        title: "Congratulations!",
        text: `Your level is fair! Final score: ${finalScore}`,
        icon: "success",
        confirmButtonText: "OK",
      });
    } else {
      playSound(failedSound);
      Swal.fire({
        title: "Try again!",
        text: `You failed. Final score: ${finalScore}.\n\nPlease try again.`,
        icon: "error",
        confirmButtonText: "OK",
      });
    }
  };

  if (!quizStarted) {
    return null;
  }

  const currentQuestionData = questionsData[currentQuestion];

  // Calculate sliding window for steps progress
  const totalQuestions = questionsData.length;
  let startIndex = Math.max(
    0,
    currentQuestion - Math.floor(maxStepsToShow / 2)
  );
  if (startIndex + maxStepsToShow > totalQuestions) {
    startIndex = Math.max(0, totalQuestions - maxStepsToShow);
  }
  const stepsToDisplay = questionsData.slice(
    startIndex,
    startIndex + maxStepsToShow
  );

  return (
    <div className="overflow-hidden">
      <main className="mcq-quiz__main">
        <div className="quiz-container row">
          {/* Left Side - Image & Steps */}
          <div className="col-md-5 tab-100 order-tab tab-none">
            <div className="mcq-quiz__side">
              <div className="mcq-quiz__side--image">
                <div className="mcq-quiz__border-up"></div>
                <img src={quizImage} alt="Quiz Visual" />
                <div className="mcq-quiz__border-down"></div>
              </div>

              {/* Steps Progress */}
              <div className="mcq-quiz__step-count">
                <div className="mcq-quiz__step-count-inner">
                  {stepsToDisplay.map((_, index) => {
                    const actualIndex = startIndex + index;
                    return (
                      <div
                        key={actualIndex}
                        className={`step-single ${
                          actualIndex <= currentQuestion ? "active" : ""
                        }`}
                      >
                        <div className="step-line">
                          <div className="fill"></div>
                        </div>
                        <div className="step-number">{actualIndex + 1}</div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - Quiz Content */}
          <div className="col-md-7 tab-100">
            <form
              className="mcq-quiz__form"
              onSubmit={(e) => e.preventDefault()}
            >
              <div className="mcq-quiz__show-section mcq-quiz__wrapper">
                <section className="mcq-quiz__steps">
                  <h1 className="mcq-quiz__question">
                    {currentQuestionData.question}
                  </h1>

                  <fieldset className="mcq-quiz__options">
                    {currentQuestionData.options.map((option, idx) => (
                      <div
                        className={`mcq-quiz__radio-field mcq-quiz__bounce-left ${getAnimationClass(
                          idx
                        )}`}
                        key={idx}
                      >
                        <input
                          className="mcq-quiz__radio"
                          type="radio"
                          name={`question_${currentQuestionData.id}`}
                          value={option}
                          checked={
                            selectedAnswers[currentQuestionData.id] === option
                          }
                          onChange={handleOptionChange}
                        />
                        <label className={`mcq-quiz__op op${idx + 1}`}>
                          {option}
                        </label>
                      </div>
                    ))}
                  </fieldset>

                  {/* Navigation Buttons */}
                  <div className="mcq-quiz__next-prev">
                    {currentQuestion > 0 && (
                      <button
                        className="mcq-quiz__prev"
                        onClick={goToPreviousQuestion}
                      >
                        <i className="fa-solid fa-arrow-left"></i> Last Question
                      </button>
                    )}
                    {currentQuestion < questionsData.length - 1 ? (
                      <button
                        className="mcq-quiz__next"
                        onClick={goToNextQuestion}
                      >
                        Next Question{" "}
                        <i className="fa-solid fa-arrow-right"></i>
                      </button>
                    ) : (
                      <button className="mcq-quiz__next" onClick={handleSubmit}>
                        Submit <i className="fa-solid fa-arrow-right"></i>
                      </button>
                    )}
                  </div>
                </section>
              </div>
              {/* Timer */}
              <div className="mcq-quiz__countdown">
                <h3>
                  <span id="mcq-quiz__countdown-timer">{timer}</span> sec
                </h3>
              </div>
            </form>
          </div>
        </div>

        {/* Footer Line */}
        {/* <div className="mcq-quiz__footer-line"></div> */}
      </main>
      {/* <div id="error"></div> */}
    </div>
  );
};

export default MCQQuiz;
