import React, { useState, useEffect } from 'react';
import { useDeleteTeacherMutation, useGetAllTeachersQuery } from '../../redux/api/teacher';
import Loader from '../../components/Loader';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { CiEdit } from "react-icons/ci";
import { MdOutlineDelete } from "react-icons/md";
import { FcViewDetails } from "react-icons/fc";

const TeacherList = () => {
    const [search, setSearch] = useState('');
    const [debouncedSearch, setDebouncedSearch] = useState('');
    const [page, setPage] = useState(1);
    const limit = 10;

    // Debounce effect
    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedSearch(search);
        }, 500); // 500ms delay

        return () => clearTimeout(handler); // Cleanup the timeout on unmount or when `search` changes
    }, [search]);

    const { data, isLoading, isError } = useGetAllTeachersQuery({ search: debouncedSearch, page, limit });
    const { teachers, total } = data || {};
    const { userInfo } = useSelector((state) => state.auth);
    const [deleteTeacher, { isLoading: isDeletingTeacher }] = useDeleteTeacherMutation();

    const totalPages = Math.ceil((total || 0) / limit);

    const handleDeleteTeacher = async (teacherId) => {
        const confirmed = window.confirm("Are you sure you want to delete this teacher?");
        if (confirmed) {
            try {
                await deleteTeacher(teacherId).unwrap();
                toast.success("Teacher deleted successfully");
            } catch (error) {
                console.error("Failed to delete teacher:", error);
                toast.error("Failed to delete teacher");
            }
        } else {
            toast.info('Delete Action was canceled');
        }
    };

    const handleSearch = (e) => {
        setSearch(e.target.value);
        setPage(1); // Reset to the first page on search
    };

    const goToPage = (newPage) => {
        if (newPage > 0 && newPage <= totalPages) {
            setPage(newPage);
        }
    };

    return (
        <div className='container mx-auto px-4 md:px-8 py-8'>
            <div className="text-center text-2xl font-semibold mb-8">
                All Teachers ({total || 0})
            </div>

            <div className="mb-4 text-center">
                <input
                    type="text"
                    value={search}
                    onChange={handleSearch}
                    placeholder="Search teachers by name, email, or employee ID"
                    className="w-[50%] px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
                />
                {!isLoading && debouncedSearch && !teachers.length && (
                    <div className="text-red-500 mt-2">No Teachers found...</div>
                )}
            </div>

            {isLoading ? (
                <div className='text-center py-8'><Loader /></div>
            ) : (
                <>
                    {teachers.length > 0 && (
                        <div>
                            <table className="w-full border-collapse">
                                <thead>
                                    <tr>
                                        <th className="border border-gray-600 p-2 text-center text-sm">Photo</th>
                                        <th className="border border-gray-600 p-2 text-center text-sm">Full Name</th>
                                        <th className="border border-gray-600 p-2 text-center text-sm">Employee ID</th>
                                        <th className="border border-gray-600 p-2 text-center text-sm">Role</th>
                                        <th className="border border-gray-600 p-2 text-center text-sm">Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {teachers.map((teacher) => (
                                        <tr key={teacher._id} className="hover:bg-gray-100">
                                            <td className="text-center p-2">
                                                {teacher.profilePicture ? (
                                                    <img
                                                        src={`${teacher.profilePicture.replace(/\\/g, '/')}`}
                                                        alt={`${teacher.name}'s Photo`}
                                                        width={60}
                                                        className="object-cover mx-auto rounded-full"
                                                    />
                                                ) : (
                                                    <div className="w-16 h-16 mx-auto bg-gray-200 rounded-full flex items-center justify-center">
                                                        <span className="text-sm text-gray-500">No Photo</span>
                                                    </div>
                                                )}
                                            </td>
                                            <td className="text-center p-2">{teacher.name}</td>
                                            <td className="text-center p-2">{teacher.employeeId}</td>
                                            <td className="text-center p-2">{teacher.roles?.join(', ')}</td>
                                            <td className="text-center p-2">
                                                {userInfo.isAdmin && (
                                                    <>
                                                        <Link to={`/teachersDashboard/teachers/${teacher._id}/edit`}>
                                                            <button className="text-blue-950 text-2xl">
                                                                <CiEdit />
                                                            </button>
                                                        </Link>
                                                        <button
                                                            onClick={() => handleDeleteTeacher(teacher._id)}
                                                            disabled={isDeletingTeacher}
                                                            className="text-red-950 text-2xl mx-4"
                                                        >
                                                            <MdOutlineDelete />
                                                        </button>
                                                    </>
                                                )}
                                                <Link
                                                    to={`/teachersDashboard/teachers/${teacher._id}`}
                                                    className="inline-block mx-1 text-blue-500 hover:text-blue-700"
                                                    title="View Details"
                                                    state={{ teacher }}
                                                >
                                                    <FcViewDetails size={20} />
                                                </Link>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}

                    {/* Pagination */}
                    <div className="text-center my-8">
                        <button
                            onClick={() => goToPage(page - 1)}
                            disabled={page <= 1}
                            className="bg-gray-300 text-gray-700 py-2 px-4 rounded mr-4 disabled:opacity-50"
                        >
                            Previous
                        </button>
                        <span className="font-medium">
                            Page {page} of {totalPages}
                        </span>
                        <button
                            onClick={() => goToPage(page + 1)}
                            disabled={page >= totalPages}
                            className="bg-blue-600 text-white py-2 px-4 rounded ml-4 disabled:opacity-50"
                        >
                            Next
                        </button>
                    </div>
                </>
            )}
        </div>
    );
};

export default TeacherList;
