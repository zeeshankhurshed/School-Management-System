import React, { useState } from "react";
import { RiPantoneLine } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useLogoutMutation } from "../redux/api/user";
import { toast } from "react-toastify";
import { logout } from "../redux/features/auth/authSlice";
import { animate, delay, motion } from 'framer-motion';
import { RiArrowDropDownLine } from "react-icons/ri";

const navList = [
  { name: "Home", url: "/" },
  { name: "About", url: "/about" },
  { name: "Contact", url: "/contact" },
  // { name: "Pages", url: "/pages" },
  { name: "Blog", url: "/blog" },
];

const listVariants = {
  hidden: { opacity: 0, y: -20 },
  visible: { opacity: 1, y: 0 },
};
const buttonVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  hover: { scale: 1.1 },
}
const Navbar = () => {
  const { userInfo } = useSelector((state) => state.auth);

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [dropDownOpen, setDropdownOpen] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [logoutApiCall] = useLogoutMutation();

  const handleLogout = async () => {
    try {
      await logoutApiCall().unwrap();
      dispatch(logout());
      toast.success("Logged out successfully");
      navigate("/login");
    } catch (error) {
      console.error("Failed to logout:", error);
      toast.error("Logout failed");
    }
  };

  return (
    <div className="shadow-lg py-6">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo Section */}
        <motion.div
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <Link to="/" className="cursor-pointer flex gap-2 items-center">
            <span className="text-green-600 text-3xl">
              <RiPantoneLine />
            </span>
            <span className="font-bold text-2xl">Learner</span>
          </Link>
        </motion.div>

        {/* Hamburger Menu for Mobile */}
        <button
          aria-expanded={isMenuOpen}
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="lg:hidden text-2xl"
        >
          ☰
        </button>

        {/* Navigation Menu */}
        <div
          className={`lg:flex ${isMenuOpen ? "block" : "hidden"
            } flex-col lg:flex-row items-center bg-black lg:bg-transparent absolute lg:relative z-50 inset-0 lg:inset-auto`}
        >
          <button
            onClick={() => setIsMenuOpen(false)}
            className="absolute top-4 right-4 text-white text-2xl lg:hidden"
          >
            X
          </button>
          <ul className="flex flex-col lg:flex-row gap-5 absolute mt-32 lg:mt-0 justify-center items-center w-full lg:w-auto">
            {navList.map((item, index) => (
              <motion.li
                key={item.name}
                className="font-bold text-white lg:text-black"
                variants={listVariants}
                initial="hidden"
                animate="visible"
                transition={{ duration: 0.5, delay: index * 0.5 }}
              >
                <Link
                  to={item.url}
                  onClick={() => setIsMenuOpen(false)}
                  className="block px-3 py-2 rounded hover:bg-gray-700 hover:text-white lg:hover:bg-transparent lg:hover:text-gray-900"
                >
                  {item.name}
                </Link>
              </motion.li>
            ))}
          </ul>
        </div>

        {/* Auth and Dropdown */}
        <div className="flex gap-6 font-bold items-center">
          {userInfo ? (
            <div className="relative flex items-center gap-2">

              <button
                onClick={() => setDropdownOpen(!dropDownOpen)}
                className="flex items-center text-gray-800 focus:outline-none"
              >
                <span className="text-white flex items-center lg:text-black border border-teal-500  px-5 py-2 rounded-lg">
                  {userInfo?.username} <RiArrowDropDownLine />
                </span>
              </button>
              {dropDownOpen && (
                <>
                  <ul className="absolute top-10 right-0 mt-2 w-48 bg-white text-gray-600 rounded shadow-md z-50">

                    <div className="hidden md:block">
                      {userInfo.isAdmin && (
                        <>
                          <li>
                            <Link
                              to="/adminDashboard"
                              className="block px-4 py-2 hover:bg-gray-100"
                              onClick={() => setDropdownOpen(false)}
                            >
                              Admin Dashboard
                            </Link>
                          </li>
                          <li>
                            <Link to="/register">
                              <button className="block px-4 py-2 hover:bg-gray-100 w-full text-start"
                              //  initial="initial"
                              //  animate="animate"
                              //  whileHover="hover"
                              //  duration={{duration:0.5,delay:0.4}}
                              >
                                Register
                              </button>
                            </Link>
                          </li>
                          <li>
                            <Link
                              to="/teachersDashboard"
                              className="block px-4 py-2 hover:bg-gray-100"
                              onClick={() => setDropdownOpen(false)}
                            >
                              Teacher Dashboard
                            </Link>
                          </li>
                        </>
                      )}

                      <li>
                        <Link
                          to="/studentsDashboard"
                          className="block px-4 py-2 hover:bg-gray-100"
                          onClick={() => setDropdownOpen(false)}
                        >
                          Student Dashboard
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/profile"
                          className="block px-4 py-2 hover:bg-gray-100"
                          onClick={() => setDropdownOpen(false)}
                        >
                          Profile
                        </Link>
                      </li>
                    </div>

                    <div className="block md:hidden">
                      <li>
                        <NavLink className="block px-4 py-2 hover:bg-gray-100" to={'/studentsDashboard/studentsList'}>Students List</NavLink>
                      </li>
                      <li>
                        <NavLink className="block px-4 py-2 hover:bg-gray-100" to={'/studentsDashboard/StudentResult'}>Students Result</NavLink>
                      </li>
                    </div>

                    <li>
                      <button
                        onClick={() => {
                          setDropdownOpen(false);
                          handleLogout();
                        }}
                        className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                      >
                        Logout
                      </button>
                    </li>
                  </ul>

                </>
              )}
            </div>
          ) : (
            <div className="flex gap-2">
              <Link to="/login">
                <motion.button className="border border-teal-500 bg-blue-900 text-white px-5 py-2 rounded-lg" variants={buttonVariants}
                  initial="initial"
                  animate="animate"
                  whileHover="hover"
                  duration={{ duration: 0.5, delay: 0.2 }}
                >
                  Login
                </motion.button>
              </Link>
              {/* <Link to="/register">
                <motion.button className="border border-teal-500 bg-blue-900 text-white px-5 py-2 rounded-lg" variants={buttonVariants}
                initial="initial"
                animate="animate"
                whileHover="hover"
                duration={{duration:0.5,delay:0.4}}
                >
                  Register
                </motion.button>
              </Link> */}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
