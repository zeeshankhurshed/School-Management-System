import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { FaEye } from "react-icons/fa";
import { IoIosEyeOff } from "react-icons/io";
import Loader from "../../components/Loader";
import { useProfileMutation } from "../../redux/api/user";
import { setCredentials } from "../../redux/features/auth/authSlice";

const Profile = () => {
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.auth);

  const [username, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [show, setShow] = useState(false);

  const [updateProfile, { isLoading }] = useProfileMutation();

  // Pre-fill user data on component load
  useEffect(() => {
    if (userInfo) {
      setUserName(userInfo.username || "");
      setEmail(userInfo.email || "");
      setRole(userInfo.role || "");
    }
  }, [userInfo]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password && password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    try {
      const res = await updateProfile({
        id: userInfo._id,
         username, email, role, password ,
      }).unwrap();

      dispatch(setCredentials(res));
      toast.success("Profile updated successfully");
    } catch (err) {
      toast.error(err?.data?.message || "Failed to update profile");
    }
  };

  return (
    <div className="max-w-sm mx-auto my-6 shadow-lg">
      <div className="flex flex-col gap-2 p-4">
        <h2 className="font-bold text-center text-white text-2xl uppercase">
          Update Profile
        </h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-2">
          {/* Name Field */}
          <div className="flex flex-col gap-1">
            <label className="text-white">Name</label>
            <input
              className="border focus:outline-none focus:ring-2 focus:ring-teal-500 rounded-lg p-2 bg-black text-white"
              type="text"
              placeholder="Enter your name..."
              value={username}
              onChange={(e) => setUserName(e.target.value)}
            />
          </div>

          {/* Email Field */}
          <div className="flex flex-col gap-1">
            <label className="text-white">Email</label>
            <input
              className="border focus:outline-none focus:ring-2 focus:ring-teal-500 rounded-lg p-2 bg-black text-white"
              type="email"
              placeholder="Enter your email..."
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          {/* Role Field */}
          {userInfo.isAdmin && (
                 <div className="flex flex-col gap-1">
                 <label className="text-white">Role</label>
                 <select
                   className="border focus:outline-none focus:ring-2 focus:ring-teal-500 rounded-lg p-2 bg-black text-white"
                   value={role}
                   onChange={(e) => setRole(e.target.value)}
                 >
                   <option value="">Select a role...</option>
                   <option value="student">Student</option>
                   <option value="teacher">Teacher</option>
                   <option value="admin">Admin</option>
                   <option value="parent">Parent</option>
                 </select>
               </div>
          )}
     

          {/* Password Field */}
          <div className="flex flex-col gap-1 relative">
            <label className="text-white">Password</label>
            <input
              className="border focus:outline-none focus:ring-2 focus:ring-teal-500 rounded-lg p-2 bg-black text-white"
              type={show ? "text" : "password"}
              placeholder="Enter your password..."
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <span
              className="absolute top-10 right-4 z-10 text-white cursor-pointer"
              onClick={() => setShow(!show)}
            >
              {show ? <FaEye /> : <IoIosEyeOff />}
            </span>
          </div>

          {/* Confirm Password Field */}
          <div className="flex flex-col gap-1 relative">
            <label className="text-white">Confirm Password</label>
            <input
              className="border focus:outline-none focus:ring-2 focus:ring-teal-500 rounded-lg p-2 bg-black text-white"
              type={show ? "text" : "password"}
              placeholder="Confirm your password..."
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <span
              className="absolute top-10 right-4 z-10 text-white cursor-pointer"
              onClick={() => setShow(!show)}
            >
              {show ? <FaEye /> : <IoIosEyeOff />}
            </span>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="bg-teal-900 text-white rounded-lg p-2 my-4 cursor-pointer font-bold uppercase"
            disabled={isLoading}
          >
            {isLoading ? "Updating..." : "Update Profile"}
          </button>
          {isLoading && <Loader />}
        </form>
      </div>
    </div>
  );
};

export default Profile;
