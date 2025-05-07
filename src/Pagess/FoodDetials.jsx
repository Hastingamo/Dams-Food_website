import React, { useEffect, useState } from "react";
import Sidebars from "../Component/Sidebars";
import { useParams } from "react-router-dom";
import ImageSlider from "../Component/ImageSlider";
import { motion } from "framer-motion";

const UNSPLASH_API_KEY = "N5nfwFtAa37JzIcThzr96azWSfLkmEIu5yEtnhq3Ob8";

function FoodDetails() {
  const { id } = useParams();
  const [meal, setMeal] = useState(null);
  const [mealImages, setMealImages] = useState([]);
  const [recommendedMeals, setRecommendedMeals] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch meal details from TheMealDB API
  useEffect(() => {
    const fetchMealDetails = async () => {
      try {
        setLoading(true);
        const res = await fetch(
          `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`
        );
        const data = await res.json();

        if (data.meals && data.meals.length > 0) {
          const mealData = data.meals[0];
          setMeal(mealData);

          // ✅ Fetch additional images from Unsplash with strict match
          const query = `"${mealData.strMeal} food"`;
          const imageResponse = await fetch(
            `https://api.unsplash.com/search/photos?query=${query}&client_id=${UNSPLASH_API_KEY}&per_page=5`
          );
          const imageData = await imageResponse.json();

          // ✅ Filter out non-food images
          const unsplashImages = imageData.results
            .filter((img) =>
              img.tags?.some((tag) => tag.title.includes("food"))
            )
            .map((img) => img.urls.regular);

          // ✅ Merge with the main image
          setMealImages([mealData.strMealThumb, ...unsplashImages]);
        }
      } catch (error) {
        console.error("Error fetching meal details:", error);
      } finally {
        setLoading(false);
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

  if (loading) return <p>Loading...</p>;
  if (!meal) return <p>Meal not found.</p>;

  return (
    <div className="flex flex-row justify-center items-center h-screen">
      <div>
        <Sidebars />
      </div>

      <div className="flex flex-col bg-[#C88D84] h-screen w-screen md:hidden">
        <div className="flex flex-col gap-4">
          {/* Image Slider */}
          <ImageSlider images={mealImages} />

          {/* Food Details */}
          <div className="flex flex-col bg-red-200 pl-16 w-[29rem] ml-[5rem] rounded-2xl pt-10 pb-10 gap-2 shadow-lg h-fit">
            <div className="flex flex-row gap-6 items-center">
              <div>
                <p className="text-2xl font-bold mt-8">{meal.strMeal}</p>
                <p>Category: {meal.strCategory}</p>
                <p>Area: {meal.strArea}</p>
              </div>
              <div className="flex flex-row ml-[6rem] w-fit border-4 border-black gap-2  bg-green-400 w-">
                <h1 className="p-2 ">-</h1>
                <h1 className="p-2 ">1</h1>
                <h1 className="p-2 ">+</h1>
              </div>
            </div>

            <div className=" grid grid-cols-3 gap-4 mb-4 mt-4">
              <button className="bg-white">rating</button>

              <button className="bg-white">ingrident</button>
              <button className="bg-white">video</button>
            </div>
            <div> 
               <h1>About </h1>
               <p></p>
            </div>
            {/* <p className="w-fit ml-5">Instructions: {meal.strInstructions}</p> */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default FoodDetails;
