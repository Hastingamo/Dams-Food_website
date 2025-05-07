import React, { useEffect, useState } from "react";
import Sidebars from "../Component/Sidebars.jsx";
import { MoonLoader } from "react-spinners";
import { motion } from "framer-motion";
import { Link } from "react-router";

function Foods() {
  const [loading, setLoading] = useState(true);
  const [meals, setMeals] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [error, setError] = useState(null);

  // On mount: delay, then fetch categories
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
      fetchCategories();
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  // Fetch all categories
  const fetchCategories = async () => {
    try {
      const res = await fetch(
        "https://www.themealdb.com/api/json/v1/1/categories.php"
      );
      const data = await res.json();
      if (data.categories) {
        setCategories(data.categories);
        const defaultCategory = data.categories[2].strCategory;
        setSelectedCategory(defaultCategory);
        filterByCategory(defaultCategory); // auto-load meals from the first category
      }
    } catch (err) {
      console.error("Error fetching categories:", err);
    }
  };

  // Search meals by name
  const searchMeals = async (query) => {
    try {
      const res = await fetch(
        `https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`
      );
      const data = await res.json();
      if (data.meals) {
        setMeals(data.meals);
        setError(null);
      } else {
        setMeals([]);
        setError("No meals found.");
      }
    } catch (err) {
      console.error("Error searching meals:", err);
      setError("An error occurred while fetching meals.");
    } finally {
      setLoading(false);
    }
  };

  // Fetch meals by selected category
  const filterByCategory = async (category) => {
    setLoading(true);
    setSearchTerm("");
    setSelectedCategory(category);
    try {
      const res = await fetch(
        `https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`
      );
      const data = await res.json();
      if (data.meals) {
        setMeals(data.meals);
        setError(null);
      } else {
        setMeals([]);
        setError("No meals found in this category.");
      }
    } catch (err) {
      console.error("Error filtering by category:", err);
      setError("An error occurred while fetching meals.");
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    setSelectedCategory(""); // Reset category filter
    if (value.trim() !== "") {
      searchMeals(value);
    } else {
      setMeals([]);
      setError(null);
    }
  };

  return (
    <div className="flex flex-row items-center bg-[#c88d84] justify-center ">
      <div>
        <Sidebars />
      </div>
      {loading ? (
        <div className="flex justify-center items-center h-screen w-screen">
          <MoonLoader color="black" size={100} />
        </div>
      ) : (
        <div className="w-full min-h-screen flex flex-row bg-[#C88D84] justify-center ml-[36px] pt-10 px-4 ">
          <div>
            <Sidebars />
          </div>
          <div className="flex flex-col items-center w-full px-4">
            <h1 className="text-3xl font-bold mb-4">Food</h1>

            <input
              type="text"
              value={searchTerm}
              onChange={handleInputChange}
              placeholder="Search meals..."
              className="border p-2 ml-11 mr11 rounded w-full max-w-md mb-4"
            />

            {/* Category buttons */}
            <div className="flex flex-wrap ml-11 gap-2 mb-4 justify-center">
              {categories.map((cat, index) => (
                <motion.button
                  key={cat.idCategory}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 1, delay: index * 0.05 }}
                  className={`px-3 py-1 rounded border ${
                    selectedCategory === cat.strCategory
                      ? "bg-black text-white"
                      : "bg-linear-to-bl from-[#c88d84]-700 to-fuchsia-50  text-[#]"
                  }`}
                  onClick={() => filterByCategory(cat.strCategory)}
                >
                  <img
                    className="w-5 h-5"
                    src={cat.strCategoryThumb}
                    alt={cat.strCategoryThumb}
                    srcset=""
                  />
                  {cat.strCategory}
                </motion.button>
              ))}
            </div>

            {error && <p className="text-red-600">{error}</p>}

            <div className="grid ml-11  grid-cols-2 xm:grid-cols-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 mt-6 px-5">
              {meals.map((meal, index) => (
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  // viewport={{ once: true }}
                  whileHover={{
                    scale: 1.05,
                    shadow: "0 4px 20px rgba(0, 0, 0, 0.2), ",
                    duration: 0.1,
                  }}
                  key={meal.idMeal}
                  transition={{ duration: 1, delay: index * 0.05 }}
                  className="bg-linear-to-bl from-[#8e5047]-700 to-fuchsia-50  rounded-lg  shadow-md hover:shadow-lg transition"
                >
                  <Link to={`/food/${meal.idMeal}`}>
                    <img
                      src={meal.strMealThumb}
                      alt={meal.strMeal}
                      className="rounded  object-cover mb-2"
                    />
                    <h2 className="text-xl font-semibold flex justify-center text-center pb-5">
                      {meal.strMeal}
                    </h2>
                    {/* Full search includes area/category, filter does not */}
                    {meal.strArea && meal.strCategory && (
                      <p className="text-gray-600">
                        {meal.strArea} - {meal.strCategory}
                      </p>
                    )}
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Foods;
