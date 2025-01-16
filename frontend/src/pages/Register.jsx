import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { FaEye } from "react-icons/fa";
import { IoIosEyeOff } from "react-icons/io";
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRegisterMutation } from '../redux/api/user';
import { setCredentials } from '../redux/features/auth/authSlice';
import { toast } from 'react-toastify';
import Loader from '../components/Loader';

const Register = () => {
  const [show, setShow] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [registering, { isLoading }] = useRegisterMutation();
  const { userInfo } = useSelector((state) => state.auth);

  const { search } = useLocation();
  const sp = new URLSearchParams(search);
  const redirect = sp.get('redirect') || '/';

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [navigate, redirect, userInfo]);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = async (data) => {
    const { username, email, password, confirmPassword, role } = data;

    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
    } else {
      try {
        const res = await registering({ username, email, password, role }).unwrap();
        dispatch(setCredentials({ ...res }));
        navigate(redirect);
        toast.success("User registered successfully");
      } catch (error) {
        console.error(error);
        toast.error(error.data?.message || "Registration failed");
      }
    }
  };

  return (
    <div className="max-w-sm mx-auto my-6 shadow-lg">
      <div className="flex flex-col gap-2 p-4">
        <h2 className="font-bold text-center text-white text-2xl uppercase">Register</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-2">
          <div className="flex flex-col gap-1">
            <label className="text-white">Name</label>
            <input
              className="border focus:outline-none focus:ring-2 focus:ring-teal-500 rounded-lg p-2 bg-black text-white"
              type="text"
              placeholder="Enter your name..."
              {...register('username', { required: 'Name is required' })}
            />
            {errors.username && <p className="text-red-500 text-sm">{errors.username.message}</p>}
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-white">Email</label>
            <input
              className="border focus:outline-none focus:ring-2 focus:ring-teal-500 rounded-lg p-2 bg-black text-white"
              type="email"
              placeholder="Enter your email..."
              {...register('email', { required: 'Email is required' })}
            />
            {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-white">Role</label>
            <select
              className="border focus:outline-none focus:ring-2 focus:ring-teal-500 rounded-lg p-2 bg-black text-white"
              {...register('role', { required: 'Role is required' })}
            >
              <option value="">Select a role...</option>
              <option value="student">Student</option>
              <option value="teacher">Teacher</option>
              <option value="admin">Admin</option>
              <option value="parent">Parent</option>
            </select>
            {errors.role && <p className="text-red-500 text-sm">{errors.role.message}</p>}
          </div>
          
          <div className="flex flex-col gap-1 relative">
            <label className="text-white">Password</label>
            <input
              className="border focus:outline-none focus:ring-2 focus:ring-teal-500 rounded-lg p-2 bg-black text-white"
              type={show ? "text" : "password"}
              placeholder="Enter your password..."
              {...register('password', {
                required: 'Password is required',
                minLength: { value: 6, message: 'Password must be at least 6 characters' },
              })}
            />
            {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
            <span className="absolute top-10 right-4 z-10 text-white cursor-pointer" onClick={() => setShow(!show)}>
              {show ? <FaEye /> : <IoIosEyeOff />}
            </span>
          </div>

          <div className="flex flex-col gap-1 relative">
            <label className="text-white">Confirm Password</label>
            <input
              className="border focus:outline-none focus:ring-2 focus:ring-teal-500 rounded-lg p-2 bg-black text-white"
              type={show ? "text" : "password"}
              placeholder="Confirm your password..."
              {...register('confirmPassword', {
                required: 'Confirm Password is required',
                validate: (value) =>
                  value === watch('password') || 'Passwords do not match',
              })}
            />
            {errors.confirmPassword && (
              <p className="text-red-500 text-sm">{errors.confirmPassword.message}</p>
            )}
            <span className="absolute top-10 right-4 z-10 text-white cursor-pointer" onClick={() => setShow(!show)}>
              {show ? <FaEye /> : <IoIosEyeOff />}
            </span>
          </div>

          <button
            type="submit"
            className="bg-teal-900 text-white rounded-lg p-2 my-4 cursor-pointer font-bold uppercase"
            disabled={isSubmitting}
          >
            {isLoading ? "Registering..." : "Register"}
          </button>
          {isLoading && <Loader />}

          <p className="text-center text-sm text-gray-600">
            Already have an account?{' '}
            <Link to={redirect ? `/login?redirect=${redirect}` : "/login"} className="underline text-teal-900 font-semibold">
              Signin
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Register;
