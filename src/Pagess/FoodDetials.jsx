import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ImageSlider from "../Component/ImageSlider";
import { motion } from "framer-motion";
import DetailLayout from "../DetailLayout";
import { MoonLoader } from "react-spinners";
import BackButton from "../Component/BackButton";

const UNSPLASH_API_KEY = "N5nfwFtAa37JzIcThzr96azWSfLkmEIu5yEtnhq3Ob8";

function FoodDetails() {
  const { id } = useParams();
  const [meal, setMeal] = useState(null);
  const [mealImages, setMealImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("instructions");
  const [reviews, setReviews] = useState([]);
  const [newReview, setNewReview] = useState("");

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
      case "order":
        return (
          <div>
            <h2 className="text-lg font-semibold">Order:</h2>
            <h2 className="text-lg font-semibold text-black-600">
              Price: NGN:{meal.randomPrice}
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
      case "Review":
        return (
          <div className="space-y-4">
            <h2 className="text-lg font-semibold">Add Your Review:</h2>
            <form
              className="space-y-2"
              onSubmit={(e) => {
                e.preventDefault();
                const trimmed = newReview.trim();
                if (!trimmed) return;

                if (reviews.length > 0) {
                  alert("You have already submitted a review for this meal.");
                  return;
                }

                const updatedReviews = [trimmed]; // ✅ Only one allowed
                setReviews(updatedReviews);
                localStorage.setItem(
                  `reviews_${meal.idMeal}`,
                  JSON.stringify(updatedReviews)
                );
                setNewReview("");
              }}
            >
              {reviews.length > 0 ? (
                <p className="text-green-600 font-medium">
                  You have already submitted a review.
                </p>
              ) : (
                <>
                  <textarea
                    className="w-full border rounded p-2"
                    placeholder="Write your review here..."
                    value={newReview}
                    onChange={(e) => setNewReview(e.target.value)}
                  />
                  <button
                    type="submit"
                    className="bg-black text-white px-4 py-2 rounded"
                  >
                    Submit Review
                  </button>
                </>
              )}
            </form>

            <div className="mt-4">
              <h3 className="text-lg font-semibold">User Reviews:</h3>
              {reviews.length === 0 ? (
                <p className="text-gray-500">No reviews yet.</p>
              ) : (
                <ul className="list-disc pl-5">
                  {reviews.map((rev, idx) => (
                    <li key={idx} className="mb-2 bg-gray-100 p-2 rounded">
                      {rev}
                    </li>
                  ))}
                </ul>
              )}
            </div>
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
    <>
      <DetailLayout
        image={meal.strMealThumb}
        title={meal.strMeal}
        description={`Category: ${meal.strCategory} | Area: ${meal.strArea}`}
        details={[]}
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
          <button
            className={`bg-[#f9f9f9] px-4 py-2 rounded-lg ${
              activeTab === "video" ? "bg-gray-300" : ""
            }`}
            onClick={() => setActiveTab("Review")}
          >
            Review
          </button>
        </div>

        <div>{renderTabContent()}</div>
      </DetailLayout>
    </>
  );
}

export default FoodDetails;
