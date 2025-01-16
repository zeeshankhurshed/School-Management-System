import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useCreateTeachersMutation, useGetSpecificTeacherQuery, useUpdateTeacherMutation, useUploadImageMutation } from "../../redux/api/teacher";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import Loader from '../../components/Loader';

const TeacherUpdate = () => {
  const {id}=useParams();
    const navigate = useNavigate();
    const [image, setImage] = useState(null);
    const [CreateTeacher, { isLoading, error }] = useCreateTeachersMutation();
    const [uploadImage] = useUploadImageMutation();
    const {data:teacherData,isLoading:isLoadingTeacher,refetch:refetchTeacher}=useGetSpecificTeacherQuery(id);
    const [updateTeacher,{isLoading:isUpdatingTeacher}]=useUpdateTeacherMutation();
       console.log(teacherData);
    

    const { register, handleSubmit, formState: { errors, isSubmitting },reset } = useForm();

    useEffect(() => {
        if (teacherData) {
          reset({
            profilePicture: teacherData.profilePicture || "",
            name: teacherData.name || "",
            contactNumber: teacherData.contactNumber || "",
            email: teacherData.email || "",
            address: teacherData.address || "",
            employeeId: teacherData.employeeId || "",
            qualification: teacherData.qualification || "",
            dob: teacherData.dob ? new Date(teacherData.dob).toISOString().split('T')[0] : "",
            joiningDate: teacherData.joiningDate ? new Date(teacherData.joiningDate).toISOString().split('T')[0] : "",
            experience: teacherData.experience || "",
            salary: teacherData.salary || "",
            username: teacherData.username || "",
            password: teacherData.password || "",
            gender: teacherData.gender || "",
            roles: teacherData.roles || "",
          });
        }
      }, [teacherData, reset]);
      


      
      const handleDivClick = () => {
          document.getElementById("imageInput").click();
        };

        const handleImageChange = async (e) => {
            const file = e.target.files[0];
            setImage(file);
          
            try {
              const formData = new FormData();
              formData.append("image", file);
          
              const { data: uploadResponse } = await uploadImage(formData).unwrap();
              console.log("Image upload response:", uploadResponse); // Check this in the console
          
              if (uploadResponse?.url) {
                reset((formValues) => ({
                  ...formValues,
                  profilePicture: uploadResponse.url, // Ensure this is the uploaded image URL
                }));
                toast.success("Image uploaded successfully!");
              }
            } catch (error) {
              console.error("Image upload failed:", error);
              toast.error("Failed to upload image. Please try again.");
            }
          };


const onSubmit = async (data) => {
    try {
      const updatePayload = {
        id,
        profilePicture: data.profilePicture, // Ensure this is the uploaded image URL
        name: data.name,
        contactNumber: data.contactNumber,
        email: data.email,
        address: data.address,
        employeeId: data.employeeId,
        qualification: data.qualification,
        dob: data.dob,
        joiningDate: data.joiningDate,
        experience: data.experience,
        salary: data.salary,
        username: data.username,
        password: data.password,
        gender: data.gender,
        roles: data.roles,
      };
  
      console.log("Update Payload:", updatePayload); // Log to verify
  
      const updateData = await updateTeacher(updatePayload).unwrap();
      console.log("API Response:", updateData);
  
      toast.success("Teacher updated successfully!");
      await refetchTeacher();
      navigate("/teachersDashboard/teacherList");
    } catch (error) {
      console.error("Error occurred during update:", error);
      toast.error("Failed to update teacher. Please try again.");
    }
  };
    
      
    return (
        <section className="max-w-4xl flex flex-col justify-center p-6 ml-24">
            <h2 className="uppercase font-bold text-2xl text-teal-950 mb-6 text-center">Register Teacher</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="flex flex-col gap-4 mb-6">
                    <div
                        className="border border-slate-800 rounded-full w-44 h-44 flex justify-center items-center text-gray-500 relative cursor-pointer mx-auto"
                        onClick={handleDivClick}
                    >
                        {image || teacherData?.profilePicture?(
                            <img src={image? URL.createObjectURL(image):teacherData?.profilePicture} alt="Teacher" className="w-full h-full rounded-full object-cover" />
                        ) : (
                            <span className="-rotate-45 backdrop-blur-lg">Teacher Photo</span>
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
                        placeholder="Teacher Name..."
                        className="p-3 border border-gray-300 rounded-md"
                        {...register("name", { required: "Name is required" })}
                    />
                    {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}

                        <input
                        type="text"
                        placeholder="Contact Number..."
                        className="p-3 border border-gray-300 rounded-md"
                        {...register("contactNumber", { required: "Contact number is required" })}
                    />
                    {errors.contactNumber && <p className="text-red-500 text-sm">{errors.contactNumber.message}</p>}

                    <input
                        type="email"
                        placeholder="Email..."
                        className="p-3 border border-gray-300 rounded-md"
                        {...register("email", { required: "Email is required" })}
                    />
                    {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}

                    <input
                        type="text"
                        placeholder="Address..."
                        className="p-3 border border-gray-300 rounded-md"
                        {...register("address")}
                    />

                    <input
                        type="text"
                        placeholder="Employee ID..."
                        className="p-3 border border-gray-300 rounded-md"
                        {...register("employeeId", { required: "Employee ID is required" })}
                    />
                    {errors.employeeId && <p className="text-red-500 text-sm">{errors.employeeId.message}</p>}
                    

                    <input
                        type="text"
                        placeholder="Qualifications..."
                        className="p-3 border border-gray-300 rounded-md"
                        {...register("qualification")}
                    />

                    <div className="flex flex-col gap-2">

                    <label >Date of Birth</label>
                    <input
                        type="date"
                        className="p-3 border border-gray-300 rounded-md"
                        {...register("dob", { required: "Date of birth is required" })}
                        />
                    {errors.dob && <p className="text-red-500 text-sm">{errors.dob.message}</p>}
                        </div>


                        <div className="flex flex-col gap-2">
                    <label >Date of Joining</label>
                    <input
                        type="date"
                        className="p-3 border border-gray-300 rounded-md"
                        {...register("joiningDate", { required: "Joining date is required" })}
                        />
                        </div>
                    {errors.joiningDate && <p className="text-red-500 text-sm">{errors.joiningDate.message}</p>}

                   

                    <input
                        type="number"
                        placeholder="Experience in years..."
                        className="p-3 border border-gray-300 rounded-md"
                        {...register("experience")}
                    />

                    <input
                        type="number"
                        placeholder="Salary..."
                        className="p-3 border border-gray-300 rounded-md"
                        {...register("salary")}
                    />

                    <input
                        type="text"
                        placeholder="Username..."
                        className="p-3 border border-gray-300 rounded-md"
                        {...register("username", { required: "Username is required" })}
                    />
                    {errors.username && <p className="text-red-500 text-sm">{errors.username.message}</p>}

                    <input
                        type="password"
                        placeholder="Password..."
                        className="p-3 border border-gray-300 rounded-md"
                        {...register("password", { required: "Password is required" })}
                    />
                    {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}

                    <div className="flex flex-col gap-2">
                        <label>Gender</label>
                        <div className="flex gap-2">
                            {["male", "female", "other"].map((gender) => (
                                <label key={gender} className="flex items-center gap-2">
                                    <input
                                        type="radio"
                                        value={gender}
                                        {...register("gender", { required: "Gender is required" })}
                                    />
                                    {gender.charAt(0).toUpperCase() + gender.slice(1)}
                                </label>
                            ))}
                        </div>
                        {errors.gender && <p className="text-red-500 text-sm">{errors.gender.message}</p>}
                    </div>

                    <div className="flex flex-col gap-2">
                        <label>Roles</label>
                        <select
                            className="p-3 border border-gray-300 rounded-md focus:outline-none"
                            {...register("roles", { required: "Role is required" })}
                        >
                            <option value="">Select a role</option>
                            <option value="teacher">Teacher</option>
                            <option value="admin">Admin</option>
                        </select>
                        {errors.roles && <p className="text-red-500 text-sm">{errors.roles.message}</p>}
                    </div>

                </div>

                <button
                    type="submit"
                    className="mt-6 bg-teal-500 text-white py-2 px-6 rounded-md hover:bg-teal-600"
                    disabled={isSubmitting || isLoading}
                >
                    {isSubmitting || isLoading ? "Submitting..." : "Update"}
                </button>
            </form>
        </section>
    );
};

export default TeacherUpdate;
