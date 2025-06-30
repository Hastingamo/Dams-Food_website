import React, { useState, useEffect } from "react";
import Sidebars from "../Component/Sidebars";
import { MoonLoader } from "react-spinners";
import { motion } from "framer-motion";

function Home() {
  const [loading, setLoading] = useState(true);
  const [image, setImage] = useState([]);
  const [featuredImage, setFeaturedImage] = useState(null);

  useEffect(() => {
    fetch("https://www.themealdb.com/api/json/v1/1/search.php?s=")
      .then((response) => response.json())
      .then((data) => {
        if (data.meals) {
          setImage(data.meals);

          // Pick a random image from the array
          const randomImage =
            data.meals[Math.floor(Math.random() * data.meals.length)];
          setFeaturedImage(randomImage);
        }
      })
      .catch((error) => console.error("Error fetching data:", error));

    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);
  // useEffect(() => {
  //   document.body.style.overflow = "hidden";
  //   return () => {
  //     document.body.style.overflow = "auto";
  //   };
  // }, []);

  return (
    <div className="flex flex-row  h-fit">
      {/* <Sidebars /> */}
      {loading ? (
        <div className="flex justify-center items-center h-screen w-screen">
          <MoonLoader color="black" size={100} />
        </div>
      ) : (
        <>
          <div className="flex flex-row w-full h-[40rem] md:h-screen lg:h-[37rem]">
            {/* Left Section */}
            <div className="w-2/3 md:ml-[5rem] bg-blue-200 pl-8 pt-[4rem]  pb-[4rem] md:pt-[2rem] md;pb-[2rem]">
              <motion.div
                animate={{ opacity: 1, x: 0, scale: 1 }}
                transition={{ duration: 2 }}
                initial={{ opacity: 0, scale: 0.8, x: -130 }}
                whileInView={{ opacity: 1, scale: 1 }}
                className="shadow-2xl h-full  md:pt-30 lg:pt-48 xl:pt-10 gap-3"
              >
                <h1 className="text-6xl md:text-8xl font-bold ml-4 text-white w-fit  pt-12 md:pt-2">
                  Food{" "}
                </h1>
                <p className="text-white ml-4 md:text-2xl">is your good </p>
                <h1 className="text-6xl md:text-8xl font-bold ml-4 text-white w-fit">
                  Mood
                </h1>
                <div className="mt-14 w-fit shadow-md ml-10 ">
                  <h1 className="text-2xl font-bold text-white">
                    Welcome to Food Mood
                  </h1>
                  <p className="text-gray-600">
                    This is a simple food mood application.
                  </p>
                  {featuredImage ? (
                    <div
                      key={featuredImage.idMeal}
                      className="flex flex-col items-center"
                    >
                      <h2 className="text-xl font-bold mt-2">
                        {featuredImage.strMeal}
                      </h2>
                    </div>
                  ) : (
                    <p>No Image Available</p>
                  )}
                </div>
              </motion.div>
            </div>

            {/* Right Section */}
            <div className="w-1/3 bg-pink-200 pt-[4rem]  pb-[4rem] pr-8 md:pt-[2rem] md;pb-[2rem]">
              <motion.div
                animate={{ opacity: 1, x: 0, scale: 1 }}
                transition={{ duration: 2 }}
                exit={{ x: "100vw", opacity: 0 }}
                initial={{ x: "100vw", opacity: 0 }}
                whileInView={{ opacity: 1, scale: 1 }}
                className="pl-10 pt-30 md:pt-30 xl:pt-10 shadow-2xl h-full "
              >
                {featuredImage ? (
                  <div
                    key={featuredImage.idMeal}
                    className="flex flex-col -ml-[8rem] md:-ml[10rem] lg: xl:-ml-[40rem] items-center"
                  >
                    <motion.img
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 1 }}
                      initial={{ opacity: 0, y: -50 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      src={featuredImage.strMealThumb}
                      alt={featuredImage.strMeal}
                      className="w-[10rem] md:w-[25rem] h-auto rounded-full shadow-lg mt-4"
                    />
             
                  </div>
                ) : (
                  <p>No Image Available</p>
                )}
              </motion.div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default Home;
