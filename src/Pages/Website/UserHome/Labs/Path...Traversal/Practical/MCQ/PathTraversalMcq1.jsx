import React from "react";
import MCQQuiz from "../../../../Components/MCQ_Form/MCQQuiz";
import MCQData from "../MCQ_Date/Path_Traversal.json";
import Goback from "../../../../Components/GoBack_Btn/GoBack_Btn";
export default function PathTraversalMcq1() {
  return (
    <>
      <Goback />
      <MCQQuiz questionsData={MCQData.questions} />
    </>
  );
}
