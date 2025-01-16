import { useState } from "react";
import { useForm } from "react-hook-form";
import { useCreateSchoolNewsMutation, useUploadImageMutation } from "../../redux/api/blog";
import { toast } from "react-toastify";
import {useNavigate} from 'react-router-dom';

const CreateSchoolNews = () => {
  const [image, setImage] = useState(null);
  const [createSchoolNews, { isLoading: isCreatingNews }] = useCreateSchoolNewsMutation();
  const [uploadImage, { isLoading: isUploadingImage }] = useUploadImageMutation();
  
  const navigate=useNavigate();

  const { register, handleSubmit, watch, formState: { errors, isSubmitting } } = useForm();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
  };

  const handleDivClick = () => {
    document.getElementById("imageInput").click();
  };

  const onSubmit = async (data) => {
    try {
      if (!data.title || !data.date || !data.category || !data.description) {
        toast.error("Please fill all required fields");
        return;
      }
  
      let uploadedImageUrl = null;
      if (image) {
        const formData = new FormData();
        formData.append("image", image); // Ensure this matches the server's expected field name
  
        const uploadResponse = await uploadImage(formData);
        if (uploadResponse.error) {
          console.error(uploadResponse.error); // Log the error for debugging
          toast.error("Failed to upload image");
          return;
        }
        uploadedImageUrl = uploadResponse.data.image; // Adjust based on your server response
      }
  
      await createSchoolNews({
        ...data,
        image: uploadedImageUrl
      });
  
      toast.success("School news created successfully!");
      navigate('/teachersDashboard/schoolNewsList')
    } catch (error) {
      toast.error("Failed to create school news");
    }
  };

  return (
    <section className="max-w-lg mx-auto p-6 bg-gray-400 shadow-md rounded-md my-8">
      <h2 className="text-2xl font-bold text-center mb-6">Create School News</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="flex flex-col items-center mb-4">
          <div
            className="w-40 h-40 border border-gray-300 flex justify-center items-center text-gray-500 cursor-pointer"
            onClick={handleDivClick}
          >
            {image ? (
              <img
                src={URL.createObjectURL(image)}
                alt="Uploaded Preview"
                className="w-full h-full object-cover rounded-md"
              />
            ) : (
              <span className="text-black">Upload Image</span>
            )}
          </div>
          <input
            id="imageInput"
            type="file"
            accept="image/*"
            style={{ display: "none" }}
            onChange={handleImageChange}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            placeholder="Title..."
            className="p-3 border border-gray-300 rounded-md"
            {...register("title", { required: "Title is required" })}
          />
          {errors.title && <p className="text-red-500 text-sm">{errors.title.message}</p>}

          <input
            type="text"
            placeholder="Subtitle..."
            className="p-3 border border-gray-300 rounded-md"
            {...register("subtitle")}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="date"
            className="p-3 border border-gray-300 rounded-md"
            {...register("date", { required: "Date is required" })}
          />
          {errors.date && <p className="text-red-500 text-sm">{errors.date.message}</p>}

          <input
            type="text"
            placeholder="Category..."
            className="p-3 border border-gray-300 rounded-md"
            {...register("category", { required: "Category is required" })}
          />
          {errors.category && <p className="text-red-500 text-sm">{errors.category.message}</p>}
        </div>

        <textarea
          placeholder="Description..."
          className="p-3 border border-gray-300 rounded-md w-full"
          {...register("description", { required: "Description is required" })}
        ></textarea>
        {errors.description && <p className="text-red-500 text-sm">{errors.description.message}</p>}

        <input
          type="text"
          placeholder="Location..."
          className="p-3 border border-gray-300 rounded-md w-full"
          {...register("location")}
        />

        {/* <input
          type="text"
          placeholder="Read More Link..."
          className="p-3 border border-gray-300 rounded-md w-full"
          {...register("readMoreLink")}
        /> */}

        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-3 rounded-md hover:bg-blue-600"
        >
          {isSubmitting ? "Submitting..." : "Create News"}
        </button>
      </form>
    </section>
  );
};

export default CreateSchoolNews;
