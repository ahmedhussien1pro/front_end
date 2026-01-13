import React from 'react';
import Header from '../../../components/Header/Header';
import Footer from '../../../components/Footer/Footer';
import '../../../components/Topics CSS/topics.css';
import courseImage from '../../assets/img/BLV/course_image.png';
import logicFlow from '../../assets/img/BLV/logic-flaws.jpg';
import CourseLanding from '../../../components/Landing/CourseLanding.jsx';
import Banner from '../../../components/Banner/Banner.jsx';
import Go2TopBtn from '../../../components/Go2Top_Btn/Go2Top_Btn.jsx';
import UseFaqSection from '../../../components/UseFaqSection/UseFaqSection.jsx';
import CyberCurriculum from '../../../components/CyberCurriculum/CyberCurriculum.jsx';
// Import JSON Data
import contentData from './bl_vuln_content.json';
const imageMap = {
  courseImage: courseImage,
  logicFlow: logicFlow,
};

export default function BL_Vuln() {
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
