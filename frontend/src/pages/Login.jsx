import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FaEye } from "react-icons/fa";
import { IoIosEyeOff } from "react-icons/io";
import { useLoginMutation } from '../redux/api/user';
import { useDispatch, useSelector } from 'react-redux';
import { setCredentials } from '../redux/features/auth/authSlice';
import { toast } from 'react-toastify';

const Login = () => {
  const [loginApiCall, { isLoading }] = useLoginMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { search } = useLocation();
  const sp = new URLSearchParams(search);
  const redirect = sp.get('redirect') || '/';

  const userInfo = useSelector((state) => state.auth.userInfo);

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [navigate, redirect, userInfo]);

  const { register, handleSubmit, formState: { errors } } = useForm();

  const [show, setShow] = useState(false);

  const onSubmit = async ({ email, password }) => {
    const userData = { email: email.trim().toLowerCase(), password };
    try {
      const res = await loginApiCall(userData).unwrap();
      console.log("API Response:", res); // Log the response to inspect it
      dispatch(setCredentials(res.userInfo)); // Ensure it matches the response structure
      toast.success("Login successfully");
      navigate(redirect);
    } catch (error) {
      console.error(error);
      toast.error(error.data?.message || "Login Failed");
    }
  };

  return (
    <div className="max-w-sm mx-auto my-12 shadow-lg">
      <div className="flex flex-col gap-2 p-4">
        <h2 className="font-bold text-center text-white text-2xl uppercase">Signin</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-2">
          <div className="flex flex-col gap-1">
            <label htmlFor="email" className="text-white">Email</label>
            <input
              className="border focus:outline-none focus:ring-2 focus:ring-teal-500 rounded-lg p-2 bg-black text-white"
              type="email"
              id="email"
              placeholder="Enter your email..."
              {...register('email', { required: 'Email is required' })}
            />
            {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
          </div>

          <div className="flex flex-col gap-1 relative">
            <label htmlFor="password" className="text-white">Password</label>
            <input
              className="border focus:outline-none focus:ring-2 focus:ring-teal-500 rounded-lg p-2 bg-black text-white"
              type={show ? "text" : "password"}
              id="password"
              placeholder="Enter your password..."
              {...register('password', {
                required: 'Password is required',
                minLength: { value: 6, message: 'Password must be at least 6 characters' },
              })}
            />
            {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
            <span
              className="absolute top-10 right-4 z-10 text-white cursor-pointer"
              onClick={() => setShow(!show)}
            >
              {show ? <FaEye /> : <IoIosEyeOff />}
            </span>
          </div>

          <button
            type="submit"
            className="bg-teal-900 text-white rounded-lg p-2 my-4 cursor-pointer font-bold uppercase"
            disabled={isLoading}
          >
            {isLoading ? "Loading..." : "Submit"}
          </button>

          <p className="text-center text-sm text-gray-600">
            Don’t have an account?{' '}
            <Link to={redirect ? `/register?redirect=${redirect}` : '/register'} className="underline text-teal-900 font-semibold">
              Signup
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
