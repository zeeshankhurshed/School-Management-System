import React from "react";
import { useGetAllHighlightsQuery } from "../../redux/api/blog";
import Loader from "../../components/Loader";
import { Link } from "react-router-dom";

const StudentTeacherHighlights = () => {
  const { data, isLoading, error } = useGetAllHighlightsQuery();
  // console.log("data:", data);

  const highlights = data?.data || [];

  if (isLoading) return <p><Loader /></p>;
  if (error) return <p>Error loading data....</p>;

  // Filter highlights by type
  const studentHighlights = highlights.filter(item => item.type === "Student");
  const teacherHighlights = highlights.filter(item => item.type === "Teacher");


  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };
  return (
    <div className="student-teacher-highlights px-4 py-6 bg-gray-100 rounded-lg shadow-lg">
      {/* Header */}
      <header className="mb-6 text-center">
        <h1 className="text-xl md:text-4xl font-bold text-gray-800">Student & Teacher Highlights</h1>
        <p className="text-sm md:text-lg text-gray-600">
          Celebrating the achievements and stories that inspire our community.
        </p>
      </header>

      {/* Student Achievements */}
      <section className="student-achievements mb-8">
        <h2 className="text-xl md:text-2xl font-semibold mb-4 text-gray-700">Student Achievements</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {studentHighlights.map(student => {
            return (
              <div
                key={student._id}
                className="achievement-card p-6 border border-gray-200 rounded-md shadow-md hover:bg-blue-100 transition duration-200"
              >
                <h3 className="text-lg font-semibold text-gray-900 capitalize">
                  {student.name} - {student.achievement}
                </h3>
                <p className="text-gray-700">{student.description}</p>
                <p className='text-sm font-semibold text-gray-700'>
                  Created At: {formatDate(student.createdAt)}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Teacher Spotlights */}
      <section className="teacher-features">
        <h2 className="text-xl md:text-2xl font-semibold mb-4 text-gray-700">Teacher Spotlights</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {teacherHighlights.map(teacher => {
            return (
              <div
                key={teacher._id}
                className="teacher-card p-6 border border-gray-200 rounded-md shadow-md hover:bg-yellow-100 transition duration-200"
              >
                <h3 className="text-lg font-semibold text-gray-900">
                  {teacher.name} - {teacher.achievement}
                </h3>
                <p className="text-gray-700">{teacher.description}</p>
                <p className='text-sm font-semibold text-gray-700'>
                  Created At: {formatDate(teacher.createdAt)}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Call-to-Action */}
      <div className="cta mt-6 text-center text-sm">
        <p className="text-gray-600">
          Know someone who deserves a spotlight?{" "}
          <Link href="#" className="text-blue-500 hover:underline">
            Nominate them here!
          </Link>
        </p>
      </div>

      {/* Footer */}
      <footer className="mt-6 text-center text-gray-500 text-sm">
        <p>
          Explore more inspiring stories in our{" "}
          <Link to="#" className="text-blue-500 hover:underline text-xs">
            blog section
          </Link>.
        </p>
      </footer>
    </div>
  );
};

export default StudentTeacherHighlights;
