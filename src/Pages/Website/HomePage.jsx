import React, { useEffect, useState } from 'react';
import Preloader from './components/Preloader/Preloader';
import Header from './components/Header/Header';
import CountsSection from './components/CountsSection/CountsSection';
import Services from './components/Services/Services';
import Platform from './components/Platform/Platform';
// import PopularCoursesSection from './PopularCoursesSection/PopularCoursesSection';
import Footer from './components/Footer/Footer';
import HomeLanding from './components/HomeLanding/HomeLanding';
import TestimonialsSection from './components/TestimonialsSection/TestimonialsSection';
import Go2TopBtn from './components/Go2Top_Btn/Go2Top_Btn';
export default function HomePage() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 200);
    return () => clearTimeout(timer);
  }, []);
  return (
    <div className=' home__page--bg' style={{ overflowX: 'hidden' }}>
      <Go2TopBtn />
      <Preloader loading={loading} />
      <Header />
      <HomeLanding />
      <CountsSection />
      <Services />
      <Platform />
      {/* <PopularCoursesSection /> */}
      <TestimonialsSection />
      <Footer />
    </div>
  );
}
