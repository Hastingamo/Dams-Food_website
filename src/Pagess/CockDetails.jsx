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
  const [quantity, setQuantity] = useState(1);
  const [reviews, setReviews] = useState([]);
  const [newReview, setNewReview] = useState("");

  const getRandomPrice = (id) => {
    const base =
      parseInt(id.slice(-5), 10) || Math.floor(Math.random() * 9000) + 1000;
    const price = 1000 + (base % 9000); // ensures value is between 1000 and 9999
    return Math.round(price);
  };

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
          mealData.randomPrice = getRandomPrice(mealData.idDrink);
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
  useEffect(() => {
    if (cockTailss?.idDrink) {
      const saved =
        JSON.parse(localStorage.getItem(`reviews_${cockTailss.idDrink}`)) || [];
      setReviews(saved);
    }
  }, [cockTailss]);

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen">
        <MoonLoader color="#36d7b7" />
      </div>
    );
  if (!cockTailss) return <p>Cocktail not found.</p>;
  const handleAddToCart = () => {
    const existingCart = JSON.parse(localStorage.getItem("cart")) || [];
    const itemIndex = existingCart.findIndex(
      (item) => item.id === cockTailss.idDrink
    );

    if (itemIndex !== -1) {
      // already in cart, update quantity
      existingCart[itemIndex].quantity += quantity;
    } else {
      // add new item
      existingCart.push({
        id: cockTailss.idDrink,
        title: cockTailss.strDrink,
        price: cockTailss.randomPrice,
        quantity,
        image: cockTailss.strDrinkThumb,
      });
    }
    localStorage.setItem("cart", JSON.stringify(existingCart));
    alert("Added to cart!");
  };
  const renderTabContent = () => {
    switch (activeTab) {
      // case "Review":
      //   return (
      //     <div>
      //       <h1></h1>
      //       <form
      //         className="space-y-2"
      //         onSubmit={(e) => {
      //           e.preventDefault();
      //           const trimmed = newReview.trim();
      //           if (!trimmed) return;

      //           if (reviews.length > 0) {
      //             alert("You have already submitted a review for this meal.");
      //             return;
      //           }

      //           const updatedReviews = [trimmed];
      //           setReviews(updatedReviews);
      //           localStorage.setItem(
      //             `reviews_${cockTailss.idDrink}`,
      //             JSON.stringify(updatedReviews)
      //           );
      //           setNewReview("");
      //         }}
      //       >
      //         {reviews.length > 0 ? (
      //           <p className="text-green-600 font-medium">
      //             You have already submitted a review.
      //           </p>
      //         ) : (
      //           <>
      //             <textarea
      //               className="w-full border rounded p-2"
      //               placeholder="Write your review here..."
      //               value={newReview}
      //               onChange={(e) => setNewReview(e.target.value)}
      //             />
      //             <button
      //               type="submit"
      //               className="bg-black text-white px-4 py-2 rounded"
      //             >
      //               Submit Review
      //             </button>
      //           </>
      //         )}
      //       </form>
      //     </div>
      //   );

      default:
        return (
          <div>
            <h2 className="text-lg font-semibold">Order:</h2>
            <h2 className="text-lg font-semibold text-black-600">
              Price:{" "}
              {new Intl.NumberFormat("en-NG", {
                style: "currency",
                currency: "NGN",
              }).format(cockTailss.randomPrice)}
            </h2>
            <div className="flex gap-2 mt-2">
              <button
                className="p-2 border hover:scale-105 duration-300"
                onClick={() => setQuantity((prev) => Math.max(1, prev - 1))}
              >
                -
              </button>
              <p className="p-2">{quantity}</p>
              <button
                className="p-2 border"
                onClick={() => setQuantity((prev) => Math.max(1, prev + 1))}
              >
                +
              </button>
            </div>
            <h1>choose you location</h1>

            <button
              onClick={handleAddToCart}
              className="bg-[#f9f9f9] text-black py-3 px-10 rounded-md mt-5 flex items-center gap-2 hover:scale-105 duration-300"
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
    <DetailLayout
      image={cockTailss.strDrinkThumb}
      title={cockTailss.strDrink}
      description={`Category: ${cockTailss.strCategory} `}
    >
      <div className="flex flex-wrap  gap-4 mb-4">
        {/* <button
          className={`bg-[#f9f9f9] px-4 py-2 rounded-lg ${
            activeTab === "instructions" ? "bg-gray-300" : ""
          }`}
          onClick={() => setActiveTab("instructions")}
        >
          Instructions
        </button> */}
        <div className="hover:scale-105 duration-300 ">
                  <button
          className={`bg-[#f9f9f9] px-4 py-2 rounded-lg ${
            activeTab === "order" ? "bg-gray-300" : ""
          }`}
          onClick={() => setActiveTab("order")}
        >
          Place Order
        </button>
          </div>


        {/* <button
          className={`bg-[#f9f9f9] px-4 py-2 rounded-lg ${
            activeTab === "video" ? "bg-gray-300" : ""
          }`}
          onClick={() => setActiveTab("video")}
        >
          Video
        </button> */}
      </div>
      <div>{renderTabContent()}</div>
    </DetailLayout>
  );
}

export default CockDetails;
