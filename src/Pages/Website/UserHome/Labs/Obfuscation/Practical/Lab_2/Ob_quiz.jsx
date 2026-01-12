import MCQQuiz from "../../../../Components/MCQ_Form/MCQQuiz";
import Data from "./Ob_Data.json";
import "./Ob_quiz.css";

export default function Ob_Second_Lab() {
  return (
    <>
      <MCQQuiz questionsData={Data.questions} />
    </>
  );
}
