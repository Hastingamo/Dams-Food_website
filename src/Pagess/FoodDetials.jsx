import React from "react";
import Sidebars from "../Component/Sidebars";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import ImageSlider from "../Component/ImageSlider";
import { motion } from "framer-motion";

const UNSPLASH_API_KEY = "N5nfwFtAa37JzIcThzr96azWSfLkmEIu5yEtnhq3Ob8"
function FoodDetials() {
  const { id } = useParams();
  const [meal, setMeal] = useState(null);
  const [mealImages, setMealImages] = useState([]);

  const [recommendedMeals, setRecommendedMeals] = useState([]);

  // Fetch meal details from TheMealDB API
  useEffect(() => {
    const fetchMealDetails = async () => {
      try {
        const res = await fetch(
          `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`
        );
        const data = await res.json();
        if (data.meals && data.meals.length > 0) {
          const mealData = data.meals[0];
          setMeal(mealData);

          // ✅ Fetch additional images from Unsplash
          const query = mealData.strMeal;
          const imageResponse = await fetch(
            `https://api.unsplash.com/search/photos?query=${query}&client_id=${UNSPLASH_API_KEY}&per_page=5`
          );
          const imageData = await imageResponse.json();
          const unsplashImages = imageData.results.map((img) => img.urls.regular);

          // ✅ Merge with the main image
          setMealImages([mealData.strMealThumb, ...unsplashImages]);
        }
      } catch (error) {
        console.error("Error fetching meal details:", error);
      }
    };

    fetchMealDetails();
  }, [id]);

  // Fetch recommended meals
  useEffect(() => {
    const fetchRecommendedMeals = async () => {
      try {
        const res = await fetch(
          `https://www.themealdb.com/api/json/v1/1/filter.php?c=Seafood`
        );
        const data = await res.json();
        if (data.meals) {
          // Filter out the current meal and limit to 10
          const filteredMeals = data.meals
            .filter((meal) => meal.idMeal !== id)
            .slice(0, 10);
          setRecommendedMeals(filteredMeals);
        }
      } catch (error) {
        console.error("Error fetching recommended meals:", error);
      }
    };

    fetchRecommendedMeals();
  }, [id]);

  if (!meal) return <p>Loading...</p>;

  // Generate an array of images for the slider
  // const mealImages = [meal.strMealThumb];
  return (
    <div className="flex  flex-row justify-center items-center h-screen">
      <div>
        <Sidebars />
      </div>

      <div className="flex flex-col justify-center items-center bg-[#C88D84] h-screen w-screen">
        <div className="flex flex-col gap-4">
          {/* Image Slider */}
          <ImageSlider images={mealImages} />

          {/* Food Details */}
          <div className="flex flex-col justify-center text-center bg-red-200 px-3 w-screen gap-2 shadow-lg h-fit">
            <p className="text-2xl font-bold">{meal.strMeal}</p>
            <p>Category: {meal.strCategory}</p>
            <p>Area: {meal.strArea}</p>
            <p className="w-fit ml-5">Instructions: {meal.strInstructions}</p>
          </div>
        </div>

        {/* Recommended Meals */}
        {/* <h1 className="mt-16 text-xl font-semibold">You may also like</h1>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-6">
        {recommendedMeals.map((rec) => (
          <Link key={rec.idMeal} to={`/detail/${rec.idMeal}`} className="text-center">
            <img
              className="w-[15rem] h-[18rem] rounded-md"
              src={rec.strMealThumb}
              alt={rec.strMeal}
            />
            <p className="text-sm">{rec.strMeal}</p>
          </Link>
        ))}
      </div> */}
      </div>
    </div>
  );
}

export default FoodDetials;
