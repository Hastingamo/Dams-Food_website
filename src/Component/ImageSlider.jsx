import React from "react";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const ImageSlider = ({ images }) => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (images.length > 1) {
      const interval = setInterval(() => {
        setIndex((prevIndex) => (prevIndex + 1) % images.length);
      }, 3000);
      return () => clearInterval(interval);
    }
  }, [images.length]);

  if (images.length === 0) return null;

  return (
    <>
      <div className="w-screen  h-[20rem] bg-[#e4c2bd] relative overflow-hidden rounded-lg ">
        <AnimatePresence>
          <motion.img
            key={index}
            src={images[index]}
            alt={`Slide ${index}`}
            initial={{ scale: 1.1 }}
            animate={{ scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5 }}
            className="absolute inset-0 w-full h-full object-cover"
          />
        </AnimatePresence>
      </div>
    </>
  );
};

export default ImageSlider;
