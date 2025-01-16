import React, { useState } from 'react';

import { toast } from 'react-toastify';
import { useDeleteAcademicGuidanceMutation, useGetAllAcademicGuidanceQuery, useUpdateAcademicGuidanceMutation } from '../../redux/api/blog';

const AcademicsList = () => {
  const { data, error, isLoading } = useGetAllAcademicGuidanceQuery();
  const [deleteAcademicGuidance] = useDeleteAcademicGuidanceMutation();
  const [updateAcademicGuidance] = useUpdateAcademicGuidanceMutation();
  
  const [editingGuidance, setEditingGuidance] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    tips: [''],
    resources: [{ name: '', link: '' }]
  });

  const handleDelete = async (id) => {
    try {
      await deleteAcademicGuidance(id).unwrap();
      toast.success("Academic guidance deleted successfully");
    } catch (error) {
      toast.error("Failed to delete academic guidance");
    }
  };

  const handleEdit = (guidance) => {
    setEditingGuidance(guidance._id);
    setFormData({
      title: guidance.title,
      tips: guidance.tips || [''],
      resources: guidance.resources || [{ name: '', link: '' }],
    });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    try {
      await updateAcademicGuidance({ id: editingGuidance, updatedGuidance: formData }).unwrap();
      toast.success("Academic guidance updated successfully");
      setEditingGuidance(null); // Reset editing state
    } catch (error) {
      toast.error("Failed to update academic guidance");
    }
  };

  // Log the data to check if it's populated correctly
//   console.log("API Response Data:", data);

  const academicGuidanceList = data?.data || [];

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading data...</p>;

  return (
    <div className="max-w-7xl mx-auto p-6 bg-gray-100 shadow-lg rounded-lg my-8">
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Academic Guidance List</h2>

      <div className="space-y-6">
        {academicGuidanceList.length > 0 ? (
          academicGuidanceList.map((guidance) => (
            <div key={guidance._id} className="p-4 border-b border-gray-300 rounded-md">
              <h3 className="text-xl font-semibold text-gray-800">{guidance.title}</h3>

              {/* Render Tips */}
              <div className="mt-2">
                <h4 className="font-medium text-gray-700">Study Tips:</h4>
                <ul className="list-disc pl-6">
                  {guidance.tips?.map((tip, index) => (
                    <li key={index} className="text-gray-600">{tip}</li>
                  ))}
                </ul>
              </div>

              {/* Render Resources */}
              <div className="mt-2">
                <h4 className="font-medium text-gray-700">Resources:</h4>
                <ul className="list-disc pl-6">
                  {guidance.resources?.map((resource, index) => (
                    <li key={index} className="text-gray-600">
                      <a href={resource.link} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
                        {resource.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-4">
                <button
                  onClick={() => handleDelete(guidance._id)}
                  className="bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600"
                >
                  Delete
                </button>
                {/* <button
                  onClick={() => handleEdit(guidance)}
                  className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 ml-4"
                >
                  Edit
                </button> */}
              </div>
            </div>
          ))
        ) : (
          <p>No academic guidance available.</p>
        )}

        {/* Edit Form */}
        {editingGuidance && (
          <div className="mt-6 p-4 bg-white shadow-lg rounded-lg">
            <h3 className="text-2xl font-semibold mb-4">Edit Academic Guidance</h3>
            <form onSubmit={handleUpdate}>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="Title"
                className="p-3 border border-gray-300 rounded-md w-full mb-4"
              />

              {/* Render Tips */}
              <div>
                <h4 className="font-medium text-gray-700 mb-2">Study Tips:</h4>
                {formData.tips.map((tip, index) => (
                  <div key={index} className="flex mb-2">
                    <input
                      type="text"
                      value={tip}
                      onChange={(e) => {
                        const newTips = [...formData.tips];
                        newTips[index] = e.target.value;
                        setFormData({ ...formData, tips: newTips });
                      }}
                      className="p-3 border border-gray-300 rounded-md w-full"
                      placeholder="Tip"
                    />
                  </div>
                ))}
              </div>

              {/* Render Resources */}
              <div>
                <h4 className="font-medium text-gray-700 mb-2">Resources:</h4>
                {formData.resources.map((resource, index) => (
                  <div key={index} className="flex mb-2">
                    <input
                      type="text"
                      value={resource.name}
                      onChange={(e) => {
                        const newResources = [...formData.resources];
                        newResources[index].name = e.target.value;
                        setFormData({ ...formData, resources: newResources });
                      }}
                      className="p-3 border border-gray-300 rounded-md w-full mb-2"
                      placeholder="Resource Name"
                    />
                    <input
                      type="text"
                      value={resource.link}
                      onChange={(e) => {
                        const newResources = [...formData.resources];
                        newResources[index].link = e.target.value;
                        setFormData({ ...formData, resources: newResources });
                      }}
                      className="p-3 border border-gray-300 rounded-md w-full"
                      placeholder="Resource Link"
                    />
                  </div>
                ))}
              </div>

              <button
                type="submit"
                className="bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600"
              >
                Update Guidance
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default AcademicsList;
