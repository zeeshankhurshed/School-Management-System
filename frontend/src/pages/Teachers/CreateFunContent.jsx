import React from 'react';
import { useForm } from 'react-hook-form';

import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { useCreateFunContentMutation } from '../../redux/api/blog';

const CreateFunContent = () => {
  const [createFunContent] = useCreateFunContentMutation();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const response = await createFunContent(data).unwrap();
      toast.success('Content created successfully!');
      reset(); // Reset the form fields
      navigate('/teachersDashboard/funContentList'); // Navigate to a listing page (replace with the correct route)
    } catch (error) {
      toast.error('Failed to create content. Please try again.');
    }
  };

  return (
    <div className="max-w-2xl mx-auto bg-gray-100 p-6 rounded-lg shadow-md mt-8">
      <h2 className="text-2xl font-bold text-center mb-6">Create Fun Content</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Type Field */}
        <div>
          <label htmlFor="type" className="block text-sm font-medium text-gray-700">
            Type
          </label>
          <select
            id="type"
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            {...register('type', { required: 'Type is required' })}
          >
            <option value="">Select Type</option>
            <option value="Puzzle">Puzzle</option>
            <option value="Quiz">Quiz</option>
            <option value="Trivia">Trivia</option>
            <option value="Special Day">Special Day</option>
          </select>
          {errors.type && <p className="text-red-500 text-sm">{errors.type.message}</p>}
        </div>

        {/* Title Field */}
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700">
            Title
          </label>
          <input
            id="title"
            type="text"
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            placeholder="Enter title"
            {...register('title', { required: 'Title is required' })}
          />
          {errors.title && <p className="text-red-500 text-sm">{errors.title.message}</p>}
        </div>

        {/* Description Field */}
        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700">
            Description
          </label>
          <textarea
            id="description"
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            placeholder="Enter description"
            {...register('description', { required: 'Description is required' })}
          />
          {errors.description && <p className="text-red-500 text-sm">{errors.description.message}</p>}
        </div>

        {/* Link Field */}
        <div>
          <label htmlFor="link" className="block text-sm font-medium text-gray-700">
            Link (optional)
          </label>
          <input
            id="link"
            type="url"
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            placeholder="Enter link"
            {...register('link')}
          />
        </div>

        {/* Submit Button */}
        <div className="flex justify-end">
          <button
            type="submit"
            disabled={isSubmitting}
            className="px-4 py-2 bg-blue-600 text-white font-bold rounded hover:bg-blue-700"
          >
            {isSubmitting ? 'Submitting...' : 'Create Content'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateFunContent;

