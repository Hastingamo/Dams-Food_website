import React from "react";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
function Foods() {
  const [meals, setMeals] = useState([]);
  const uniqueCategories = [...new Set(meals.map((meal) => meal.strCategory))];

  useEffect(() => {
    fetch("https://www.themealdb.com/api/json/v1/1/search.php?s=")
      .then((response) => response.json())
      .then((data) => setMeals(data.meals))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);
  return (
    <>
      <div className=" overflow-x-hidden">
        <motion.h1
          initial={{ opacity: 10, y: 20 }}
          whileHover={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex ml-[62px] text-2xl"
        >
          Category
        </motion.h1>
        <div className="ml-14 xp:ml-20 xs:w-[22rem] grid grid-cols-2 xm:grid-cols-3 sm:grid-cols-3 md:grid-cols-3 xp:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 mt-6 px-5">
          {uniqueCategories.map((category, index) => (
            <motion.div
              initial={{ opacity: 10, y: 20 }}
              whileHover={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              key={index}
              className="shadow-lg justify-center items-center flex flex-col gap-3 p-5 bg-[#FAEBD7] rounded-lg"
            >
              {/* Optional: find one image that belongs to this category */}
              {/* Find the first meal with this category */}
              <img
                src={
                  meals.find((meal) => meal.strCategory === category)
                    ?.strMealThumb
                }
                className="w-20 h-20 object-cover rounded-full"
                alt={category}
              />
              <h1 className="text-2xl font-bold">{category}</h1>
            </motion.div>
          ))}
          {/* 
          <div className="shadow-lg  justify-center items-center flex flex-col gap-3 p-5 bg-[#FAEBD7] rounded-lg">
            <img src="Images/all.png"  className="w-5 h-6" alt="" srcset="" />
            <h1 className="text-2xl font-bold">all</h1>
          </div> */}
        </div>
      </div>
      <div className="ml-14 xp:ml-20 grid grid-cols-2 xp:grid-col-3 xm:grid-cols-3 sm:grid-cols-3 md:grid-cols-3 xp:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 mt- px-5 ">
        {/* {meals?.map(
          (
            meal 
          ) => (
            <div
              key={meal.idMeal}
              className=" rounded-lg shadow-md bg-[#FAEBD7] overflow-hidden"
            >
              {" "}
              <img
                src={meal.strMealThumb}
                alt={meal.strMeal}
                className="w-full h-48 object-cover"
              />{" "}
              <div className="p-4">
                <h2 className="text-xl font-semibold">{meal.strMeal}</h2>{" "}
                <p className="text-gray-600">
                  {meal.strArea} - {meal.strCategory}
                </p>{" "}
              </div>
            </div>
          )
        )} */}
      </div>
    </>
  );
}

export default Foods;
