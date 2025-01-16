import { AnimatePresence } from "framer-motion";
import { motion } from "framer-motion";



const TransitionProvider = ({ children, pathName = '' }) => {
  return (
    <AnimatePresence>
      <div 
        key={pathName} 
        className="w-screen h-screen bg-gradient-to-b from-blue-500 to-red-100 overflow-x-hidden"
      >
        {/* <motion.div
          className="h-screen w-screen fixed bg-black z-40"
          style={{ height: "100px", borderTopLeftRadius: "100px", borderTopRightRadius: "100px" }}
          animate={{ height: "0vh" }}
          exit={{ height: "140vh" }}
          transition={{ duration: 1, ease: "easeOut" }}
        /> */}
        {/* <motion.div
          className="fixed top-[50%] bottom-0 left-[45%] text-4xl right-0 cursor-default z-50 w-fit h-fit bg-black text-white"
          initial={{ opacity: 1 }}
          animate={{ opacity: 0 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          {pathName ? pathName.substring(1) : "Home"}
        </motion.div> */}

        {/* <motion.div
          className="h-screen w-screen fixed bottom-0 z-30 bg-black"
          style={{ height: "100px", borderBottomLeftRadius: "100px", borderBottomRightRadius: "100px" }}
          initial={{ height: "140vh" }}
          animate={{ height: "0vh", transition: { delay: 1 } }}
        /> */}

        {/* <Navbar /> */}
        {children}
        {/* <Footer /> */}
      </div>
    </AnimatePresence>
  );
};

export default TransitionProvider;
