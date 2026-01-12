import MCQQuiz from "../../../../Components/MCQ_Form/MCQQuiz";
import MCQData from "./MCQData.json";
import { useState } from "react";
import GoBackBtn from "../../../../Components/GoBack_Btn/GoBack_Btn";
// import ShowHintBtn from "../../../../Components/ShowHint_Btn/ShowHint_Btn";
import Go2TopBtn from "../../../../Components/Go2Top_Btn/Go2Top_Btn";
export default function FirstLab() {
   const [quizStarted, setQuizStarted] = useState(false);
  // const hintMessage = `
  //   <ul style="text-align: left; font-size: 16px; line-height: 1.8;">
  //     <li>1.
        
  //     </li>      
  //   </ul>
  // `;
  return (
    <>
      {/* <GoBackBtn /> */}
      {/* <ShowHintBtn hintText={hintMessage} /> */}
      {/* <h2 className="lab-header">Lab1</h2> */}
      <MCQQuiz questionsData={MCQData.questions} />
      
      {/* <Go2TopBtn /> */}
    </>
  );
}
