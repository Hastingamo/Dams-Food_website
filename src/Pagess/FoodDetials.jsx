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
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("instructions");

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

  if (loading) return <p>Loading...</p>;
  if (!meal) return <p>Meal not found.</p>;

  // Tab content handler
  const renderTabContent = () => {
    switch (activeTab) {
      case "ingredients":
        return (
          <div>
            <h2 className="text-lg font-semibold">Ingredients:</h2>
            <ul className="list-disc pl-5">
              {Object.keys(meal)
                .filter((key) => key.includes("strIngredient") && meal[key])
                .map((key, index) => (
                  <li key={index}>
                    {meal[key]} - {meal[`strMeasure${key.match(/\d+/)[0]}`]}
                  </li>
                ))}
            </ul>
          </div>
        );
      case "video":
        return meal.strYoutube ? (
          <div>
            <h2 className="text-lg font-semibold">Video Instructions:</h2>
            <iframe
              className="mt-4 w-fit"
       
              height="315"
              src={meal.strYoutube.replace("watch?v=", "embed/")}
              title={meal.strMeal}
              allowFullScreen
            ></iframe>
          </div>
        ) : (
          <p>No video available.</p>
        );
      default:
        // Split the instructions into steps
        const steps = meal.strInstructions.split(/\.(?=\s[A-Z])/);
        return (
          <div>
            <h2 className="text-lg font-semibold">Instructions (Step by Step):</h2>
            <ul className="list-decimal pl-5">
              {steps.map((step, index) => (
                <li key={index} className="mb-2">
                  {step.trim()}
                </li>
              ))}
            </ul>
          </div>
        );
    }
  };

  return (
    <div className="flex flex-row justify-center items-center h-screen">
      <div>
        <Sidebars />
      </div>

      <div className="flex flex-col bg-[#C88D84] h-screen w-screen md:hidden">
        <div className="flex flex-col gap-4">
          <ImageSlider images={mealImages} />

          <div className="flex flex-col bg-red-200 pl-16 w-fit ml-[5rem] rounded-2xl pt-10 pb-10 gap-2 shadow-lg h-fit">
            <div className="flex flex-row gap-6 items-center">
              <div>
                <p className="text-2xl font-bold mt-8">{meal.strMeal}</p>
                <p>Category: {meal.strCategory}</p>
                <p>Area: {meal.strArea}</p>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4 mb-4 mt-4">
              <button className={`bg-white ${activeTab === "instructions" && "bg-gray-300"}`} onClick={() => setActiveTab("instructions")}>Instructions</button>
              <button className={`bg-white ${activeTab === "ingredients" && "bg-gray-300"}`} onClick={() => setActiveTab("ingredients")}>Ingredients</button>
              <button className={`bg-white ${activeTab === "video" && "bg-gray-300"}`} onClick={() => setActiveTab("video")}>Video</button>
            </div>

            <div className="mt-4 overflow-x-hidden h-[15rem] relative">
              {renderTabContent()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FoodDetails;
