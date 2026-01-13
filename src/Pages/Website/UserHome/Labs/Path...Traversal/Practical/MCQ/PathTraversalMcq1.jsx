import React from 'react';
import MCQQuiz from '../../../../../components/MCQ_Form/MCQQuiz';
import MCQData from '../MCQ_Date/Path_Traversal.json';
import Goback from '../../../../../components/GoBack_Btn/GoBack_Btn';
export default function PathTraversalMcq1() {
  return (
    <>
      <Goback />
      <MCQQuiz questionsData={MCQData.questions} />
    </>
  );
}
