import MCQQuiz from "../../../../Components/MCQ_Form/MCQQuiz";
import MCQData from "./MCQData";
export default function FirstLab() {
  return (
    <>
      <MCQQuiz questionsData={MCQData.questions} />
    </>
  );
}
