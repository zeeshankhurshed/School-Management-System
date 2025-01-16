import React from 'react';

const StudentsDashboard = () => {
  // Hardcoded data for demo purposes
  const studentProfile = {
    name: "John Doe",
    grade: "10th",
    rollNumber: "25",
    profilePic: "/path/to/profile-pic.jpg",
  };

  const grades = [
    { subject: "Math", grade: "A" },
    { subject: "History", grade: "B+" },
    { subject: "Science", grade: "A-" },
  ];

  const attendance = {
    totalClasses: 20,
    present: 18,
    absent: 2,
  };

  const upcomingAssignments = [
    { subject: "Math", assignment: "Homework", dueDate: "January 10th" },
    { subject: "English", assignment: "Essay", dueDate: "January 15th" },
    { subject: "Science", assignment: "Lab Report", dueDate: "January 20th" },
  ];

  const recentResults = [
    { testName: "Test on January 5th", score: "85%" },
    { testName: "Final Exam", score: "92%" },
  ];

  const announcements = [
    "School will be closed on January 18th for Maintenance.",
    "Parent-Teacher Meeting on January 22nd.",
  ];

  return (
    <div className="container px-4 md:px-8 py-8 w-[85%]">
      <h1 className="text-2xl font-bold mb-6 text-center">Student Dashboard</h1>

      {/* Student Profile */}
      <div className="bg-blue-100 shadow-md rounded-lg p-6 text-center mb-6">
        <h2 className="text-xl font-semibold mb-2">{studentProfile.name}</h2>
        <p>Grade: {studentProfile.grade}</p>
        <p>Roll Number: {studentProfile.rollNumber}</p>
        <img
          src={studentProfile.profilePic}
          alt="Profile"
          className="w-32 h-32 rounded-full mx-auto mt-4"
        />
      </div>

      {/* Grades */}
      <h2 className="text-xl font-semibold my-6">Grades</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {grades.map((grade, index) => (
          <div key={index} className="bg-gray-100 p-4 rounded-lg shadow-md text-center">
            <h3 className="text-lg font-bold">{grade.subject}</h3>
            <p>{grade.grade}</p>
          </div>
        ))}
      </div>

      {/* Attendance */}
      <h2 className="text-xl font-semibold my-6">Attendance</h2>
      <div className="bg-gray-100 p-4 rounded-lg shadow-md text-center mb-6">
        <p>Total Classes: {attendance.totalClasses}</p>
        <p>Present: {attendance.present}</p>
        <p>Absent: {attendance.absent}</p>
      </div>

      {/* Upcoming Assignments */}
      <h2 className="text-xl font-semibold my-6">Upcoming Assignments</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {upcomingAssignments.map((assignment, index) => (
          <div key={index} className="bg-gray-100 p-4 rounded-lg shadow-md text-center">
            <h3 className="text-lg font-bold">{assignment.subject}</h3>
            <p>{assignment.assignment}</p>
            <p>Due: {assignment.dueDate}</p>
          </div>
        ))}
      </div>

      {/* Recent Results */}
      <h2 className="text-xl font-semibold my-6">Recent Results</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {recentResults.map((result, index) => (
          <div key={index} className="bg-gray-100 p-4 rounded-lg shadow-md text-center">
            <h3 className="text-lg font-bold">{result.testName}</h3>
            <p>Score: {result.score}</p>
          </div>
        ))}
      </div>

      {/* Announcements */}
      <h2 className="text-xl font-semibold my-6">School Announcements</h2>
      <div className="bg-gray-100 p-4 rounded-lg shadow-md text-center mb-6">
        <ul>
          {announcements.map((announcement, index) => (
            <li key={index}>{announcement}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default StudentsDashboard;
