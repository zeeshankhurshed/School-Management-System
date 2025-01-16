import React, { useEffect, useState } from 'react';
import { useFetchSubjectsQuery } from '../redux/api/subject';
import { useUpdateResultMutation } from '../redux/api/result';
import { CiEdit } from 'react-icons/ci';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';

const StudentResultDetailsModal = ({ result, onClose }) => {
  if (!result) return null; // Don't render if no result data is passed

  const { subjects: resultSubjects, totalMarks, performanceCategory } = result;
  const { data: allSubjects, refetch, isLoading, isError } = useFetchSubjectsQuery();
  const { userInfo } = useSelector((state) => state.auth);
  const [updateResult] = useUpdateResultMutation();

  const [isEditing, setIsEditing] = useState(false);
  const [editedSubjects, setEditedSubjects] = useState(resultSubjects || []);

  useEffect(() => {
    if (resultSubjects && resultSubjects.length > 0) {
      refetch(); // Fetch subjects if they're not available yet
    }
  }, [resultSubjects, refetch]);

  if (isLoading) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h2>Loading Subjects...</h2>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h2>Error loading subjects</h2>
        </div>
      </div>
    );
  }

  const totalObtainedMarks = editedSubjects.reduce((acc, subject) => acc + (subject.marks || 0), 0);
  const totalPossibleMarks = allSubjects.reduce((acc, subject) => acc + (subject.totalMarks || 0), 0);
  const percentage = (totalObtainedMarks / totalPossibleMarks) * 100;
  let overallGrade;

  if (percentage > 90) overallGrade = 'A+';
  else if (percentage > 80) overallGrade = 'B+';
  else if (percentage > 70) overallGrade = 'B';
  else if (percentage > 60) overallGrade = 'C+';
  else if (percentage > 50) overallGrade = 'C';
  else overallGrade = 'F';

  const handleSubjectChange = (index, field, value) => {
    const updatedSubjects = [...editedSubjects];
    const subject = updatedSubjects[index] || {};

    if (field === 'marks' && (isNaN(value) || value < 0)) {
      toast.error('Marks must be a valid number and non-negative');
      return;
    }

    updatedSubjects[index] = {
      ...subject,
      [field]: field === 'marks' ? Number(value) : value,
      subjectId: subject.subjectId || subject._id,
    };

    setEditedSubjects(updatedSubjects);
  };

  const isValidObjectId = (id) => /^[0-9a-fA-F]{24}$/.test(id);

  const handleUpdateResult = async () => {
    const studentId = result.studentId?._id || result.studentId;

    if (!studentId) {
      toast.error('Invalid student ID');
      return;
    }

    const isSubjectsValid = editedSubjects.every(
      (subject) =>
        isValidObjectId(subject.subjectId) &&
        typeof subject.marks === 'number' &&
        subject.marks >= 0
    );

    if (!isSubjectsValid) {
      toast.error('Each subject must contain a valid ObjectId and marks');
      return;
    }

    const updatedResult = {
      subjects: editedSubjects.map((sub) => ({
        subjectId: sub.subjectId,
        marks: sub.marks,
        grade: sub.grade,
      })),
      totalMarks: totalObtainedMarks,
      performanceCategory,
    };

    try {
      await updateResult({ id: String(studentId), updatedResult }).unwrap();
      toast.success('Result updated successfully');
      onClose();
    } catch (error) {
      toast.error(error?.data?.message || 'Failed to update result');
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white w-full max-w-2xl rounded-lg shadow-lg p-6">
        <div className="flex justify-between items-center border-b pb-3 mb-4">
          <h2 className="text-lg font-semibold">Result Details</h2>
          <button
            onClick={onClose}
            className="text-gray-600 hover:text-gray-900 font-bold text-lg"
          >
            &times;
          </button>
        </div>
        <div className="space-y-4">
          <div>
            <h3 className="font-semibold mb-2">Subjects and Marks:</h3>
            <ul className="list-disc pl-5 space-y-2">
              {isEditing
                ? editedSubjects.map((subject, index) => {
                    const { subjectId, marks, grade } = subject;
                    const subjectDetails = allSubjects.find((sub) => sub._id === subjectId);
                    const subjectName = subjectDetails?.name || `Subject ${index + 1}`;

                    return (
                      <li key={subjectId} className="flex items-center space-x-4">
                        <span>{subjectName}</span>
                        <input
                          type="number"
                          value={marks || ''}
                          onChange={(e) => handleSubjectChange(index, 'marks', e.target.value)}
                          className="border border-gray-300 rounded px-2 py-1"
                        />
                        <input
                          type="text"
                          value={grade || ''}
                          onChange={(e) => handleSubjectChange(index, 'grade', e.target.value)}
                          className="border border-gray-300 rounded px-2 py-1"
                        />
                      </li>
                    );
                  })
                : resultSubjects.map((subject, index) => {
                    const { subjectId, marks, grade } = subject;
                    const subjectDetails = allSubjects.find((sub) => sub._id === subjectId);
                    const subjectName = subjectDetails?.name || `Subject ${index + 1}`;

                    return (
                      <li key={subjectId}>
                        {subjectName} - <strong>{marks || 'N/A'}</strong>{' '}
                        <span className="italic text-sm">Grade: {grade || 'No grade'}</span>
                      </li>
                    );
                  })}
            </ul>
          </div>
          <div className="mt-4">
            <p>
              <strong>Total Obtained Marks:</strong> {totalObtainedMarks || 'N/A'}
            </p>
            <p>
              <strong>Total Marks:</strong> {totalMarks || 'N/A'}
            </p>
            <p>
              <strong>Performance:</strong> {performanceCategory || 'N/A'}
            </p>
            <p>
              <strong>Overall Grade:</strong> {overallGrade || 'N/A'}
            </p>
          </div>
        </div>
        <div className="flex justify-end items-center mt-6">
          <button
            onClick={handlePrint}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded mr-4"
          >
            Print
          </button>
          {userInfo.isAdmin && (
            <button
              className="text-blue-600 flex items-center space-x-1"
              onClick={() => setIsEditing(!isEditing)}
            >
              <CiEdit size={24} />
              <span>{isEditing ? 'Cancel Edit' : 'Edit'}</span>
            </button>
          )}
          {isEditing && (
            <button
              onClick={handleUpdateResult}
              className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded ml-4"
            >
              Update Result
            </button>
          )}
          <button
            onClick={onClose}
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded ml-4"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default StudentResultDetailsModal;
