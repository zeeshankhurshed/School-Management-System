import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useGetAllStudentsQuery } from '../../redux/api/student';
import { useFetchClassesQuery } from '../../redux/api/classes';
import Loader from '../../components/Loader';

const StudentList = () => {
  const [search, setSearch] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const [page, setPage] = useState(1);
  const limit = 10;

  // Debounce effect
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(search);
    }, 500);

    return () => clearTimeout(handler);
  }, [search]);

  // Fetch students with server-side pagination and debounced search
  const { data: studentData, isLoading, isError } = useGetAllStudentsQuery({
    search: debouncedSearch,
    page,
    limit,
  });

  const { students = [], total = 0 } = studentData || {};
  // console.log('Student Data:', students);

  // Fetch class list
  const { data: classes, isLoading: isLoadingClasses } = useFetchClassesQuery();
  const classList = classes?.all || [];

  const getClassName = (schoolClass) => {
    const classId = schoolClass?._id;
    if (!classId) return 'Unknown Class';
    const matchedClass = classList.find((cls) => cls._id === classId);
    // console.log('Matched Class:', matchedClass);
    return matchedClass?.name || 'Unknown Class';
  };


  // Ensure classList is populated
  // console.log('Class List at getClassName Call:', classList);



  // Example check before rendering
  if (isLoadingClasses) return <Loader />;


  const handleSearch = (e) => {
    setSearch(e.target.value);
    setPage(1);
  };

  const handleNextPage = () => setPage((prev) => prev + 1);
  const handlePrevPage = () => setPage((prev) => Math.max(prev - 1, 1));

  return (
    <div className="container mx-auto px-1 md:px-8 py-8">
      <div className="text-center text-2xl font-semibold mb-8">
        All Students ({total})
      </div>

      {/* Search Input */}
      <div className="mb-4 text-center">
        <input
          type="text"
          placeholder="Search students..."
          value={search}
          onChange={handleSearch}
          className="border rounded-md p-2 w-full md:w-1/2 focus:outline-none"
        />
        {!isLoading && debouncedSearch && !students.length && (
          <div className="text-red-500 mt-2">No Students found.</div>
        )}
      </div>

      {isLoading || isLoadingClasses ? (
        <div className="text-center py-8">
          <Loader />
        </div>
      ) : (
        <>
          {/* Students Table */}
          {students.length > 0 && (
            <div>
              <table className="w-full border-collapse">
                <thead>
                  <tr>
                    <th className="border border-gray-600 md:p-2 text-center text-xs md:text-sm">Photo</th>
                    <th className="border border-gray-600 md:p-2 text-center text-xs md:text-sm">Full Name</th>
                    <th className="border border-gray-600 md:p-2 text-center text-xs md:text-sm">Admission Number</th>
                    <th className="border border-gray-600 md:p-2 text-center text-xs md:text-sm">Class & Section</th>
                    <th className="border border-gray-600 md:p-2 text-center text-xs md:text-sm">Roll Number</th>
                    <th className="border border-gray-600 md:p-2 text-center text-xs md:text-sm">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {students.map((student) => {
                    // console.log('Student School Class:', student.schoolClass);
                    const className = getClassName(student.schoolClass);
                    const section = student.section || 'N/A';

                    return (
                      <tr key={student._id} className="text-center">
                        <td className="p-2">
                          <img
                            src={`${student.photo.replace(/\\/g, '/')}`}
                            alt={`${student.fullName}'s Photo`}
                            width="60"
                            className="object-cover mx-auto"
                          />
                        </td>
                        <td className="p-2 text-xs md:text-sm">{student.fullName}</td>
                        <td className="p-2 text-xs md:text-sm">{student.admissionNumber}</td>
                        <td className="p-2 text-xs md:text-sm">
                          {className} - {section}
                        </td>
                        <td className="p-2 text-xs md:text-sm">{student.rollNumber}</td>
                        <td className="p-2 text-xs md:text-sm">
                          <Link
                            to={`/studentsDashboard/students/${student._id}`}
                            state={{ student, className }}
                          >
                            <button className="bg-blue-500 text-xs md:text-sm text-white px-1 md:px-4 py-2 rounded">
                              View Details
                            </button>
                          </Link>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}

          {/* Pagination */}
          <div className="text-center my-8">
            <button
              onClick={handlePrevPage}
              disabled={page === 1}
              className={`py-2 px-4 rounded mr-4 ${page === 1 ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 text-white hover:bg-blue-700'
                }`}
            >
              Previous
            </button>
            <button
              onClick={handleNextPage}
              disabled={page * limit >= total}
              className={`py-2 px-4 rounded ${page * limit >= total
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-blue-600 text-white hover:bg-blue-700'
                }`}
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default StudentList;
