import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useFetchClassesQuery } from "../../redux/api/classes";
import { toast } from 'react-toastify';
import { useCreateStudentsMutation, useUploadImageMutation } from "../../redux/api/student";
import { useNavigate } from 'react-router-dom';

const CreateStudent = () => {
  const navigate = useNavigate();
  const [image, setImage] = useState(null);
  const [createStudent, { isLoading: isCreatingStudent, error: createStudentErrorDetails }] = useCreateStudentsMutation();
  const [uploadImage, { isLoading: isUploadingImage, error: uploadImageErrorDetails }] = useUploadImageMutation();
  const { data: schoolClasses, isLoading: isLoadingSchoolClasses } = useFetchClassesQuery();

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
      if (!data.emergencyName || !data.emergencyPhone || !data.emergencyRelation) {
        toast.error("Please fill all emergency contact fields");
        return;
      }

      let uploadImagePath = null;
      if (image) {
        const formData = new FormData();
        formData.append("image", image);

        const uploadImageResponse = await uploadImage(formData);
        if (uploadImageResponse.data) {
          uploadImagePath = uploadImageResponse.data.image;
        } else {
          toast.error("Failed to upload image");
          return;
        }
      }

      await createStudent({
        fullName: data.fullName,
        guardianName: data.guardianName,
        admissionNumber: data.admissionNumber,
        schoolClass: data.schoolClass,
        contactNumber: data.contactNumber,
        academicYear: data.academicYear,
        photo: uploadImagePath,
        ...data
      });

      toast.success("Student added to database");
      navigate("/studentsDashboard/studentsList");
    } catch (error) {
      toast.error(`Failed to create student: ${createStudentErrorDetails?.message}`);
    }
  };

  return (
    <section className="max-w-4xl flex flex-col justify-center p-6 ml-24">
      <div className="shadow-md rounded-lg p-8">
        <h2 className="uppercase font-bold text-2xl text-teal-900 mb-6 text-center">
          Register Student
        </h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col gap-4 mb-6">
            <div
              className="border border-gray-100 w-44 h-44 flex justify-center items-center text-gray-500 relative cursor-pointer mx-auto"
              onClick={handleDivClick}
            >
              {image ? (
                <img
                  src={URL.createObjectURL(image)}
                  alt="Student"
                  className="w-full h-full object-cover rounded-md"
                />
              ) : (
                <span className="-rotate-45 backdrop-blur-lg">Student Photo</span>
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

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <input
              type="text"
              placeholder="Student Name..."
              className="p-3 border border-gray-300 rounded-md"
              {...register("fullName", { required: "Name is required" })}
            />
            {errors.fullName && <p className="text-red-500 text-sm">{errors.fullName.message}</p>}
            
            <input
              type="text"
              placeholder="Guardian's Name..."
              className="p-3 border border-gray-300 rounded-md"
              {...register("guardianName", { required: "Guardian's name is required" })}
            />
            {errors.guardianName && <p className="text-red-500 text-sm">{errors.guardianName.message}</p>}

            <input
              type="text"
              placeholder="Admission Number..."
              className="p-3 border border-gray-300 rounded-md"
              {...register("admissionNumber", { required: "Admission number is required" })}
            />
            {errors.admissionNumber && <p className="text-red-500 text-sm">{errors.admissionNumber.message}</p>}

            <select
              className="p-3 border border-gray-300 rounded-md"
              {...register("schoolClass", { required: "Class is required" })}
              defaultValue={schoolClasses?.all[0]?._id || ""}
            >
              <option value="">Select Class</option>
              {isLoadingSchoolClasses ? (
                <option>Loading classes...</option>
              ) : (
                schoolClasses?.all.map((schoolClass) => (
                  <option key={schoolClass._id} value={schoolClass._id}>
                    {schoolClass.name}
                  </option>
                ))
              )}
            </select>
            {errors.schoolClass && <p className="text-red-500 text-sm">{errors.schoolClass.message}</p>}

            <input
              type="text"
              placeholder="Section..."
              className="p-3 border border-gray-300 rounded-md"
              {...register("section", { required: "Section is required" })}
            />
            {errors.section && <p className="text-red-500 text-sm">{errors.section.message}</p>}

            <input
              type="text"
              placeholder="Roll Number..."
              className="p-3 border border-gray-300 rounded-md"
              {...register("rollNumber", { required: "Roll number is required" })}
            />
            {errors.rollNumber && <p className="text-red-500 text-sm">{errors.rollNumber.message}</p>}

            <input
              type="text"
              placeholder="Contact Number..."
              className="p-3 border border-gray-300 rounded-md"
              {...register("contactNumber", { required: "Contact number is required" })}
            />
            {errors.contactNumber && <p className="text-red-500 text-sm">{errors.contactNumber.message}</p>}

            <input
              type="text"
              placeholder="Academic Year..."
              className="p-3 border border-gray-300 rounded-md"
              {...register("academicYear", { required: "Academic year is required" })}
            />
            {errors.academicYear && <p className="text-red-500 text-sm">{errors.academicYear.message}</p>}

            <div className="w-full flex items-center gap-3 md:col-span-2">
              <div className="w-1/2 flex flex-col gap-2">
                <label>Date of Birth</label>
                <input
                  type="date"
                  className="p-3 border border-gray-300 rounded-md"
                  {...register("dateOfBirth", { required: "Date of birth is required" })}
                />
                {errors.dateOfBirth && <p className="text-red-500 text-sm">{errors.dateOfBirth.message}</p>}
             
                <input
              type="email"
              placeholder="Email..."
              className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-900 w-full"
              {...register("email", { required: "Email is required", })}
            />
            {errors.email && (<p className="text-red-500 text-sm">{errors.email.message}</p>)}

              <div className="w-1/2 flex flex-col gap-2">
                <label htmlFor="">Gender</label>
                <div className="flex gap-2">
                  <label className="flex items-center gap-2">
                    <input
                      type="radio"
                      value="Male"
                      {...register("gender", { required: "Gender is required" })}
                    />
                    Male
                  </label>
                  <label className="flex items-center gap-2">
                    <input
                      type="radio"
                      value="Female"
                      {...register("gender", { required: "Gender is required" })}
                    />
                    Female
                  </label>
                  <label className="flex items-center gap-2">
                    <input
                      type="radio"
                      value="Other"
                      {...register("gender", { required: "Gender is required" })}
                    />
                    Other
                  </label>
                </div>
                {errors.gender && (
                  <p className="text-red-500 text-sm">{errors.gender.message}</p>
                )}
              </div>
        
              </div>


              <div className="w-1/2 flex flex-col gap-2">
                <label>Emergency Contact</label>
                <input
                  type="text"
                  placeholder="Name..."
                  className="p-3 border border-gray-300 rounded-md"
                  {...register("emergencyName", { required: "Emergency contact name is required" })}
                />
                {errors.emergencyName && <p className="text-red-500 text-sm">{errors.emergencyName.message}</p>}
                <input
                  type="text"
                  placeholder="Phone..."
                  className="p-3 border border-gray-300 rounded-md"
                  {...register("emergencyPhone", { required: "Emergency contact phone is required" })}
                />
                {errors.emergencyPhone && <p className="text-red-500 text-sm">{errors.emergencyPhone.message}</p>}
                <input
                  type="text"
                  placeholder="Relation..."
                  className="p-3 border border-gray-300 rounded-md"
                  {...register("emergencyRelation", { required: "Emergency contact relation is required" })}
                />
                {errors.emergencyRelation && <p className="text-red-500 text-sm">{errors.emergencyRelation.message}</p>}
              </div>
            </div>
            <input
              type="text"
              placeholder="Postal Address..."
              className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-900 w-full mx-auto"
              {...register("address", { required: "Address is required", })}
            />
            {errors.address && (<p className="text-red-500 text-sm">{errors.address.message}</p>)}
          </div>

          <button type="submit" className="bg-teal-900 text-white p-3 rounded-md mt-6 w-full mx-auto">
            {isSubmitting ? "Submitting..." : "Submit"}
          </button>
        </form>
      </div>
    </section>
  );
};

export default CreateStudent;
