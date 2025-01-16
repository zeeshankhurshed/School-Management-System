import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useFetchSubjectsQuery } from "../../redux/api/subject";
import { useCreateResultMutation } from "../../redux/api/result";
import { toast } from "react-toastify";

const CreateResult = ({ onSuccess }) => {
  const location = useLocation();
  const navigate=useNavigate();
  const { studentId } = location.state || {}; // Extract studentId from Link state

  const { data: subjects, isLoading } = useFetchSubjectsQuery();
  const [createResult] = useCreateResultMutation();

  const [results, setResults] = useState([]);
  const [newResult, setNewResult] = useState({
    subjectId: "",
    totalMarks: 0,
    marks: 0,
    grade: "",
  });

  useEffect(() => {
    if (!studentId) {
      console.error("Missing studentId! Ensure it is passed correctly via Link state.");
      toast.error("Student ID is missing. Please try again.");
    }
  }, [studentId]);

  const handleAddResult = () => {
    if (newResult.subjectId && newResult.totalMarks && newResult.marks && newResult.grade) {
      setResults([...results, newResult]);
      setNewResult({ subjectId: "", totalMarks: 0, marks: 0, grade: "" });
    } else {
      toast.error("Please fill all fields before adding the result.");
    }
  };

  const handleEditResult = (index, field, value) => {
    const updatedResults = results.map((result, idx) =>
      idx === index ? { ...result, [field]: value } : result
    );
    setResults(updatedResults);
  };

  const handleDeleteResult = (index) => {
    const updatedResults = results.filter((_, idx) => idx !== index);
    setResults(updatedResults);
  };

  const calculateOverallGrade = () => {
    if (results.length === 0) return "-";
    const grades = results.map((r) => r.grade);
    return grades.includes("F") ? "Fail" : "Pass";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!studentId) {
      toast.error("Student ID is required!");
      return;
    }

    const totalMarks = results.reduce((sum, r) => sum + r.totalMarks, 0);
    const obtainedMarks = results.reduce((sum, r) => sum + r.marks, 0);
    const averageMarks = results.length ? Number((obtainedMarks / results.length).toFixed(2)) : 0;

    const payload = {
      studentId,
      subjects: results,
      totalMarks,
      obtainedMarks,
      averageMarks,
      performanceCategory: results.some((r) => r.grade === "A+") ? "Brilliant" : "Average",
    };

    try {
      await createResult(payload).unwrap();
      toast.success("Result created successfully");
      setResults([]); // Clear results on success
      navigate('/studentsDashboard/studentsList');
      // if (onSuccess) onSuccess(); // Call onSuccess callback if provided
    } catch (error) {
      console.error(error);
      toast.error("Failed to create result. Please try again.");
    }
  };

  if (isLoading) return <p className="text-center text-lg">Loading...</p>;

  return (
    <div className="max-w-4xl ml-24 shadow-md rounded-lg p-6 space-y-6">
      <h2 className="text-2xl font-bold text-center text-gray-800">Create Result Form</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
          <div>
            <label className="block text-sm font-medium text-gray-700">Subject</label>
            <select
              className="w-full mt-1 p-2 border rounded-lg"
              value={newResult.subjectId}
              onChange={(e) => setNewResult({ ...newResult, subjectId: e.target.value })}
            >
              <option value="">Select Subject</option>
              {subjects?.map((subject) => (
                <option key={subject._id} value={subject._id}>
                  {subject.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Total Marks</label>
            <input
              type="number"
              placeholder="Total Marks"
              className="w-full mt-1 p-2 border rounded-lg"
              value={newResult.totalMarks}
              onChange={(e) => setNewResult({ ...newResult, totalMarks: Number(e.target.value) })}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Marks</label>
            <input
              type="number"
              placeholder="Obtained Marks"
              className="w-full mt-1 p-2 border rounded-lg"
              value={newResult.marks}
              onChange={(e) => setNewResult({ ...newResult, marks: Number(e.target.value) })}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Grade</label>
            <input
              type="text"
              placeholder="Enter Grade"
              className="w-full mt-1 p-2 border rounded-lg"
              value={newResult.grade}
              onChange={(e) => setNewResult({ ...newResult, grade: e.target.value })}
            />
          </div>
        </div>
        <div className="flex justify-end space-x-4">
          <button
            type="button"
            onClick={handleAddResult}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
          >
            Add Result
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
          >
            Submit Results
          </button>
        </div>
      </form>
      <div>
        <h3 className="text-lg font-bold text-gray-700">Added Results</h3>
        <table className="w-full border mt-4">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-2 border text-left">Subject</th>
              <th className="p-2 border text-left">Total Marks</th>
              <th className="p-2 border text-left">Obtained Marks</th>
              <th className="p-2 border text-left">Grade</th>
              <th className="p-2 border text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {results.map((result, index) => (
              <tr key={index} className="border-t">
                <td className="p-2">
                  {subjects.find((s) => s._id === result.subjectId)?.name}
                </td>
                <td className="p-2">
                  <input
                    type="number"
                    value={result.totalMarks}
                    className="w-full p-1 border rounded"
                    onChange={(e) =>
                      handleEditResult(index, "totalMarks", Number(e.target.value))
                    }
                  />
                </td>
                <td className="p-2">
                  <input
                    type="number"
                    value={result.marks}
                    className="w-full p-1 border rounded"
                    onChange={(e) => handleEditResult(index, "marks", Number(e.target.value))}
                  />
                </td>
                <td className="p-2">
                  <input
                    type="text"
                    value={result.grade}
                    className="w-full p-1 border rounded"
                    onChange={(e) => handleEditResult(index, "grade", e.target.value)}
                  />
                </td>
                <td className="p-2">
                  <button
                    className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                    onClick={() => handleDeleteResult(index)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="text-right font-bold text-lg space-y-2 mt-4">
        <p>
          Total Marks (Out of):{" "}
          <span className="text-blue-600">
            {results.reduce((sum, r) => sum + r.totalMarks, 0)}
          </span>
        </p>
        <p>
          Obtained Marks:{" "}
          <span className="text-green-600">
            {results.reduce((sum, r) => sum + r.marks, 0)}
          </span>
        </p>
        <p>Overall Grade: <span className="text-green-600">{calculateOverallGrade()}</span></p>
      </div>
    </div>
  );
};

export default CreateResult;
