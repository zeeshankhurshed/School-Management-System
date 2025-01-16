import React from 'react';
import { useGetAllTeachersQuery } from '../../redux/api/teacher';

const AdminDashboard = () => {
  const { data: teacherData, isLoading: isLoadingTeachers } = useGetAllTeachersQuery();

  const { total } = teacherData || {};  // Destructuring total from teacherData

  // Hardcoded schedules for now
  const hardcodedSchedules = [
    { id: 1, teacherName: "John Doe", className: "Mathematics", time: "9:00 AM - 10:30 AM", specialActivity: "Morning Assembly Coordination" },
    { id: 2, teacherName: "Jane Smith", className: "Science", time: "10:45 AM - 12:15 PM", specialActivity: "Lab Supervision" },
    { id: 3, teacherName: "Emma Brown", className: "History", time: "1:30 PM - 3:00 PM", specialActivity: "Curriculum Development" },
    { id: 4, teacherName: "Michael Johnson", className: "English", time: "3:15 PM - 4:45 PM", specialActivity: "Parent-Teacher Meetings" },
  ];

  const teacherOfTheDay = teacherData?.teachers?.[0] || { name: "John Doe", specialDuty: "Assembly Coordination" };
  const teacherOfTheMonth = teacherData?.teachers?.[1] || { name: "Jane Smith", feedbackScore: 9.8 };

  // Hardcoded upcoming events
  const upcomingEvents = [
    { id: 1, eventName: "Parent-Teacher Meeting", date: "January 15th, 3:00 PM" },
    { id: 2, eventName: "Staff Meeting", date: "January 20th, 10:00 AM" },
  ];

  // Hardcoded teacher performance
  const teacherPerformance = [
    { teacherName: "John Doe", feedbackScore: 8.9 },
    { teacherName: "Jane Smith", feedbackScore: 9.4 },
  ];

  return (
    <div className="container px-4 md:px-8 py-8 w-[85%]">
      <h1 className="text-2xl font-bold mb-6 text-center">Teacher Dashboard</h1>

      {/* Teacher Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-blue-100 shadow-md rounded-lg p-6 text-center">
          <h2 className="text-xl font-semibold mb-2">All Teachers</h2>
          {isLoadingTeachers ? (
            <p>Loading...</p>
          ) : (
            <p className="text-3xl font-bold text-blue-600">{total || 0}</p>
          )}
        </div>

        <div className="bg-green-100 shadow-md rounded-lg p-6 text-center">
          <h2 className="text-xl font-semibold mb-2">Teacher of the Day</h2>
          <p>{teacherOfTheDay.name}</p>
          <p>Special Duty: {teacherOfTheDay.specialDuty}</p>
        </div>

        <div className="bg-yellow-100 shadow-md rounded-lg p-6 text-center">
          <h2 className="text-xl font-semibold mb-2">Teacher of the Month</h2>
          <p>{teacherOfTheMonth.name}</p>
          <p>Feedback Score: {teacherOfTheMonth.feedbackScore}</p>
        </div>
      </div>

      {/* Upcoming Events */}
      <h2 className="text-xl font-semibold my-6">Upcoming Events</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {upcomingEvents.map((event) => (
          <div key={event.id} className="bg-gray-100 p-4 rounded-lg shadow-md text-center">
            <h3 className="text-lg font-bold">{event.eventName}</h3>
            <p>{event.date}</p>
          </div>
        ))}
      </div>

      {/* Teacher Performance */}
      <h2 className="text-xl font-semibold my-6">Teacher Performance</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {teacherPerformance.map((performance, index) => (
          <div key={index} className="bg-gray-100 p-4 rounded-lg shadow-md text-center">
            <h3 className="text-lg font-bold">{performance.teacherName}</h3>
            <p>Feedback Score: {performance.feedbackScore}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminDashboard;
