import React, { useEffect, useState } from "react";
import Sidebars from "../Component/Sidebars";
import { useParams } from "react-router-dom";
import ImageSlider from "../Component/ImageSlider";
import { motion } from "framer-motion";
import DetailLayout from "../DetailLayout";
import { MoonLoader } from "react-spinners";

const UNSPLASH_API_KEY = "N5nfwFtAa37JzIcThzr96azWSfLkmEIu5yEtnhq3Ob8";

function FoodDetails() {
  const { id } = useParams();
  const [meal, setMeal] = useState(null);
  const [mealImages, setMealImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("instructions");

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

          const query = `"${mealData.strMeal} food"`;
          const imageResponse = await fetch(
            `https://api.unsplash.com/search/photos?query=${query}&client_id=${UNSPLASH_API_KEY}&per_page=5`
          );
          const imageData = await imageResponse.json();

          const unsplashImages = imageData.results
            .filter((img) =>
              img.tags?.some((tag) => tag.title.includes("food"))
            )
            .map((img) => img.urls.regular);

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

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen">
        <MoonLoader color="#36d7b7" />
      </div>
    );
  if (!meal) return <p>Meal not found.</p>;

  const renderTabContent = () => {
    switch (activeTab) {
      case "order":
        return (
          <div>
            <h2 className="text-lg font-semibold">Order:</h2>
            <div className="flex gap-2 mt-2">
              <button className="p-2 border">-</button>
              <p className="p-2">1</p>
              <button className="p-2 border">+</button>
            </div>
            <button className="bg-green-600 text-white py-3 px-10 rounded-md mt-5">
              Add to Cart
            </button>
          </div>
        );
      case "video":
        return meal.strYoutube ? (
          <div>
            <h2 className="text-lg font-semibold">Video Instructions:</h2>
            <iframe
              className="mt-4"
              width="100%"
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
        const steps = meal.strInstructions.split(/\.(?=\s[A-Z])/);
        return (
          <div>
            <h2 className="text-lg font-semibold">
              Instructions (Step by Step):
            </h2>
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
    <DetailLayout
      image={meal.strMealThumb}
      title={meal.strMeal}
      description={`Category: ${meal.strCategory} | Area: ${meal.strArea}`}
      details={[]}
    >
        <div className="flex gap-4 mb-4">
          <button
            className={`bg-green-600 px-4 py-2 rounded-lg ${
              activeTab === "instructions" ? "bg-gray-300" : ""
            }`}
            onClick={() => setActiveTab("instructions")}
          >
            Instructions
          </button>
          <button
            className={`bg-green-600 px-4 py-2 rounded-lg ${
              activeTab === "order" ? "bg-gray-300" : ""
            }`}
            onClick={() => setActiveTab("order")}
          >
            Place Order
          </button>
          <button
            className={`bg-green-600 px-4 py-2 rounded-lg ${
              activeTab === "video" ? "bg-gray-300" : ""
            }`}
            onClick={() => setActiveTab("video")}
          >
            Video
          </button>
        </div>

        <div>{renderTabContent()}</div>
    </DetailLayout>
  );
}

export default FoodDetails;
