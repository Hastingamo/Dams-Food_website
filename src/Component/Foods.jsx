import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

function Foods() {
  const [meals, setMeals] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  useEffect(() => {
    fetch("https://www.themealdb.com/api/json/v1/1/search.php?s=")
      .then((response) => response.json())
      .then((data) => setMeals(data.meals))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  const uniqueCategories = [
    "All",
    ...new Set(meals.map((meal) => meal.strCategory)),
  ];

  // Filter meals based on search term and selected category
  const filteredMeals = meals.filter((meal) => {
    const matchesSearch = meal.strMeal
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === "All" || meal.strCategory === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <>
      <div className="fixed top-0 left-0 right-0 z-50 p-4 flex flex-col items-center">
        {/* Search Input */}
        <input
          placeholder="Search meals"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border-black border-solid border rounded p-1 text-black xm:text-2xl md:text-2xl md:p-2 ml-14 mt-4"
        />

        {/* Category Header */}
        <motion.h1
          initial={{ opacity: 10, y: 20 }}
          whileHover={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex ml-[62px] text-2xl mt-4"
        >
          Category
        </motion.h1>

        {/* Category Filter Cards */}
        <div className="ml-14 xp:ml-20 xs:w-[22rem] grid grid-cols-2 xm:grid-cols-3 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-6 mt-6 px-5 pt-10">
          {uniqueCategories.map((category, index) => (
            <motion.div
              initial={{ opacity: 10, y: 20 }}
              whileHover={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              key={index}
              onClick={() => setSelectedCategory(category)}
              className={`shadow-lg cursor-pointer justify-center items-center flex flex-col gap-3 p-5 rounded-lg ${
                selectedCategory === category
                  ? "bg-yellow-300"
                  : "bg-[#FAEBD7]"
              }`}
            >
              {category !== "All" && (
                <img
                  src={
                    meals.find((meal) => meal.strCategory === category)
                      ?.strMealThumb
                  }
                  className="w-20 h-20 object-cover rounded-full"
                  alt={category}
                />
              )}
              <h1 className="text-2xl font-bold">{category}</h1>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Filtered Meals */}
      <div className="ml-14 xp:ml-20 grid grid-cols-2 xm:grid-cols-3 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 mt-6 px-5">
        {filteredMeals.map((meal) => (
          <div
            key={meal.idMeal}
            className="rounded-lg shadow-md bg-[#FAEBD7]"
          >
            <img
              src={meal.strMealThumb}
              alt={meal.strMeal}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h2 className="text-xl font-semibold">{meal.strMeal}</h2>
              <p className="text-gray-600">
                {meal.strArea} - {meal.strCategory}
              </p>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default Foods;
