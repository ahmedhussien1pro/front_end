import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import MCQQuiz from "../../Components/MCQ_Form/MCQQuiz";
import BLOCK_CHIN_AND_CRYPTOCURRENCY from "./practical/MCQData/BlockchainAndCryptocurrency.json";
import COMPUTER_FORENSICS from "./practical/MCQData/Computer.json";
import CLOUD_FORENSICS from "./practical/MCQData/Cloud.json";
import DATABASE_FORENSICS from "./practical/MCQData/Database";
import DATA_RECOVERY_FORENSICS from "./practical/MCQData/DataRecovery";
import DRONE_FORENSICS from "./practical/MCQData/Drone.json";
import EMAIL_FORENSICS from "./practical/MCQData/Email.json";
import GAMING_FORENSICS from "./practical/MCQData/Gaming.json";
import IOT_FORENSICS from "./practical/MCQData/IoT.json";
import MALWARE_FORENSICS from "./practical/MCQData/Malware.json";
import MOBILE_FORENSICS from "./practical/MCQData/Mobile.json";
import MULTIMEDIA_FORENSICS from "./practical/MCQData/Multimedia.json";
import NETWORK_FORENSICS from "./practical/MCQData/Network.json";
import SOCIAL_MEDIA_FORENSICS from "./practical/MCQData/SocialMedia.json";
import VEHICLE_FORENSICS from "./practical/MCQData/Vehicle.json";


const MCQDataMap = {
  BlockChain: BLOCK_CHIN_AND_CRYPTOCURRENCY,
  Computer: COMPUTER_FORENSICS,
  Cloud: CLOUD_FORENSICS,
  Database: DATABASE_FORENSICS,
  DataRecovery: DATA_RECOVERY_FORENSICS,
  Drone: DRONE_FORENSICS,
  Email: EMAIL_FORENSICS,
  Gaming: GAMING_FORENSICS,
  IoT: IOT_FORENSICS,
  Malware: MALWARE_FORENSICS,
  Mobile: MOBILE_FORENSICS,
  Multimedia: MULTIMEDIA_FORENSICS,
  Network: NETWORK_FORENSICS,
  SocialMedia: SOCIAL_MEDIA_FORENSICS,
  Vehicle: VEHICLE_FORENSICS,
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

