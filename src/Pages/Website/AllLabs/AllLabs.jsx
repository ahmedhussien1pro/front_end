import React, { useEffect, useState } from 'react';
import Header from '../components/Header/Header';
import Labs from './Labs';
import Footer from '../components/Footer/Footer';
import Go2TopBtn from '../components/Go2Top_Btn/Go2Top_Btn';
import Preloader from '../components/Preloader/Preloader';
export default function HomePage() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);
  return (
    <div className=' home__page--bg'>
      <Go2TopBtn />
      <Preloader loading={loading} />
      <Header />
      <Labs />
      <Footer />
    </div>
  );
}
