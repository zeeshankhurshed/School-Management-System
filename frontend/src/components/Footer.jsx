import {Link} from 'react-router-dom';
import { RiPantoneLine } from "react-icons/ri";
import { FaFacebookF } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaLinkedinIn } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa6";
import {motion} from 'framer-motion';

const Footer = () => {
  return (
    <div className="shadow-[rgba(0,_0,_0,_0.4)_0px_30px_90px] py-10 ">
 <div className="grid grid-cols-1 md:w-4/5 m-auto md:grid-cols-2 lg:grid-cols-4 gap-4 justify-between ml-5 md:ml-0 text-center md:text-start">

<div>
    <div className='ml-24 md:ml-0'>
        <Link href='/' className="flex items-center gap-2 text-4xl">
            <span className="text-green-600"><RiPantoneLine /></span>
            <span className="font-semibold text-xl sm:text-3xl">Learners.</span>
        </Link>
    </div>

  <div className="relative flex items-center justify-start pt-12 pb-8 ml-24 md:ml-4">
              {/* Rotating Circular Text */}
              <motion.svg
                animate={{ rotate: 360 }}
                transition={{
                  duration: 4,
                  ease: "linear",
                  repeat: Infinity,
                  delay: 2
                }}
                viewBox="0 0 200 200"
                xmlns="http://www.w3.org/2000/svg"
                className="absolute w-36 h-36 left-0 font-bold text-blue-400"
              >
                {/* Define the circular path */}
                <path
                  id="circlePath"
                  d="M 100, 100 m -75, 0 a 75,75 0 1,1 150,0 a 75,75 0 1,1 -150,0"
                  fill="none"
                  stroke="none"
                />

                {/* Place the text along the circular path */}
                <text fill="currentColor" fontSize="18" fontWeight="bold">
                  <textPath href="#circlePath" startOffset="0%">
                    LEARNER LEARNER LEARNER LEARNER LEARNER LEARNER
                  </textPath>
                </text>
              </motion.svg>

              {/* Button in the center */}
              <button className="relative z-10 left-[18px] p-2 font-bold text-xs text-white bg-blue-500 rounded-full hover:bg-blue-600">
                Admission Open
              </button>
            </div>

    <p className="text-gray-600 text-xs py-5 ">Follow us on Social media</p>
    <div className="flex justify-between  mx-auto items-center text-green-600 text-sm w-[50%] md:w-[100%]">
    <FaFacebookF />
    <FaInstagram />
    <FaLinkedinIn />
    <FaTwitter />
    </div>
</div>

<div className="">
    <h6 className="font-bold ">Explore</h6>
    <ul className="flex flex-col justify-between gap-5 mt-5 text-sm text-gray-700">
        <li>
            <Link to='/'>
            Home
            </Link>
        </li>
        <li>
            <Link to='/about'>
            About Us
            </Link>
        </li>
        <li>
            <Link to='/contact'>
            Contact
            </Link>
        </li>
        <li>
            <Link to='/blog'>
            Blog
            </Link>
        </li>
    </ul>
</div>

<div>
<h6 className="font-bold ">Information</h6>

<ul className="flex flex-col justify-between gap-5 mt-5 text-sm text-gray-700">
        <li>
            <Link href='#'>
            Privacy Policy
            </Link>
        </li>
        <li>
            <Link href='#'>
            Membership
            </Link>
        </li>
        <li>
            <Link href='#'>
            Purchase Guide
            </Link>
        </li>
        <li>
            <Link href='#'>
            Terms of Services
            </Link>
        </li>
    </ul>

</div>

<div>
<h6 className="font-bold ">Get in Touch</h6>

<div className="flex flex-col justify-between gap-5 mt-5 text-sm text-gray-700">
    <p>Address:Tarnol, Islamabad, Pakistan.</p>
    <parseInt>Phone:+92 345-5231199</parseInt>
    <p>Email:zeeshankhursheed680@gmail.com</p>
</div>

</div>
</div>
    </div>
  );
}

export default Footer;
