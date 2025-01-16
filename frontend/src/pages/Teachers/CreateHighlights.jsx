import { useForm } from 'react-hook-form';
import { useCreateHighlightMutation } from '../../redux/api/blog';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const CreateHighlights = () => {
  const [createHighlights] = useCreateHighlightMutation();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      if (!data.name) {
        toast.error("Name is required");
        return;
      }
      if (!data.achievement) {
        toast.error("Achievement is required");
        return;
      }
      if (!data.type || data.type === "select") {
        toast.error("Please select a valid category");
        return;
      }
      if (!data.description) {
        toast.error("Description is required");
        return;
      }

      await createHighlights(data).unwrap();
      toast.success("Highlights content created successfully");
      navigate("/teachersDashboard/highlightsList", { replace: true });
    } catch (error) {
      toast.error("Failed to create highlights content");
    }
  };

  return (
    <div className="max-w-lg mx-auto bg-gray-400 shadow-lg rounded-lg my-8 p-6">
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
        Activities Highlights
      </h2>
      <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
        {/* Name Field */}
        <div className="flex flex-col gap-1">
          <label htmlFor="name" className="font-medium">
            Name
          </label>
          <input
            id="name"
            type="text"
            placeholder="Name..."
            className="p-3 border border-gray-300 rounded-md"
            {...register("name", { required: "Name is required" })}
          />
          {errors.name && (
            <p className="text-red-500 text-sm">{errors.name.message}</p>
          )}
        </div>

        {/* Achievement Field */}
        <div className="flex flex-col gap-1">
          <label htmlFor="achievement" className="font-medium">
            Achievement
          </label>
          <input
            id="achievement"
            type="text"
            placeholder="Achievement..."
            className="p-3 border border-gray-300 rounded-md"
            {...register("achievement", { required: "Achievement is required" })}
          />
          {errors.achievement && (
            <p className="text-red-500 text-sm">{errors.achievement.message}</p>
          )}
        </div>

        {/* Type Dropdown */}
        <div className="flex flex-col gap-1">
          <label htmlFor="type" className="font-medium">
            Type
          </label>
          <select
            id="type"
            className="p-3 border border-gray-300 rounded-md"
            {...register("type", { required: "Type is required" })}
          >
            <option value="select">Select</option>
            <option value="Student">Student</option>
            <option value="Teacher">Teacher</option>
          </select>
          {errors.type && (
            <p className="text-red-500 text-sm">{errors.type.message}</p>
          )}
        </div>

        {/* Description Field */}
        <div className="flex flex-col gap-1">
          <label htmlFor="description" className="font-medium">
            Description
          </label>
          <textarea
            id="description"
            placeholder="Description..."
            className="p-3 border border-gray-300 rounded-md"
            rows="5"
            {...register("description", { required: "Description is required" })}
          />
          {errors.description && (
            <p className="text-red-500 text-sm">{errors.description.message}</p>
          )}
        </div>

        {/* Submit Button */}
        <div className="text-center">
          <button
            type="submit"
            disabled={isSubmitting}
            className="bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700"
          >
            {isSubmitting ? "Submitting..." : "Create Highlights"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateHighlights;
