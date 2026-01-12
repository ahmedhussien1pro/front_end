import React from 'react';
import '../../Components/Topics CSS/topics.css';
import Header from '../../Header/Header';
import courseImage from '../../assets/img/linux/linux_logo.png';
import Footer from '../../Footer/Footer';
import UseFaqSection from '../../Components/UseFaqSection/UseFaqSection.jsx';
import CourseLanding from '../../Components/Landing/CourseLanding.jsx';
import Go2TopBtn from '../../Components/Go2Top_Btn/Go2Top_Btn.jsx';
// Import JSON Data
import contentData from './linux_fundamentals_content.json';
import CyberCurriculum from '../../Components/CyberCurriculum/CyberCurriculum.jsx';
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
