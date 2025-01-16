import React from "react";
import { Link, useLocation } from "react-router-dom";

const TeacherDetails = () => {
  const location = useLocation();
  const { teacher } = location.state || {};

  if (!teacher) {
    return (
      <div className="text-center py-16 text-gray-600">
        Teacher details not available.
      </div>
    );
  }

  return (
    <section className="py-12 ">
      <div className="container mx-auto p-6 md:p-12  rounded-lg">
        {/* Profile Section */}
        <div className="flex flex-col items-center ">
          {/* Profile Picture */}
          <div className="mb-6 md:mb-0 md:mr-8">
            <img
              src={`${teacher.profilePicture.replace(/\\/g, "/")}`}
              alt={`${teacher.name}'s Photo`}
              className="w-40 h-40 md:w-48 md:h-48 object-cover rounded-full shadow-md"
            />
          </div>

          {/* Teacher Information */}
          <div className="flex flex-col justify-center space-y-4 text-gray-800 w-full mx-auto">
            <h2 className="text-3xl font-bold text-center my-6 text-blue-700">
              {teacher.name}
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
              <p>
                <span className="font-semibold text-gray-600">Email:</span>{" "}
                {teacher.email}
              </p>
              <p>
                <span className="font-semibold text-gray-600">Employee ID:</span>{" "}
                {teacher.employeeId}
              </p>
              <p>
                <span className="font-semibold text-gray-600">
                  Contact Number:
                </span>{" "}
                {teacher.contactNumber}
              </p>
              <p>
                <span className="font-semibold text-gray-600">Gender:</span>{" "}
                {teacher.gender.charAt(0).toUpperCase() +
                  teacher.gender.slice(1)}
              </p>
              <p>
                <span className="font-semibold text-gray-600">Date of Birth:</span>{" "}
                {new Date(teacher.dob).toLocaleDateString()}
              </p>
              <p>
                <span className="font-semibold text-gray-600">Joining Date:</span>{" "}
                {new Date(teacher.joiningDate).toLocaleDateString()}
              </p>
              <p>
                <span className="font-semibold text-gray-600">Experience:</span>{" "}
                {teacher.experience} years
              </p>
              <p>
                <span className="font-semibold text-gray-600">Salary:</span>{" "}
                ${teacher.salary.toLocaleString()}
              </p>
              <p>
                <span className="font-semibold text-gray-600">Qualification:</span>{" "}
                {teacher.qualification?.join(", ")}
              </p>
              <p>
                <span className="font-semibold text-gray-600">Subjects:</span>{" "}
                {teacher.subject?.join(", ")}
              </p>
              <p className="md:col-span-2">
                <span className="font-semibold text-gray-600">Address:</span>{" "}
                {teacher.address}
              </p>
            </div>
          </div>
          <div className="flex justify-center items-center text-xl">
            <Link
              to={'/teachersDashboard/teacherList'}
              className="animate-pulse underline font-bold"
            >
              Go Back to Listing Page
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TeacherDetails;
