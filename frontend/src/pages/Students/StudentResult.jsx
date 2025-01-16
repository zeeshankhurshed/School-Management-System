import React, { useState, useEffect } from 'react';
import { useDeleteResultMutation, useGetAllResultsQuery } from '../../redux/api/result';
import Loader from '../../components/Loader';
import { useFetchClassesQuery } from '../../redux/api/classes';
import { useGetAllStudentsQuery } from '../../redux/api/student';
import StudentResultDetailsModal from '../../components/StudentDetailsModal';
import { useSelector } from 'react-redux';
import { MdOutlineDelete } from "react-icons/md";
import { FcViewDetails } from "react-icons/fc";
import { toast } from 'react-toastify';

const StudentResult = () => {
    const [search, setSearch] = useState('');
    const [debouncedSearch, setDebouncedSearch] = useState('');
    const [page, setPage] = useState(1);
    const limit = 10;

    // Debounce the search input
    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedSearch(search);
            console.log('Debounced Search:', search); // Log debounced search
        }, 500);

        return () => clearTimeout(handler);
    }, [search]);

    // Fetch results based on debounced search
    const { data: resultData, isLoading, isError } = useGetAllResultsQuery({
        search: debouncedSearch.trim(),
        page,
        limit,
    });


    // Log API call parameters and results
    useEffect(() => {
        console.log('Result Data:', resultData); // Log result data
    }, [resultData]);

    const { results = [], total = 0 } = resultData || {};
    const { data: students } = useGetAllStudentsQuery();
    const { data: classes } = useFetchClassesQuery();
    const [selectedResult, setSelectedResult] = useState(null);
    const { userInfo } = useSelector((state) => state.auth);
    const [deleteResult, { isLoading: isDeletingResult }] = useDeleteResultMutation();

    const classList = classes?.all || [];
    const studentList = students || [];

    const getClassName = (classId) => {
        if (!classId) return "Unknown Class";
        const matchedClass = classList.find((cls) => cls._id === classId);
        return matchedClass?.name || "Unknown Class";
    };

    // Handlers
    const handleSearch = (e) => {
        setSearch(e.target.value);
        setPage(1); // Reset to the first page when searching
    };

    const handleNextPage = () => setPage((prev) => prev + 1);
    const handlePrevPage = () => setPage((prev) => Math.max(prev - 1, 1));

    const handleDeleteResult = async (studentId) => {
        try {
            await deleteResult(studentId).unwrap();
            toast.success('Result deleted successfully');
        } catch (error) {
            toast.error('Failed to delete result');
        }
    };


    return (
        <div className="container mx-auto px-1 md:px-8 py-8">
            <div className="text-center text-2xl font-semibold mb-8">
                All Results ({total})
            </div>

            {/* Search Input */}
            <div className="mb-4 text-center">
                <input
                    type="text"
                    placeholder="Search results..."
                    value={search}
                    onChange={handleSearch}
                    className="border rounded-md p-2 w-full md:w-1/2 focus:outline-none"
                />
                {!isLoading && debouncedSearch && !results.length && (
                    <div className="text-red-500 mt-2">No Results Found.</div>
                )}
            </div>

            {isLoading ? (
                <div className="text-center py-8"><Loader /></div>
            ) : (
                <>
                    {/* Results Table */}
                    {results.length > 0 && (
                        <div>
                            <table className="w-full border-collapse">
                                <thead>
                                    <tr>
                                        <th className="border border-gray-600 md:p-2 text-center text-xs md:text-sm">Full Name</th>
                                        <th className="hidden md:block border border-gray-600 md:p-2 text-center text-xs md:text-sm">Admission Number</th>
                                        <th className="border border-gray-600 md:p-2 text-center text-xs md:text-sm">Class & Section</th>
                                        <th className="border border-gray-600 md:p-2 text-center text-xs md:text-sm">Roll Number</th>
                                        <th className="border border-gray-600 md:p-2 text-center text-xs md:text-sm">Obtained/Total Marks</th>
                                        <th className="hidden md:block border border-gray-600 md:p-2 text-center text-xs md:text-sm">Performance</th>
                                        <th className="border border-gray-600 md:p-2 text-center text-xs md:text-sm">Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {results.map((result) => {
                                        const student = result.student || {};
                                        const className = getClassName(student.schoolClass); // Pass the correct class ID
                                        const section = student.section || "Unknown Section";

                                        return (
                                            <tr key={result._id} className="text-center">
                                                <td className="p-2 text-xs md:text-sm">{student.fullName || "N/A"}</td>
                                                <td className="hidden md:block p-2 text-xs md:text-sm">{student.admissionNumber || "N/A"}</td>
                                                <td className="p-2 text-xs md:text-sm">{className} - {section}</td>
                                                <td className="p-2 text-xs md:text-sm">{student.rollNumber || "N/A"}</td>
                                                <td className="p-2 text-xs md:text-sm">
                                                    {`${result.subjects?.reduce((sum, subj) => sum + subj.marks, 0) || 0}`} / {result.totalMarks || 0}
                                                </td>
                                                <td className="hidden md:block p-2 text-xs md:text-sm">{result.performanceCategory || "N/A"}</td>
                                                <td className="p-2 ">
                                                    {userInfo.isAdmin && (
                                                        <button
                                                            className="text-red-90 text-2xl mx-2"
                                                            onClick={() => handleDeleteResult(result.studentId)}
                                                            disabled={isDeletingResult}
                                                        >
                                                            <MdOutlineDelete />
                                                        </button>
                                                    )}
                                                    <button onClick={() => setSelectedResult(result)}>
                                                        <FcViewDetails size={20} />
                                                    </button>
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

            {selectedResult && (
                <StudentResultDetailsModal
                    result={selectedResult}
                    onClose={() => setSelectedResult(null)}
                />
            )}
        </div>
    );
};

export default StudentResult;
