import React from "react";

const SubjectList = ({ subjects, handleEdit, handleDelete }) => {
  return (
    <div className="w-[80%] p-6 shadow-md rounded-lg ">
      <h2 className="font-bold text-center text-2xl mb-6 text-gray-700">Subjects List</h2>
      {subjects?.length > 0 ? (
        <ul className=" flex justify-between items-center flex-wrap  gap-2 space-y-4">
          {subjects.map((subject) => (
            <li
              key={subject._id}
              className="flex flex-col text-center gap-2 bg-gray-50 p-4 rounded-lg shadow hover:shadow-md transition-shadow"
            >
              <div>
                <p className="text-sm font-bold text-gray-800">{subject.name}</p>
                <p className="text-sm text-gray-500 mt-1">{subject.category}</p>
                <p className="text-sm text-gray-500 mt-1">{subject.description}</p>
              </div>
              <div className="flex justify-center space-x-3">
                <button
                  onClick={() => handleEdit(subject)}
                  className="bg-yellow-500 text-white p-2 text-sm rounded-lg hover:bg-yellow-600 transition-colors"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(subject._id)}
                  className="bg-red-500 text-white p-2 text-sm rounded-lg hover:bg-red-600 transition-colors"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-500 text-center">No subjects available. Please add a new subject.</p>
      )}
    </div>
  );
};

export default SubjectList;