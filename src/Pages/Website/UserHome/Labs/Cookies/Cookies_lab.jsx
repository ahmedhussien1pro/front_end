import React from 'react';
import Header from '../../../components/Header/Header';
import Footer from '../../../components/Footer/Footer';
import image from '../../assets/img/cookies/Cookies_logo.png';
import { Card } from '../../../components/Card/Card';
import LandingPractice from '../../../components/Landing/PracticeLanding';
import PracticeTitle from '../../../components/PracticeTitle/PracticeTitle';

export default function Cookies_lab() {
  const Labs = [
    {
      // English Content
      en_title: 'Admin has the power',
      en_brief: 'Try to login as admin',
      en_difficulty: 'Easy',

      // Arabic Content
      ar_title: 'المسؤول لديه السلطة',
      ar_brief: 'حاول تسجيل الدخول كمسؤول',
      ar_difficulty: 'سهل',

      // Common Data
      link: '/cookies/cookies_lab/first/login',
      image: image,
      isFree: true,
      topicsCount: 2,
    },
    {
      // English Content
      en_title: 'Hashing',
      en_brief: 'Try to login as admin',
      en_difficulty: 'Easy',

      // Arabic Content
      ar_title: 'التجزئة',
      ar_brief: 'حاول تسجيل الدخول كمسؤول',
      ar_difficulty: 'سهل',

      // Common Data
      link: '/cookies/cookies_lab/second/login',
      image: image,
      isFree: true,
      topicsCount: 3,
    },
  ];

  return (
    <>
      <Header />
      {/* Start Landing  */}
      <LandingPractice />
      {/* End Landing  */}
      {/* Start Courses  */}
      <div className='course'>
        <div className='container'>
          <PracticeTitle title={'Cookies'} />
          <div className='row'>
            {Labs.map((lab, index) => {
              return <Card key={index} {...lab} />;
            })}
          </div>
        </div>
      </div>
      {/* End Course Content  */}
      <Footer />
    </>
  );
}
