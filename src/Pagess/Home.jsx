import React from "react";
import {motion} from "framer-motion"
import Sidebars from "../Component/Sidebars";

function Home() {
  return (
    <div className="flex flex-row items-center justify-center h-screen bg-gray-100">
      <Sidebars/>
      <h1 className="text-4xl font-bold mb-4">Welcome to My App</h1>
      <motion.div className="">

      </motion.div>
    </div>
  );
}

export default Home;
