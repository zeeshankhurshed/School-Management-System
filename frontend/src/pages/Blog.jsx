import React from 'react';
import SchoolNews from './BlogNews/SchoolNews';
import Events from './BlogNews/Events';
import AcademicGuidance from './BlogNews/AcademicGuidance';

import ParentGuidance from './BlogNews/ParentGuidance';
import FunInteractiveContent from './BlogNews/FunInteractiveContent';
import StudentTeacherHighlights from './BlogNews/StudentTeacherHighlights';

const Blog = () => {
  return (
    <section className='py-12 container mx-auto'>
      <div>
        <SchoolNews/>
        <Events/>
        <AcademicGuidance/>
       <StudentTeacherHighlights/>
        <FunInteractiveContent/>
        <ParentGuidance/>
      </div>
    </section>
  );
}

export default Blog;
