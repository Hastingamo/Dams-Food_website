import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ImageSlider from "../Component/ImageSlider";
import { motion } from "framer-motion";
import DetailLayout from "../DetailLayout";
import { MoonLoader } from "react-spinners";
import BackButton from "../Component/BackButton";

const UNSPLASH_API_KEY = "N5nfwFtAa37JzIcThzr96azWSfLkmEIu5yEtnhq3Ob8";

function FoodDetailss() {
  const { id } = useParams();
  const [meal, setMeal] = useState(null);
  const [mealImages, setMealImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("instructions");
  const [reviews, setReviews] = useState([]);
  const [newReview, setNewReview] = useState("");
 const navigate = useNavigate();
  const [quantity, setQuantity] = useState(1);

  const getRandomPrice = (id) => {
    const base =
      parseInt(id.slice(-5), 10) || Math.floor(Math.random() * 9000) + 1000;
    const price = 1000 + (base % 9000);
    return Math.round(price);
  };

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
          mealData.randomPrice = getRandomPrice(mealData.idMeal); // ✅ Assign price
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
  useEffect(() => {
    if (meal?.idMeal) {
      const saved =
        JSON.parse(localStorage.getItem(`reviews_${meal.idMeal}`)) || [];
      setReviews(saved);
    }
  }, [meal]);

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen">
        <MoonLoader color="#36d7b7" />
      </div>
    );
  if (!meal) return <p>Meal not found.</p>;
     
  const navigateToPrenium = () => {
    navigate("/subscription");
  }

  const addToCart = () => {
    const existingCart = JSON.parse(localStorage.getItem("cart")) || [];
    const itemIndex = existingCart.findIndex((item) => item.id === meal.idMeal);

    if (itemIndex !== -1) {
      // already in cart, update quantity
      existingCart[itemIndex].quantity += quantity;
    } else {
      // add new item
      existingCart.push({
        id: meal.idMeal,
        title: meal.strMeal,
        price: meal.randomPrice,
        quantity,
        image: meal.strMealThumb,
      });
    }

    localStorage.setItem("cart", JSON.stringify(existingCart));
    alert("Added to cart!");
  };

  if (!meal) return <p>Loading...</p>;
 
  const renderTabContent = () => {
    switch (activeTab) {
        case "Video":
        return(
            <>
                <h1>get pro to be  watch cooking turtorials</h1>
                <button className="text-black bg-white p-2 border rounded mt-3" onClick={navigateToPrenium}>preniums</button>
            </>
        )
      default: 
      return(
            <div>
            <h2 className="text-lg font-semibold">Order:</h2>
            <h2 className="text-lg font-semibold text-black-600">
              Price:{" "}
              {new Intl.NumberFormat("en-NG", {
                style: "currency",
                currency: "NGN",
              }).format(meal.randomPrice)}
            </h2>
            <div className="flex gap-2 mt-2 items-center">
              <button
                className="p-2 border rounded"
                onClick={() => setQuantity((prev) => Math.max(1, prev - 1))}
              >
                -
              </button>
              <p className="p-2">{quantity}</p>
              <button
                className="p-2 border rounded"
                onClick={() => setQuantity((prev) => prev + 1)}
              >
                +
              </button>
            </div>

            <h1>choose you location</h1>

            <button
              onClick={addToCart}
              className="bg-[#f9f9f9] text-black py-3 px-10 rounded-md mt-5 flex items-center gap-2"
            >
              <img
                src="/Images/shoppingCart.png"
                className="w-4 h-4"
                alt="arrow"
              />
              Add to Cart
            </button> 
          </div>
        );
    }
  };

  return (
    <>
      <DetailLayout
        image={meal.strMealThumb}
        title={meal.strMeal}
        description={`Category: ${meal.strCategory} | Area: ${meal.strArea}`}
        details={[]}
      >
        <div className="flex flex-wrap   gap-4 mb-4">
          <div className="hover:scale-105 transition-transform duration-200">
            <button
              className={`bg-[#f9f9f9] px-4 py-2 rounded-lg ${
                activeTab === "order" ? "bg-gray-300" : ""
              }`}
              onClick={() => setActiveTab("order")}
            >
              Place Order
            </button>
          </div>
                    <div className="hover:scale-105 transition-transform duration-200">
            <button
              className={`bg-[#f9f9f9] px-4 py-2 rounded-lg ${
                activeTab === "order" ? "bg-gray-300" : ""
              }`}
              onClick={() => setActiveTab("Video")}
            >
             Videos
            </button>
          </div>
          
        </div>

        <div>{renderTabContent()}</div>
      </DetailLayout>
    </>
  );
}

export default FoodDetailss;
