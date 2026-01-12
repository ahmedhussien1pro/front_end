import MCQQuiz from "../../../../Components/MCQ_Form/MCQQuiz";
import MCQData from "../MCQ_Date/Path_Traversal[2].json";
import Goback from "../../../../Components/GoBack_Btn/GoBack_Btn";

export default function PathTraversalMcq2() {
  return (
    <>
      <Goback />
      <MCQQuiz questionsData={MCQData.questions} />
    </>
  );
}
