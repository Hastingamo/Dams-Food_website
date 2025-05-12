import React from "react";
import { motion } from "framer-motion";
const DetailLayout = ({
  image,
  title,
  description,
  price,
  rating,
  calories,
  children,
  time,
}) => {
  return (
    <div className="flex flex-row min-h-screen">
      <div className="flex flex-col md:flex-row p-5 gap-8 bg-[rgb(249,249,249)] rounded-xl  flex-1">
        <div className="hidden md:flex w-full gap-8">
          <motion.div
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 1 }}
            initial={{ opacity: 0, scale: 0.8, y: 130 }}
            whileInView={{ opacity: 1, scale: 1 }}
            className="flex-1 p-8 bg-blue-300 rounded-xl shadow-md"
          >
            <h1 className="text-2xl font-bold mt-20">{title}</h1>
            <p className="text-gray-600">{description}</p>

            <div className="mt-4">{children}</div>
          </motion.div>

          {/* Right Section - Image Display */}
          <motion.div
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            initial={{ opacity: 0, y: -50 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="flex-1 flex justify-center items-start "
          >
            <img
              src={image}
              alt={title}
              className="w-96 h-96 object-cover flex shadow-lg"
            />
          </motion.div>
        </div>
        <div className="flex-1 flex justify-center items-start ">
          <img
            src={image}
            alt={title}
            className="w-96 h-96 object-cover flex  shadow-lg"
          />
        </div>
      </div>

      {/* Mobile View */}
      <div className="md:hidden flex flex-col items-center bg-[#c88d84] w-screen -ml-12">
      <motion.div
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          initial={{ opacity: 0, y: -50 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="flex-1 flex justify-center items-center"
        >
          <img
            src={image}
            alt={title}
            className="w-full max-w-sm mt-[2rem] rounded-xl object-cover shadow-lg"
          />
        </motion.div>
        <motion.div
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 1 }}
          initial={{ opacity: 0, scale: 0.8, y: 130 }}
          whileInView={{ opacity: 1, scale: 1 }}
          className="flex-1 flex flex-col gap-4 rounded-3xl w-full mt-20 bg-[#e4c2bd] px-10 pt-3"
        >
          <h1 className="text-2xl font-bold mt-20">{title}</h1>
          <p className="text-gray-600">{description}</p>

          <div className="mt-4">{children}</div>
        </motion.div>

        <div className="hidden md:flex-1 md:flex md:flex-col md:gap-4 ">
          <h1 className="text-2xl font-bold">{title}</h1>
          <p className="text-gray-600">{description}</p>

          <div className="mt-4">{children}</div>
        </div>
      </div>
    </div>
  );
};

export default DetailLayout;
