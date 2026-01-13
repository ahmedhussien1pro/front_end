import React, { useEffect, useState } from 'react';
import Courses from '../components/Courses/Courses';
import Footer from '../components/Footer/Footer';
import Header from '../components/Header/Header';
import Landing from '../components/Landing/LearnLanding';
import Preloader from '../components/Preloader/Preloader';
export default function UserHome() {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 200);
    return () => clearTimeout(timer);
  }, []);
  return (
    <div style={{ position: 'relative' }}>
      <Header />
      <Preloader loading={loading} />
      <Landing />
      <Courses />
      <Footer />
    </div>
  );
}
