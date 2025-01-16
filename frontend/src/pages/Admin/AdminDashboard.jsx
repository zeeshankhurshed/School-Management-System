import React from 'react';
import { useGetAllTeachersQuery } from '../../redux/api/teacher';
import { useGetAllStudentsQuery } from '../../redux/api/student';
import { useFetchClassesQuery } from '../../redux/api/classes';
import { useGetAllResultsQuery } from '../../redux/api/result';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

// Registering chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const AdminDashboard = () => {
  const { data: teacherData, isLoading: isLoadingTeachers } = useGetAllTeachersQuery({});
  const { data: studentData, isLoading: isLoadingStudents } = useGetAllStudentsQuery({});
  const { data: classData, isLoading: isLoadingClasses } = useFetchClassesQuery({});
  const { data: resultData, isLoading: isLoadingResults } = useGetAllResultsQuery({});

  // Calculate counts
  const teacherCount = teacherData?.total || 0; // Total teachers
  const studentCount = studentData?.total || 0; // Total students
  const classCount = classData?.all?.length || 0; // Total classes
  const resultCount = resultData?.total || 0; // Total results

  // Chart data
  const chartData = {
    labels: ['Teachers', 'Students', 'Classes', 'Results'],
    datasets: [
      {
        label: 'Total Count',
        data: [teacherCount, studentCount, classCount, resultCount],
        backgroundColor: ['#4F8CF4', '#44D7B6', '#FFCB42', '#A78BFA'], // Colors for each bar
        borderColor: ['#3B7CFF', '#2DAA8C', '#FFBA16', '#7E4BDE'], // Border colors
        borderWidth: 1,
      },
    ],
  };

  // Chart options
  const chartOptions = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: 'Admin Dashboard Statistics',
      },
      tooltip: {
        callbacks: {
          label: function (tooltipItem) {
            return `${tooltipItem.dataset.label}: ${tooltipItem.raw}`;
          },
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div className="container px-4 md:px-8 py-4 w-[80%]">
      <h1 className="text-2xl font-bold mb-6 text-center">Admin Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Teachers Card */}
        <div className="bg-blue-100 shadow-md rounded-lg p-6 text-center">
          <h2 className="text-xl font-semibold mb-2">Teachers</h2>
          {isLoadingTeachers ? (
            <p>Loading...</p>
          ) : (
            <p className="text-3xl font-bold text-blue-600">{teacherCount}</p>
          )}
        </div>

        {/* Students Card */}
        <div className="bg-green-100 shadow-md rounded-lg p-6 text-center">
          <h2 className="text-xl font-semibold mb-2">Students</h2>
          {isLoadingStudents ? (
            <p>Loading...</p>
          ) : (
            <p className="text-3xl font-bold text-green-600">{studentCount}</p>
          )}
        </div>

        {/* Classes Card */}
        <div className="bg-yellow-100 shadow-md rounded-lg p-6 text-center">
          <h2 className="text-xl font-semibold mb-2">Classes</h2>
          {isLoadingClasses ? (
            <p>Loading...</p>
          ) : (
            <p className="text-3xl font-bold text-yellow-600">{classCount}</p>
          )}
        </div>

        {/* Results Card */}
        <div className="bg-purple-100 shadow-md rounded-lg p-6 text-center">
          <h2 className="text-xl font-semibold mb-2">Results</h2>
          {isLoadingResults ? (
            <p>Loading...</p>
          ) : (
            <p className="text-3xl font-bold text-purple-600">{resultCount}</p>
          )}
        </div>
      </div>

      {/* Chart Section */}
      <div className="mt-10">
        <Bar data={chartData} options={chartOptions} />
      </div>
    </div>
  );
};

export default AdminDashboard;
