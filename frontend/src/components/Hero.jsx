import { motion } from "framer-motion";
import FeeReminder from "./FeeReminder";

const colorVariants = {
  initial: { color: "#000" },
  animate: {
    color: ["#000", "#1abc9c", "#3498db", "#9b59b6", "#000"],
    transition: {
      duration: 5,
      repeat: Infinity,
      repeatType: "loop",
    },
  },
};

const Hero = () => {
  return (
    <>
    <FeeReminder/>
    <div className="container mx-auto flex flex-col md:flex-row justify-around items-center w-[100%] mt-10">
      {/* Text Section */}
      <div className="w-full md:w-1/2 md:ml-[7rem] text-center md:text-start">
        <motion.h2
         initial={{ x: -100, opacity: 0 }}
         animate={{ x: 0, opacity: 1 }}
         transition={{ duration: 0.5,delay:0.9 }}
        className="text-sm sm:text-xl md:text-3xl font-bold">
        <span>AnyTime AnyWhere</span>
          <br />
          <motion.span
            variants={colorVariants}
            initial="initial"
            animate="animate"
            >
            Learn on your
          </motion.span>
          <br />
          <motion.span
            variants={colorVariants}
            initial="initial"
            animate="animate"
            >
            Suitable Schedule
          </motion.span>
        </motion.h2>

        <motion.p 
        initial={{y:100,opacity:0}}
        animate={{y:0,opacity:1}}
        transition={{duration:0.5,delay:0.9}}
        className="text-xs md:text-sm text-gray-600 my-2 md:my-6 w-full md:w-3/4 ">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsa maxime in
          praesentium consequuntur mollitia fugit?
        </motion.p>

        <div className="hidden md:flex items-center">
          <input
            type="text"
            className="border border-teal-300 rounded-md focus:outline-none p-2"
            placeholder="Search here..."
            />
          <button className=" bg-purple-500 p-2 rounded-md text-white">
            Search
          </button>
        </div>
      </div>

      {/* Image Section */}
      <motion.div
      initial={{x:100,opacity:0}}
      animate={{x:0,opacity:1}}
      transition={{duration:0.5, delay:0.8}}
      className="hidden  w-1/2 md:flex justify-center">
        <img src="/hero-2.png" alt="Hero Illustration" className="w-[80%]" />
      </motion.div>
    </div>
        </>

    
  );
};

export default Hero;
