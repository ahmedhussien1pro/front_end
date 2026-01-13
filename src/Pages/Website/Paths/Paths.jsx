import React, { useEffect, useState } from 'react';
import Header from '../components/Header/Header';
import PathsTree from './PathsTree';
import Go2TopBtn from '../components/Go2Top_Btn/Go2Top_Btn';
import Preloader from '../components/Preloader/Preloader';
export default function HomePage() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 200);
    return () => clearTimeout(timer);
  }, []);
  return (
    <div
      className=' home__page container-fluid '
      style={{ overflowX: 'hidden' }}>
      <Go2TopBtn />
      <Preloader loading={loading} />
      <Header />
      <PathsTree />
      {/* <Footer /> */}
    </div>
  );
}
