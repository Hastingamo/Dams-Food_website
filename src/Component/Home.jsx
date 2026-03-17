import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import Sidebars from "../Component/Sidebars";
import { MoonLoader } from "react-spinners";
import { motion as Motion } from "framer-motion";

function Home() {
  const [loading, setLoading] = useState(true);
  const [featuredMeal, setFeaturedMeal] = useState(null);
  const [featuredDrink, setFeaturedDrink] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [mealResponse, drinkResponse] = await Promise.all([
          fetch("https://www.themealdb.com/api/json/v1/1/random.php"),
          fetch("https://www.thecocktaildb.com/api/json/v1/1/random.php"),
        ]);

        const mealData = await mealResponse.json();
        const drinkData = await drinkResponse.json();

        if (mealData.meals) {
          setFeaturedMeal(mealData.meals[0]);
        }
        if (drinkData.drinks) {
          setFeaturedDrink(drinkData.drinks[0]);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  return (
    <div className="flex flex-row min-h-screen bg-[#fdf2f0]">
      <div className="hidden md:block">
        <Sidebars />
      </div>
      {loading ? (
        <div className="flex justify-center items-center h-screen w-screen">
          <MoonLoader color="#c88d84" size={100} />
        </div>
      ) : (
        <Motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-col w-full md:ml-20"
        >
          {/* Hero Section */}
          <div className="flex flex-col lg:flex-row w-full min-h-[60vh] md:min-h-screen">
            {/* Left Content */}
            <div className="w-full lg:w-1/2 flex flex-col justify-center p-8 md:p-16 space-y-6">
              <Motion.div variants={itemVariants}>
                <h1 className="text-6xl md:text-9xl font-bold text-[#c88d84] leading-tight">
                  Food <br />
                  <span className="text-[#8e5047]">Mood</span>
                </h1>
                <p className="text-xl md:text-2xl text-gray-600 mt-4 italic">
                  Is your good mood...
                </p>
              </Motion.div>

              <Motion.div variants={itemVariants} className="flex flex-wrap gap-4 mt-8">
                <Motion.button
                  whileHover={{ scale: 1.05, boxShadow: "0px 5px 15px rgba(200, 141, 132, 0.4)" }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => navigate("/food")}
                  className="px-8 py-3 bg-[#c88d84] text-white rounded-full font-bold text-lg shadow-lg transition-colors hover:bg-[#b07b73]"
                >
                  Explore Menu
                </Motion.button>
                <Motion.button
                  whileHover={{ scale: 1.05, boxShadow: "0px 5px 15px rgba(142, 80, 71, 0.3)" }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => navigate("/cocktails")}
                  className="px-8 py-3 border-2 border-[#8e5047] text-[#8e5047] rounded-full font-bold text-lg transition-colors hover:bg-[#8e5047] hover:text-white"
                >
                  Drink Specials
                </Motion.button>
              </Motion.div>
            </div>

            {/* Right Visuals - Staggered Featured Items */}
            <div className="w-full lg:w-1/2 relative flex items-center justify-center p-8 bg-gradient-to-br from-[#fdf2f0] to-[#e4c2bd]">
              <div className="relative w-full max-w-lg aspect-square">
                {/* Featured Meal */}
                {featuredMeal && (
                  <Motion.div
                    variants={itemVariants}
                    whileHover={{ scale: 1.05, zIndex: 10 }}
                    className="absolute top-0 left-0 w-3/4 cursor-pointer"
                    onClick={() => navigate(`/food/${featuredMeal.idMeal}`)}
                  >
                    <div className="bg-white p-4 rounded-3xl shadow-2xl">
                      <img
                        src={featuredMeal.strMealThumb}
                        alt={featuredMeal.strMeal}
                        className="w-full h-auto rounded-2xl object-cover"
                      />
                      <div className="mt-4">
                        <span className="text-xs font-bold uppercase tracking-widest text-[#c88d84]">Featured Meal</span>
                        <h3 className="text-xl font-bold text-gray-800 truncate">{featuredMeal.strMeal}</h3>
                      </div>
                    </div>
                  </Motion.div>
                )}

                {/* Featured Drink */}
                {featuredDrink && (
                  <Motion.div
                    variants={itemVariants}
                    whileHover={{ scale: 1.05, zIndex: 10 }}
                    className="absolute bottom-0 right-0 w-2/3 cursor-pointer"
                    onClick={() => navigate(`/cocktails/${featuredDrink.idDrink}`)}
                  >
                    <div className="bg-white p-4 rounded-3xl shadow-2xl">
                      <img
                        src={featuredDrink.strDrinkThumb}
                        alt={featuredDrink.strDrink}
                        className="w-full h-auto rounded-2xl object-cover"
                      />
                      <div className="mt-4">
                        <span className="text-xs font-bold uppercase tracking-widest text-[#8e5047]">Today's Drink</span>
                        <h3 className="text-lg font-bold text-gray-800 truncate">{featuredDrink.strDrink}</h3>
                      </div>
                    </div>
                  </Motion.div>
                )}
              </div>
            </div>
          </div>

          {/* Call to Action Section */}
          <Motion.div
            variants={itemVariants}
            className="w-full py-20 px-8 bg-[#8e5047] text-white text-center"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Hungry or Thirsty?</h2>
            <p className="text-xl mb-10 max-w-2xl mx-auto opacity-90">
              We've got the perfect combination of delicious meals and refreshing cocktails waiting for you.
            </p>
            <div className="flex justify-center gap-6">
               <Motion.div
                 whileHover={{ y: -5 }}
                 className="flex flex-col items-center cursor-pointer"
                 onClick={() => navigate("/food")}
               >
                 <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mb-2">
                    <img src="/Images/tray.png" alt="Food" className="w-8 h-8" />
                 </div>
                 <span>Food</span>
               </Motion.div>
               <Motion.div
                 whileHover={{ y: -5 }}
                 className="flex flex-col items-center cursor-pointer"
                 onClick={() => navigate("/cocktails")}
               >
                 <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mb-2">
                    <img src="/Images/cocktail.png" alt="Drink" className="w-8 h-8" />
                 </div>
                 <span>Cocktails</span>
               </Motion.div>
            </div>
          </Motion.div>
        </Motion.div>
      )}
    </div>
  );
}

export default Home;
