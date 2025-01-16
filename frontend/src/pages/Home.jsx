import React from 'react';
import Hero from '../components/Hero';
import StudentBlog from '../components/StudentBlog';
import TeachersTestimonials from '../components/TeachersTestimonials';
import Reachus from '../components/Reachus';
import BlogSection from '../components/BlogSection';

const Home = () => {
  return (
    <>
     <Hero/>
     <StudentBlog/>
     <TeachersTestimonials/>
     <Reachus/>
     <BlogSection/>
    </>
  );
}

export default Home;
