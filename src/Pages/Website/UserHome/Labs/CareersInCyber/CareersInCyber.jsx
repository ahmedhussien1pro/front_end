import React from 'react';
import Header from '../../../components/Header/Header';
import Footer from '../../../components/Footer/Footer';
import Banner from '../../../components/Banner/Banner';
import '../../../components/Topics CSS/topics.css';
import courseImage from '../../assets/img/CareersInCyber/courseImage.png';
import CareerImag from '../../assets/img/CareersInCyber/courseImage.png';
import RedTeamerImg from '../../assets/img/CareersInCyber/Red Teamer.png';
import PenetrationTesterImg from '../../assets/img/CareersInCyber/Penetration Tester.png';
import MalwareAnalystImg from '../../assets/img/CareersInCyber/Malware Analyst.png';
import DigitalForensicsExaminerImg from '../../assets/img/CareersInCyber/Digital Forensics Examiner.png';
import IncidentResponderImg from '../../assets/img/CareersInCyber/Incident Responder.png';
import SecurityEngineerImg from '../../assets/img/CareersInCyber/Security Engineer.png';
import SecurityAnalystImg from '../../assets/img/CareersInCyber/Security Analyst.png';
import UseFaqSection from '../../../components/UseFaqSection/UseFaqSection.jsx';
import CourseLanding from '../../../components/Landing/CourseLanding.jsx';
import Go2TopBtn from '../../../components/Go2Top_Btn/Go2Top_Btn.jsx';
import CyberCurriculum from '../../../components/CyberCurriculum/CyberCurriculum.jsx';
// Import JSON Data
import contentData from './careers_in_cyber_content.json';
const imageMap = {
  courseImage,
  CareerImag,
  RedTeamerImg,
  PenetrationTesterImg,
  SecurityAnalystImg,
  SecurityEngineerImg,
  IncidentResponderImg,
  MalwareAnalystImg,
  DigitalForensicsExaminerImg,
};
export default function CareersInCyber() {
  const { handleGoToLab } = UseFaqSection();
  const landingData = {
    ...contentData.landingData,
    courseImage: imageMap.courseImage,
  };
  return (
    <>
      <Banner />
      <Header />
      <CourseLanding {...landingData} />
      <main className='d-flex flex-column gap-2'>
        <CyberCurriculum
          topics={contentData.topics}
          labsLink={contentData.landingData.labsLink}
          imageMap={imageMap}
          onLabClick={handleGoToLab}
        />
      </main>
      <Go2TopBtn />
      <Footer />
    </>
  );
}
