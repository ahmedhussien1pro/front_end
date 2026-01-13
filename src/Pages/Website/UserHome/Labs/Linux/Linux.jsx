import React from 'react';
import Header from '../../../components/Header/Header';
import Footer from '../../../components/Footer/Footer';
import UseFaqSection from '../../../components/UseFaqSection/UseFaqSection.jsx';
import CourseLanding from '../../../components/Landing/CourseLanding.jsx';
import Go2TopBtn from '../../../components/Go2Top_Btn/Go2Top_Btn.jsx';
import CyberCurriculum from '../../../components/CyberCurriculum/CyberCurriculum.jsx';
// Import JSON Data
import courseImage from '../../assets/img/linux/linux_logo.png';
import contentData from './linux_fundamentals_content.json';
const imageMap = {
  courseImage,
};
export default function Linux() {
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
