import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import MCQQuiz from "../../../../Components/MCQ_Form/MCQQuiz";
import DigitalForensicsExaminer from "../MCQData/DigitalForensicsExaminer.json";
import IncidentResponder from "../MCQData/IncidentResponder.json";
import MalwareAnalyst from "../MCQData/MalwareAnalyst.json";
import PenetrationTester from "../MCQData/PenetrationTester.json";
import RedTeamer from "../MCQData/RedTeamer.json";
import SecurityAnalyst from "../MCQData/SecurityAnalyst.json";
import SecurityEngineer from "../MCQData/SecurityEngineer.json";

const MCQDataMap = {
  Digital_Forensics_Examiner: DigitalForensicsExaminer,
  Incident_Responder: IncidentResponder,
  Malware_Analyst: MalwareAnalyst,
  Penetration_Tester: PenetrationTester,
  Red_Teamer: RedTeamer,
  Security_Analyst: SecurityAnalyst,
  Security_Engineer: SecurityEngineer,
};

export default function MCQPage() {
  const { category } = useParams();

  const formattedCategory = category?.replace(/\s+/g, "_");

  const [MCQData, setMCQData] = useState(null);

  useEffect(() => {
    console.log("Available categories:", Object.keys(MCQDataMap));
    console.log("Received category:", category);
    console.log("Formatted category:", formattedCategory);

    if (formattedCategory && MCQDataMap[formattedCategory]) {
      setMCQData(MCQDataMap[formattedCategory]);
    } else {
      console.error("Category not found in JSON:", formattedCategory);
    }
  }, [formattedCategory, category]);

  if (!MCQData || !MCQData.questions) return <p>Loading MCQs...</p>;

  return <MCQQuiz questionsData={MCQData.questions} />;
}
