import React, { useState } from "react";
import "./MCQV2.css";

const Quiz = ({ questions }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [showThankYou, setShowThankYou] = useState(false);
  const [answerStatus, setAnswerStatus] = useState(null);

  const handleAnswerSelect = (questionId, answer, correctAnswer) => {
    setSelectedAnswers({ ...selectedAnswers, [questionId]: answer });

    // Check if the selected answer is correct
    if (answer === correctAnswer) {
      setAnswerStatus({
        status: "correct",
        selected: answer,
        correct: correctAnswer,
      });
    } else {
      setAnswerStatus({
        status: "wrong",
        selected: answer,
        correct: correctAnswer,
      });
    }

    // Automatically move to the next question after selection
    setTimeout(() => {
      setAnswerStatus(null);
      if (currentQuestionIndex < questions.length - 1) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
      } else {
        setShowThankYou(true);
      }
    }, 1000); // Delay to allow the user to see their selection
  };

  if (showThankYou) {
    return (
      <div className="thankyou-page">
        <div className="main-inner">
          <h1>
            <span>Thank You</span> For Your Time!
          </h1>
          <p>Your submission has been received.</p>
        </div>
      </div>
    );
  }

  const currentQuestion = questions[currentQuestionIndex];

  return (
    <div className="body-quiz2">
      <div className="main-quiz2">
        <div className="step-bar">
          <div
            className="fill"
            style={{
              width: `${
                ((currentQuestionIndex + 1) / questions.length) * 100
              }%`,
            }}
          ></div>
        </div>
        <form className="show-section">
          <section className="steps">
            <div className="step-number">
              Question {currentQuestionIndex + 1} / {questions.length}
            </div>
            <h1 className="quiz-question">{currentQuestion.question}</h1>
            <fieldset id={`step${currentQuestionIndex + 1}`}>
              {currentQuestion.options.map((option, index) => (
                <div
                  key={index}
                  className={`radio-field bounce-left ${
                    answerStatus?.selected === option
                      ? answerStatus.status === "correct"
                        ? "correct-answer"
                        : "wrong-answer"
                      : answerStatus?.correct === option
                      ? "correct-answer"
                      : ""
                  }`}
                >
                  <input
                    type="radio"
                    name={`question-${currentQuestion.id}`}
                    value={option}
                    checked={selectedAnswers[currentQuestion.id] === option}
                    onChange={() =>
                      handleAnswerSelect(
                        currentQuestion.id,
                        option,
                        currentQuestion.correct_answer
                      )
                    }
                  />
                  <label>
                    {option}
                    {answerStatus?.selected === option &&
                      answerStatus.status === "correct" &&
                      " ✅"}
                    {answerStatus?.selected === option &&
                      answerStatus.status === "wrong" &&
                      " ❌"}
                  </label>
                </div>
              ))}
            </fieldset>
          </section>
        </form>
      </div>
    </div>
  );
};

export default Quiz;
