import React from 'react';
import { motion } from 'framer-motion';
import { useGetAllStudentsQuery } from '../redux/api/student';
import SliderUtils from './SliderUtils';
import { useFetchClassesQuery } from '../redux/api/classes';
import { useGetAllResultsQuery } from '../redux/api/result';

const colorVariants = {
  initial: { color: "#000" },
  animate: {
    color: ["#000", "#1abc9c", "#3498db", "#9b59b6", "#000"],
    transition: {
      duration: 5,
      repeat: Infinity,
      repeatType: "loop",
    },
  },
};

const StudentBlog = () => {
  const { data: studentData, isLoading: isLoadingStudents, isError } = useGetAllStudentsQuery();
  const { data: classes } = useFetchClassesQuery();
  const { data: resultsData } = useGetAllResultsQuery();

  if (isLoadingStudents) {
    return <div>Loading students...</div>;
  }

  if (isError) {
    return <div>Failed to load students data.</div>;
  }

  // Extract nested arrays
  const students = studentData?.students || [];
  const classList = classes?.all || [];
  const results = resultsData?.results || [];
// console.log("studentBlog",results);

  return (
    <div>
      <h2 className="text-center text-sm md:text-2xl uppercase font-extrabold my-12 italic">
        <motion.span variants={colorVariants} initial="initial" animate="animate">
          Our Bright
        </motion.span>{" "}
        <motion.span variants={colorVariants} initial="initial" animate="animate">
          Students
        </motion.span>
      </h2>
      <div className=''>
        <SliderUtils students={students} classes={{ all: classList }} results={results} />
      </div>
    </div>
  );
};

export default StudentBlog;
