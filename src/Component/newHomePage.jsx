import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Sidebars from "../Component/Sidebars";
import { MoonLoader } from "react-spinners";
import { motion as Motion } from "framer-motion";

function NewHomePage() {
  const [loading, setLoading] = useState(true);
  const [featuredMeal, setFeaturedMeal] = useState(null);
  const [featuredCocktail, setFeaturedCocktail] = useState(null);
  const [categories, setCategories] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch meals, cocktail, and categories
    const fetchData = async () => {
      try {
        const [mealsRes, categoriesRes, cocktailRes] = await Promise.all([
          fetch("https://www.themealdb.com/api/json/v1/1/search.php?s="),
          fetch("https://www.themealdb.com/api/json/v1/1/categories.php"),
          fetch("https://www.thecocktaildb.com/api/json/v1/1/random.php"),
        ]);

        const mealsData = await mealsRes.json();
        const categoriesData = await categoriesRes.json();
        const cocktailData = await cocktailRes.json();

        if (mealsData.meals && mealsData.meals.length > 0) {
          const randomIdx = Math.floor(Math.random() * mealsData.meals.length);
          setFeaturedMeal(mealsData.meals[randomIdx]);
        }

        if (categoriesData.categories) {
          setCategories(categoriesData.categories.slice(0, 8));
        }

        if (cocktailData.drinks && cocktailData.drinks.length > 0) {
          setFeaturedCocktail(cocktailData.drinks[0]);
        }
      } catch (error) {
        console.error("Error fetching newHomePagepage data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/food?search=${encodeURIComponent(searchQuery)}`);
    } else {
      navigate("/food");
    }
  };

  return (
    <div className="min-h-screen bg-[#c88d84] text-white flex flex-col md:flex-row relative overflow-x-hidden">
      <div className="z-30">
        <Sidebars />
      </div>

      <div className="flex-1 pl-20 md:pl-24 pr-4 md:pr-8 py-6 w-full max-w-7xl mx-auto space-y-16">
        {loading ? (
          <div className="flex justify-center items-center min-h-[70vh] w-full">
            <MoonLoader color="#f97316" size={80} />
          </div>
        ) : (
          <>
            <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900 via-rose-950/80 to-slate-900 border border-slate-800/80 p-6 md:p-12 shadow-2xl">
              <div className="absolute -top-24 -right-24 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl pointer-events-none" />
              <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-rose-500/10 rounded-full blur-3xl pointer-events-none" />

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
                {/* Hero Left Content */}
                <Motion.div
                  initial={{ opacity: 0, x: -40 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8 }}
                  className="lg:col-span-7 space-y-6"
                >
                  <div className="inline-flex items-center space-x-2 px-3 py-1.5 rounded-full bg-orange-500/10 border border-orange-500/30 text-orange-400 text-xs font-semibold tracking-wide uppercase">
                    <span>🔥 Elevate Your Dining Experience</span>
                  </div>

                  <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white leading-tight">
                    Food makes your {" "}
                    <span className="bg-gradient-to-r from-orange-400 via-rose-400 to-amber-300 bg-clip-text text-transparent">
                      Mood better
                    </span>
                  </h1>

                  <p className="text-slate-300 text-base sm:text-lg leading-relaxed max-w-xl">
                    Discover thousands of mouthwatering recipes, handcrafted cocktail pairings, and curated culinary ideas designed to boost your spirits every day.
                  </p>

                  {/* Search Bar */}
                  <form onSubmit={handleSearchSubmit} className="relative max-w-md flex items-center">
                    <input
                      type="text"
                      placeholder="Search favorite meals, ingredients..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pl-4 pr-28 py-3.5 bg-slate-900/90 border border-slate-700/80 rounded-2xl text-sm text-white placeholder-slate-400 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition"
                    />
                    <button
                      type="submit"
                      className="absolute right-1.5 px-4 py-2 text-xs font-semibold bg-gradient-to-r from-orange-500 to-rose-500 hover:from-orange-600 hover:to-rose-600 rounded-xl text-white shadow-md transition-all"
                    >
                      Search
                    </button>
                  </form>

                  {/* Action Buttons */}
                  <div className="flex flex-wrap items-center gap-4 pt-2">
                    <Motion.button
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={() => navigate("/food")}
                      className="px-6 py-3.5 bg-gradient-to-r from-orange-500 via-rose-500 to-amber-500 hover:opacity-95 text-white font-bold rounded-2xl shadow-lg shadow-orange-500/25 text-sm transition"
                    >
                      Explore Food Menu
                    </Motion.button>
                    <Motion.button
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={() => navigate("/cocktails")}
                      className="px-6 py-3.5 bg-slate-800/80 hover:bg-slate-800 text-slate-200 border border-slate-700/80 font-semibold rounded-2xl text-sm transition"
                    >
                      Cocktail Lounge 🍸
                    </Motion.button>
                  </div>
                </Motion.div>

                {/* Hero Right Featured Card */}
                {featuredMeal && (
                  <Motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="lg:col-span-5 flex justify-center"
                  >
                    <div className="relative group w-full max-w-sm">
                      <div className="absolute -inset-1 bg-gradient-to-r from-orange-500 to-rose-500 rounded-3xl blur-lg opacity-40 group-hover:opacity-75 transition duration-500" />
                      <div className="relative bg-slate-900 border border-slate-800 rounded-3xl p-5 shadow-2xl text-center space-y-4">
                        <div className="relative overflow-hidden rounded-2xl aspect-square">
                          <Motion.img
                            src={featuredMeal.strMealThumb}
                            alt={featuredMeal.strMeal}
                            whileHover={{ scale: 1.05 }}
                            transition={{ duration: 0.4 }}
                            className="w-full h-full object-cover"
                          />
                          <span className="absolute top-3 left-3 px-3 py-1 bg-slate-950/80 backdrop-blur-md rounded-full text-xs font-semibold text-orange-400 border border-slate-800">
                            Chef Special ✨
                          </span>
                        </div>

                        <div>
                          <h3 className="text-xl font-bold text-white group-hover:text-orange-400 transition-colors line-clamp-1">
                            {featuredMeal.strMeal}
                          </h3>
                          <p className="text-xs text-slate-400 mt-1">
                            {featuredMeal.strArea || "International"} • {featuredMeal.strCategory || "Gourmet"}
                          </p>
                        </div>

                        <button
                          onClick={() => navigate(`/food/${featuredMeal.idMeal}`)}
                          className="w-full py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white font-semibold text-xs rounded-xl border border-slate-700 transition"
                        >
                          View Recipe & Details →
                        </button>
                      </div>
                    </div>
                  </Motion.div>
                )}
              </div>
            </section>

            {/* CATEGORIES / MOOD SECTION */}
            <section className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2">
                <div>
                  <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
                    Explore by Category
                  </h2>
                  <p className="text-xs sm:text-sm text-white mt-1">
                    Find dish options matched to whatever craving you have today
                  </p>
                </div>
                <button
                  onClick={() => navigate("/food")}
                  className="text-xs text-orange-400 hover:text-orange-300 font-semibold transition"
                >
                  View All Categories →
                </button>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3 sm:gap-4">
                {categories.map((cat, idx) => (
                  <Motion.div
                    key={cat.idCategory}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: idx * 0.05 }}
                    whileHover={{ y: -4, scale: 1.02 }}
                    onClick={() => navigate("/food")}
                    className="cursor-pointer bg-slate-900/90 border border-slate-800/80 hover:border-orange-500/50 p-3 rounded-2xl flex flex-col items-center text-center space-y-2 group shadow-md transition"
                  >
                    <div className="w-12 h-12 rounded-full overflow-hidden bg-slate-800 p-1">
                      <img
                        src={cat.strCategoryThumb}
                        alt={cat.strCategory}
                        className="w-full h-full object-cover rounded-full group-hover:scale-110 transition duration-300"
                      />
                    </div>
                    <span className="text-xs font-semibold text-slate-300 group-hover:text-orange-400 transition line-clamp-1">
                      {cat.strCategory}
                    </span>
                  </Motion.div>
                ))}
              </div>
            </section>

            {/* FEATURED PAIRING SPOTLIGHT */}
            <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Featured Food Card */}
              <div className="bg-gradient-to-br from-slate-900 via-slate-900 to-amber-950/40 border border-slate-800 rounded-3xl p-6 flex flex-col sm:flex-row gap-6 items-center shadow-xl">
                {featuredMeal && (
                  <>
                    <img
                      src={featuredMeal.strMealThumb}
                      alt={featuredMeal.strMeal}
                      className="w-32 h-32 sm:w-40 sm:h-40 rounded-2xl object-cover shadow-md flex-shrink-0"
                    />
                    <div className="space-y-3 text-center sm:text-left">
                      <span className="px-2.5 py-1 bg-orange-500/10 text-orange-400 border border-orange-500/20 rounded-full text-[10px] font-bold uppercase tracking-wider">
                        Trending Food
                      </span>
                      <h3 className="text-xl font-bold text-white line-clamp-1">
                        {featuredMeal.strMeal}
                      </h3>
                      <p className="text-xs text-slate-400 line-clamp-2">
                        Savory flavors crafted with fresh ingredients. Click below to inspect the full recipe instructions and ingredients.
                      </p>
                      <button
                        onClick={() => navigate(`/food/${featuredMeal.idMeal}`)}
                        className="inline-block px-4 py-2 text-xs font-semibold bg-orange-500 hover:bg-orange-600 text-white rounded-xl transition shadow-md"
                      >
                        Cook This Recipe
                      </button>
                    </div>
                  </>
                )}
              </div>

              {/* Featured Cocktail Card */}
              <div className="bg-gradient-to-br from-slate-900 via-slate-900 to-rose-950/40 border border-slate-800 rounded-3xl p-6 flex flex-col sm:flex-row gap-6 items-center shadow-xl">
                {featuredCocktail && (
                  <>
                    <img
                      src={featuredCocktail.strDrinkThumb}
                      alt={featuredCocktail.strDrink}
                      className="w-32 h-32 sm:w-40 sm:h-40 rounded-2xl object-cover shadow-md flex-shrink-0"
                    />
                    <div className="space-y-3 text-center sm:text-left">
                      <span className="px-2.5 py-1 bg-rose-500/10 text-rose-400 border border-rose-500/20 rounded-full text-[10px] font-bold uppercase tracking-wider">
                        Cocktail Highlight 🍸
                      </span>
                      <h3 className="text-xl font-bold text-white line-clamp-1">
                        {featuredCocktail.strDrink}
                      </h3>
                      <p className="text-xs text-slate-400 line-clamp-2">
                        Refresh your senses with our mixologist's signature cocktail recommendation of the day.
                      </p>
                      <button
                        onClick={() => navigate(`/cocktails/${featuredCocktail.idDrink}`)}
                        className="inline-block px-4 py-2 text-xs font-semibold bg-rose-500 hover:bg-rose-600 text-white rounded-xl transition shadow-md"
                      >
                        Explore Cocktail
                      </button>
                    </div>
                  </>
                )}
              </div>
            </section>

            {/* WHY CHOOSE US GRID */}
            <section className="space-y-6 pt-4">
              <div className="text-center max-w-xl mx-auto space-y-2">
                <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
                  Why Food Mood?
                </h2>
                <p className="text-xs sm:text-sm text-slate-400">
                  Everything you need to turn everyday meals into memorable dining experiences.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                  {
                    icon: "🍲",
                    title: "10,000+ Recipes",
                    desc: "Curated worldwide dishes with detailed step-by-step guides.",
                  },
                  {
                    icon: "🍸",
                    title: "Cocktail Pairings",
                    desc: "Find the ideal drink match for your meal effortlessly.",
                  },
                  {
                    icon: "⚡",
                    title: "Fast & Convenient",
                    desc: "Easy ingredients search and quick-prep meal suggestions.",
                  },
                  {
                    icon: "🛒",
                    title: "Save & Order",
                    desc: "Save meals for later or order directly with a few clicks.",
                  },
                ].map((feature, idx) => (
                  <Motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: idx * 0.1 }}
                    className="bg-slate-900/80 border border-slate-800 p-6 rounded-2xl space-y-3 hover:border-slate-700 transition"
                  >
                    <div className="text-3xl p-3 bg-slate-800/80 rounded-2xl w-fit">
                      {feature.icon}
                    </div>
                    <h3 className="text-base font-bold text-white">{feature.title}</h3>
                    <p className="text-xs text-slate-400 leading-relaxed">{feature.desc}</p>
                  </Motion.div>
                ))}
              </div>
            </section>

            {/* CALL TO ACTION BANNER */}
            <section className="rounded-3xl bg-gradient-to-r from-orange-600 via-rose-600 to-amber-600 p-8 md:p-12 text-center text-white space-y-6 shadow-2xl relative overflow-hidden">
              <div className="max-w-2xl mx-auto space-y-4">
                <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
                  Ready to Satisfy Your Cravings?
                </h2>
                <p className="text-sm sm:text-base text-orange-100">
                  Browse our full collection of delicious recipes, order fresh ingredients, or explore signature drinks right now.
                </p>
                <div className="flex flex-wrap justify-center gap-4 pt-2">
                  <button
                    onClick={() => navigate("/food")}
                    className="px-6 py-3 bg-slate-950 hover:bg-slate-900 text-white font-bold text-sm rounded-2xl shadow-lg transition"
                  >
                    Browse Food Menu
                  </button>
                  <button
                    onClick={() => navigate("/Subscription")}
                    className="px-6 py-3 bg-white/20 hover:bg-white/30 backdrop-blur-md text-white font-bold text-sm rounded-2xl border border-white/30 transition"
                  >
                    Join Subscription
                  </button>
                </div>
              </div>
            </section>
          </>
        )}
      </div>
    </div>
  );
}

export default NewHomePage;
