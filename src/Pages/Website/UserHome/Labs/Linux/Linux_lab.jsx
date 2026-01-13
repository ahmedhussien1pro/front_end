import React from 'react';
import Header from '../../../components/Header/Header';
import Footer from '../../../components/Footer/Footer';
import { Card } from '../../../components/Card/Card';
import LandingPractice from '../../../components/Landing/PracticeLanding';
import PracticeTitle from '../../../components/PracticeTitle/PracticeTitle';
import image from '../../assets/img/linux/card_image.png';

export default function Linux_lab() {
  const Labs = [
    {
      // English Content
      en_title: 'Be Patient or Skillful',
      en_brief: 'Try to Capture the Flag',
      en_difficulty: 'Easy',

      // Arabic Content
      ar_title: 'كن صبورًا أو ماهرًا',
      ar_brief: 'حاول الحصول على العلم',
      ar_difficulty: 'سهل',

      // Common Data
      link: '/linux/linux_lab/patient',
      image: image,
      isFree: true,
      topicsCount: 2,
    },
    {
      // English Content
      en_title: 'Power Of Command',
      en_brief: 'Try to Capture the Flag',
      en_difficulty: 'Easy',

      // Arabic Content
      ar_title: 'قوة الأوامر',
      ar_brief: 'حاول الحصول على العلم',
      ar_difficulty: 'سهل',

      // Common Data
      link: '/linux/linux_lab/power-of-command',
      image: image,
      isFree: true,
      topicsCount: 3,
    },
    {
      // English Content
      en_title: 'Welcome',
      en_brief: 'Try to Capture the Flag',
      en_difficulty: 'Easy',

      // Arabic Content
      ar_title: 'مرحبًا',
      ar_brief: 'حاول الحصول على العلم',
      ar_difficulty: 'سهل',

      // Common Data
      link: '/linux/linux_lab/welcome',
      image: image,
      isFree: true,
      topicsCount: 1,
    },
    {
      // English Content
      en_title: 'Test Yourself',
      en_brief: 'Try to Capture the Flag',
      en_difficulty: 'Easy',

      // Arabic Content
      ar_title: 'اختبر نفسك',
      ar_brief: 'حاول الحصول على العلم',
      ar_difficulty: 'سهل',

      // Common Data
      link: '/linux/linux_lab/test-yourself',
      image: image,
      isFree: true,
      topicsCount: 4,
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
          <PracticeTitle title={'Linux'} />
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
