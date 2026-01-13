import React from 'react';
import Header from '../../../components/Header/Header';
import Footer from '../../../components/Footer/Footer';
import mcqData from './MCQCards';
import Banner from '../../../components/Banner/Banner';
import { Card } from '../../../components/Card/Card';
import Go2TopBtn from '../../../components/Go2Top_Btn/Go2Top_Btn';
import LandingPractice from '../../../components/Landing/PracticeLanding';
import PracticeTitle from '../../../components/PracticeTitle/PracticeTitle';
export default function Regex_labs() {
  return (
    <>
      <Banner />
      <Header />
      <LandingPractice />
      <div className='course'>
        <div className='container'>
          <PracticeTitle title={'Careers in Cyber'} />
          <div className='row'>
            {mcqData.map((mcq, id) => (
              <Card key={mcq.id || id} {...mcq} />
            ))}
          </div>
        </div>
      </div>
      <Go2TopBtn />
      <Footer />
    </>
  );
}
