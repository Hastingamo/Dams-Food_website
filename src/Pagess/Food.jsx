import React, { useEffect, useState } from "react";
import Sidebars from "../Component/Sidebars.jsx";
import { MoonLoader } from "react-spinners";

function Food() {
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
        const defaultCategory = data.categories[0].strCategory;
        setSelectedCategory(defaultCategory);
        filterByCategory(defaultCategory); // auto-load meals from the first category
      }
    } catch (err) {
      console.error("Error fetching categories:", err);
    }
  };

  // Search meals by name
  const searchMeals = async (query) => {
    setLoading(true);
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
    <div className="flex flex-row items-center bg-[#C88D84] justify-center overflow-x-hidden">
      <div>
        <Sidebars />
      </div>
      {loading ? (
        <div className="flex justify-center items-center h-screen w-screen">
          <MoonLoader color="black" size={100} />
        </div>
      ) : (
        <div className="w-full min-h-screen flex flex-row bg-[#C88D84] justify-center ml-[36px] pt-10 px-4 overflow-x-hidden">
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
              {categories.map((cat) => (
                <button
                  key={cat.idCategory}
                  className={`px-3 py-1 rounded border ${
                    selectedCategory === cat.strCategory
                      ? "bg-black text-white"
                      : "bg-white text-black"
                  }`}
                  onClick={() => filterByCategory(cat.strCategory)}
                >
                  <img
                    className="w-5 h-5"
                    src={cat.strMealThumb}
                    alt={cat.strMeal}
                    srcset=""
                  />
                  {cat.strCategory}
                </button>
              ))}
            </div>

            {error && <p className="text-red-600">{error}</p>}

            <div className="grid ml-11  grid-cols-2 xm:grid-cols-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 mt-6 px-5">
              {meals.map((meal) => (
                <div
                  key={meal.idMeal}
                  className="bg-[#FAEBD7] rounded-lg p-4 shadow-md"
                >
                  <img
                    src={meal.strMealThumb}
                    alt={meal.strMeal}
                    className="rounded w-full h-40 object-cover mb-2"
                  />
                  <h2 className="text-xl font-semibold">{meal.strMeal}</h2>
                  {/* Full search includes area/category, filter does not */}
                  {meal.strArea && meal.strCategory && (
                    <p className="text-gray-600">
                      {meal.strArea} - {meal.strCategory}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Food;
