import { motion } from 'framer-motion';
import { BsTelephoneOutboundFill } from "react-icons/bs";
import { IoLogoTwitter } from "react-icons/io";
import { FaFacebook } from "react-icons/fa6";
import { FaInstagram } from "react-icons/fa6";

const colorVariants = {
    initial: { color: "#000" },
    animate: {
      color: ["#000", "#e74c3c", "#f39c12", "#27ae60", "#2980b9", "#8e44ad", "#000"],
      transition: {
        duration: 4,
        repeat: Infinity,
        repeatType: "loop",
      },
    },
  };

const Reachus = () => {
  return (
    <section className='container mx-auto mb-3'>
     <h2 className="text-center text-sm md:text-2xl uppercase font-extrabold my-12 italic">
        <motion.span
          variants={colorVariants}
          initial="initial"
          animate="animate"
        >
          Reach
        </motion.span>{" "}
        <motion.span
          variants={colorVariants}
          initial="initial"
          animate="animate"
        >
          Us
        </motion.span>
      </h2>
      <div className='grid grid-cols-1 md:flex justify-between gap-3'>

      <div className='w-full md:w-[70%]'>
      <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d26573.9455955192!2d72.87941192650361!3d33.63789992208627!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x38df981df9efa4c5%3A0x1a6a4d85a019aab4!2sBenazir%20Chowk%2C%20Islamabad%2C%20Islamabad%20Capital%20Territory%2C%20Pakistan!5e0!3m2!1sen!2s!4v1736076413620!5m2!1sen!2s" width="850" height="450" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
      </div>
      <div className='w-[30%] flex md:flex-col gap-4'>

        <div className="shadow-lg flex flex-col gap-3 p-4">
            <h2 className='font-bold txt-sm md:text-2xl'>Call Us</h2>
            <span className='flex gap-2 items-center'><BsTelephoneOutboundFill />923455231199</span>
            <span className='flex gap-2 items-center'><BsTelephoneOutboundFill />923455886452</span>
        </div>
        <div className="shadow-lg flex flex-col gap-3 p-4">
            <h2 className='font-bold txt-sm md:text-2xl'>Follow Us</h2>
            <span className='flex gap-2 items-center'><IoLogoTwitter  />Twitter</span>
            <span className='flex gap-2 items-center'>< FaFacebook />Facebook</span>
            <span className='flex gap-2 items-center'><FaInstagram />Instagram</span>
        </div>
      </div>
      </div>
    </section>
  );
}

export default Reachus;
