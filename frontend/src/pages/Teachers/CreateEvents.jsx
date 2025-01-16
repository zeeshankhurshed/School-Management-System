import { useState } from "react";
import { useCreateAcademicsMutation } from "../../redux/api/academics"; // Assuming you have this mutation set up
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

const CreateAcademics = () => {
  const [createAcademics] = useCreateAcademicsMutation();
  const navigate = useNavigate();

  // Initialize React Hook Form
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
  } = useForm();

  // Dynamic fields for Tips and Resources
  const [tips, setTips] = useState([""]);
  const [resources, setResources] = useState([{ name: "", link: "" }]);

  // Handle adding a new tip
  const handleAddTip = () => {
    setTips([...tips, ""]);
  };

  // Handle adding a new resource
  const handleAddResource = () => {
    setResources([...resources, { name: "", link: "" }]);
  };

  // Handle input change for tips
  const handleTipChange = (index, value) => {
    const updatedTips = [...tips];
    updatedTips[index] = value;
    setTips(updatedTips);
  };

  // Handle input change for resources
  const handleResourceChange = (index, field, value) => {
    const updatedResources = [...resources];
    updatedResources[index][field] = value;
    setResources(updatedResources);
  };

  // Handle form submission
  const onSubmit = async (data) => {
    try {
      if (!data.title) {
        toast.error("Title is required");
        return;
      }

      const academicData = {
        title: data.title,
        tips,
        resources,
      };

      await createAcademics(academicData);
      toast.success("Academic content created successfully");
      navigate("/teachersDashboard/academicsList", { replace: true });
    } catch (error) {
      toast.error("Failed to create academic content");
    }
  };

  return (
    <section className="max-w-lg mx-auto p-6 bg-gray-400 shadow-lg rounded-lg my-8">
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
        Create Academic Content
      </h2>
      <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
        {/* Title Field */}
        <input
          type="text"
          placeholder="Title"
          className="p-3 border border-gray-300 rounded-md w-full focus:ring-2 focus:ring-blue-500 focus:outline-none"
          {...register("title", { required: "Title is required" })}
        />
        {errors.title && (
          <p className="text-red-500 text-sm">{errors.title.message}</p>
        )}

        {/* Tips Section */}
        <div className="mb-6">
          <h3 className="text-xl font-semibold mb-2">Study Tips</h3>
          {tips.map((tip, index) => (
            <div key={index} className="mb-2">
              <input
                type="text"
                placeholder={`Tip ${index + 1}`}
                value={tip}
                onChange={(e) => handleTipChange(index, e.target.value)}
                className="p-3 border border-gray-300 rounded-md w-full focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>
          ))}
          <button
            type="button"
            onClick={handleAddTip}
            className="text-blue-500 underline"
          >
            Add Another Tip
          </button>
        </div>

        {/* Resources Section */}
        <div className="mb-6">
          <h3 className="text-xl font-semibold mb-2">Helpful Resources</h3>
          {resources.map((resource, index) => (
            <div key={index} className="mb-4">
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Resource Name"
                  value={resource.name}
                  onChange={(e) =>
                    handleResourceChange(index, "name", e.target.value)
                  }
                  className="p-3 border border-gray-300 rounded-md w-full focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>
              <div className="flex gap-2 mt-2">
                <input
                  type="url"
                  placeholder="Resource Link"
                  value={resource.link}
                  onChange={(e) =>
                    handleResourceChange(index, "link", e.target.value)
                  }
                  className="p-3 border border-gray-300 rounded-md w-full focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>
            </div>
          ))}
          <button
            type="button"
            onClick={handleAddResource}
            className="text-blue-500 underline"
          >
            Add Another Resource
          </button>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className={`w-full bg-blue-500 text-white p-3 rounded-md transition duration-300 ${
            isSubmitting ? "opacity-50 cursor-not-allowed" : "hover:bg-blue-600"
          }`}
          disabled={isSubmitting}
        >
          {isSubmitting ? "Submitting..." : "Create Content"}
        </button>
      </form>
    </section>
  );
};

export default CreateAcademics;
