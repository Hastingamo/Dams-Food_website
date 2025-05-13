import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { MoonLoader } from "react-spinners";
import DetailLayout from "../DetailLayout";
function CockDetails() {
  const { id } = useParams();
  const [cockTailss, setcockTailss] = useState(null);
  const [mealImages, setMealImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("instructions");
  useEffect(() => {
    const fetchCocktailDetails = async () => {
      try {
        setLoading(true);
        const res = await fetch(
          `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`
        );
        const data = await res.json();
        if (data.drinks && data.drinks.length > 0) {
          const mealData = data.drinks[0];
          setcockTailss(mealData);
        }
      } catch (error) {
        console.error("Error fetching meal details:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchCocktailDetails();
  }, [id]);
  if (loading)
    return (
      <div className="flex justify-center items-center h-screen">
        <MoonLoader color="#36d7b7" />
      </div>
    );
  if (!cockTailss) return <p>Cocktail not found.</p>;
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
            <h1>choose you location</h1>

            <button className="bg-[#f9f9f9] text-black py-3 px-10 rounded-md mt-5">
              Add to Cart
            </button>
          </div>
        );
      case "video":
        return cockTailss.strYoutube ? (
          <div>
            <h2 className="text-lg font-semibold">Video Instructions:</h2>
            <iframe
              className="mt-4"
              width="100%"
              height="315"
              src={cockTailss.strYoutube.replace("watch?v=", "embed/")}
              title={cockTailss.strDrink}
              allowFullScreen
            ></iframe>
          </div>
        ) : (
          <p>No video available.</p>
        );

      default:
        const steps = cockTailss.strInstructions.split(/\.(?=\s[A-Z])/);
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
      image={cockTailss.strDrinkThumb}
      title={cockTailss.strDrink}
      description={`Category: ${cockTailss.strCategory} `}
    >
      <div className="flex gap-4 mb-4">
        <button
          className={`bg-[#f9f9f9] px-4 py-2 rounded-lg ${
            activeTab === "instructions" ? "bg-gray-300" : ""
          }`}
          onClick={() => setActiveTab("instructions")}
        >
          Instructions
        </button>
        <button
          className={`bg-[#f9f9f9] px-4 py-2 rounded-lg ${
            activeTab === "order" ? "bg-gray-300" : ""
          }`}
          onClick={() => setActiveTab("order")}
        >
          Place Order
        </button>
        <button
          className={`bg-[#f9f9f9] px-4 py-2 rounded-lg ${
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

export default CockDetails;
