import React from 'react';
import Header from '../../../components/Header/Header';
import Footer from '../../../components/Footer/Footer';
import courseImage from '../../assets/img/cookies/course_image.png';
import CourseLanding from '../../../components/Landing/CourseLanding.jsx';
import Go2TopBtn from '../../../components/Go2Top_Btn/Go2Top_Btn.jsx';
import InLab3 from '../../assets/img/inLab3.png';
// Import JSON Data
import contentData from './cookies_content.json';
import UseFaqSection from '../../../components/UseFaqSection/UseFaqSection.jsx';
import CyberCurriculum from '../../../components/CyberCurriculum/CyberCurriculum.jsx';
const imageMap = {
  courseImage,
  InLab3,
};
export default function Cookies() {
  const { handleGoToLab } = UseFaqSection();

  const landingData = {
    ...contentData.landingData,
    courseImage: imageMap.courseImage,
  };

  return (
    <div className='page-wrapper'>
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
    </div>
  );
}
