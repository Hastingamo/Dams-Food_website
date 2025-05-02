import React, { useEffect, useState } from "react";
import Sidebars from "../Component/Sidebars.jsx";
import { MoonLoader } from "react-spinners";

function Food() {
  const [loading, setLoading] = useState(true);
  const [meals, setMeals] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => {
      setLoading(false);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  const searchMeals = async (query) => {
    if (!query) return;
    setLoading(true);
    try {
      const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`);
      const data = await response.json();
      if (data.meals) {
        setMeals(data.meals);
        setError(null);
      } else {
        setMeals([]);
        setError("No meals found.");
      }
    } catch (err) {
      console.error("Fetch error:", err);
      setError("An error occurred while fetching meals.");
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    if (value.trim() !== "") {
      searchMeals(value);
    } else {
      setMeals([]);
      setError(null);
    }
  };

  return (
    <div className="flex flex-row items-center bg-[#C88D84] justify-center overflow-x-hidden">
      {loading ? (
        <div className="flex justify-center items-center h-screen w-screen">
          <MoonLoader color="black" size={100} />
        </div>
      ) : (
        <div className="w-full min-h-screen flex flex-row bg-[#C88D84] justify-center items-start bg-opacity-80 z-50 overflow-x-hidden pt-10 px-4">
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
              className="border p-2 rounded w-full max-w-md mb-4"
            />
            {error && <p className="text-red-600">{error}</p>}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 w-full max-w-5xl">
              {meals.map((meal) => (
                <div key={meal.idMeal} className="bg-white rounded-lg p-4 shadow-md">
                  <img src={meal.strMealThumb} alt={meal.strMeal} className="rounded w-full h-48 object-cover mb-2" />
                  <h2 className="text-xl font-semibold">{meal.strMeal}</h2>
                  <p className="text-gray-600">{meal.strArea} - {meal.strCategory}</p>
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
