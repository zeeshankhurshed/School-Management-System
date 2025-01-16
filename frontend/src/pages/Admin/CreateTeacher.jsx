import { useState } from "react";
import { useForm } from "react-hook-form";
import { useCreateTeachersMutation, useUploadImageMutation } from "../../redux/api/teacher";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const CreateTeacher = () => {
    const navigate = useNavigate();
    const [image, setImage] = useState(null);
    const [CreateTeacher, { isLoading, error }] = useCreateTeachersMutation();
    const [uploadImage] = useUploadImageMutation();

    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm();

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setImage(file);
    };

    const handleDivClick = () => {
        document.getElementById("imageInput").click();
    };

    const onSubmit = async (data) => {
        try {
            let uploadedImageUrl = "";
            if (image) {
                const formData = new FormData();
                formData.append("image", image);
    
                const response = await uploadImage(formData).unwrap();
                // console.log("Upload Response:", response); // Debug log
                uploadedImageUrl = response.image; // Use `image` from the response
            }
    
            const teacherData = {
                ...data,
                profilePicture: uploadedImageUrl, // Assign the image URL here
            };
    
            console.log("Teacher Data Sent to API:", teacherData); // Debug log
            await CreateTeacher(teacherData).unwrap();
            toast.success("Teacher registered successfully!");
            navigate("/teachersDashboard/teacherList");
        } catch (err) {
            console.error("Error:", err); // Debug log
            toast.error(err?.data?.message || "Failed to register teacher");
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
                        {image ? (
                            <img src={URL.createObjectURL(image)} alt="Teacher" className="w-full h-full rounded-full object-cover" />
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
                    {isSubmitting || isLoading ? "Submitting..." : "Register"}
                </button>
            </form>
        </section>
    );
};

export default CreateTeacher;
