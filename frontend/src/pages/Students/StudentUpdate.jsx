import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useFetchClassesQuery } from "../../redux/api/classes";
import { toast } from "react-toastify";
import {
  useUpdateStudentMutation,
  useUploadImageMutation,
  useGetSpecificStudentQuery,
} from "../../redux/api/student";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router";

const UpdateStudent = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [image, setImage] = useState(null);
  const [uploadImage, { isLoading: isUploadingImage }] = useUploadImageMutation();
  const [updateStudent, { isLoading: isUpdatingStudent }] = useUpdateStudentMutation();
  const { data: schoolClasses, isLoading: isLoadingSchoolClasses } = useFetchClassesQuery();
  const { data: studentData, isLoading: isLoadingStudent, refetch: refetchStudent } = useGetSpecificStudentQuery(id);

  const { register, handleSubmit, watch, formState: { errors, isSubmitting }, reset } = useForm();

  useEffect(() => {
    if (studentData) {
      reset({
        fullName: studentData.fullName || "",
        gender: studentData.gender || "",
        dateOfBirth: studentData.dateOfBirth ? studentData.dateOfBirth.split("T")[0] : "",
        photo: studentData.photo || "",
        admissionNumber: studentData.admissionNumber || "",
        schoolClass: studentData.schoolClass || "",
        section: studentData.section || "",
        rollNumber: studentData.rollNumber || "",
        academicYear: studentData.academicYear || "",
        guardianName: studentData.guardianName || "",
        contactNumber: studentData.contactNumber || "",
        email: studentData.email || "",
        address: studentData.address || "",
        emergencyName: studentData.emergencyContact?.name || "",
        emergencyPhone: studentData.emergencyContact?.phone || "",
        emergencyRelation: studentData.emergencyContact?.relation || "",
      });
    }
  }, [studentData, reset]);
  
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
  };

  const handleDivClick = () => {
    document.getElementById("imageInput").click();
  };

  const onSubmit = async (data) => {
    try {
      let uploadImagePath = studentData.photo;  // Default to current photo URL if no new image
  
      if (image) {
        const formData = new FormData();
        formData.append("image", image);
        const uploadImageResponse = await uploadImage(formData).unwrap();
        
        // Ensure the image URL is set correctly
        uploadImagePath = uploadImageResponse.data.image;
      }
  
      const updatedData = await updateStudent({
        id,
        fullName: data.fullName,
        gender: data.gender,
        dateOfBirth: data.dateOfBirth,
        photo: uploadImagePath,
        admissionNumber: data.admissionNumber,
        schoolClass: data.schoolClass,
        section: data.section,
        rollNumber: data.rollNumber,
        academicYear: data.academicYear,
        guardianName: data.guardianName,
        contactNumber: data.contactNumber,
        email: data.email,
        address: data.address,
        emergencyContact: {
          name: data.emergencyName,
          phone: data.emergencyPhone,
          relation: data.emergencyRelation,
        },
      }).unwrap();
  
      console.log("Updated Data:", updatedData);  // Debugging log
  
      toast.success("Student updated successfully!");
  
      // Refetch the student data to ensure the UI is updated
      await refetchStudent();
  
      navigate("/studentsDashboard/studentsList");
    } catch (error) {
      console.error("Error during student update:", error);  // Log for debugging
      toast.error(`Failed to update student: ${error.message}`);
    }
  };
  

  if (isLoadingStudent || isLoadingSchoolClasses) {
    return <div>Loading...</div>;
  }

  return (
    <section className="max-w-4xl flex flex-col justify-center p-6 ml-24">
      <div className="shadow-md rounded-lg p-8">
        <h2 className="uppercase font-bold text-2xl text-teal-900 mb-6 text-center">
          Update Student Form
        </h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col gap-4 mb-6">
            <div
              className="border border-gray-100 w-44 h-44 flex justify-center items-center text-gray-500 relative cursor-pointer mx-auto"
              onClick={handleDivClick}
            >
              {image || studentData?.photo ? (
                <img
                  src={image ? URL.createObjectURL(image) : studentData?.photo}
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
            {isSubmitting || isUpdatingStudent ? "Submitting..." : "Submit"}
          </button>
        </form>
      </div>
    </section>
  );
};

export default UpdateStudent;
