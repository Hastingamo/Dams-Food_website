import React, { useEffect, useState } from "react";
import Sidebars from "../Component/Sidebars.jsx";
import Cock from "../Component/Cock.jsx";
import { motion } from "framer-motion";
import { MoonLoader } from "react-spinners";
import { Link } from "react-router";

function CockTailss() {
  const [loading, setLoading] = useState(true);
  const [drinks, setDrinks] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [error, setError] = useState(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
      fetchCategories();
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  const fetchCategories = async () => {
    try {
      const res = await fetch(
        "https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list"
      );
      const data = await res.json();
      if (data.drinks) {
        setCategories(data.drinks);
        const defaultCategory = data.drinks[0].strCategory;
        setSelectedCategory(defaultCategory);
        filterByCategory(defaultCategory);
      }
    } catch (err) {
      console.error("Error fetching cocktail categories:", err);
    }
  };

  const searchCocktails = async (query) => {
    try {
      const res = await fetch(
        `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${query}`
      );
      const data = await res.json();
      if (data.drinks) {
        setDrinks(data.drinks);
        setError(null);
      } else {
        setDrinks([]);
        setError("No cocktails found.");
      }
    } catch (err) {
      console.error("Error searching cocktails:", err);
      setError("An error occurred while fetching cocktails.");
    } finally {
      setLoading(false);
    }
  };

  const filterByCategory = async (category) => {
    setLoading(true);
    setSearchTerm("");
    setSelectedCategory(category);
    try {
      const res = await fetch(
        `https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${category}`
      );
      const data = await res.json();
      if (data.drinks) {
        setDrinks(data.drinks);
        setError(null);
      } else {
        setDrinks([]);
        setError("No cocktails found in this category.");
      }
    } catch (err) {
      console.error("Error filtering by cocktail category:", err);
      setError("An error occurred while fetching cocktails.");
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    setSelectedCategory("");
    if (value.trim() !== "") {
      searchCocktails(value);
    } else {
      setDrinks([]);
      setError(null);
    }
  };
  return (
    <>
      <div className="flex flex-row items-center bg-[#C88D84] justify-center">
        <div>
          <Sidebars />
        </div>
        {loading ? (
          <div className="flex justify-center items-center h-screen w-screen">
            <MoonLoader color="black" size={100} />
          </div>
        ) : (
          <div className="w-full min-h-screen flex flex-row bg-[#C88D84] justify-center ml-[36px] pt-10 px-4">
            <div>
              <Sidebars />
            </div>
            <div className="flex flex-col items-center w-full px-4">
              <h1 className="text-3xl font-bold mb-4">Cocktails</h1>

              <input
                type="text"
                value={searchTerm}
                onChange={handleInputChange}
                placeholder="Search cocktails..."
                className="border p-2 ml-11 mr11 rounded w-full max-w-md mb-4"
              />

              <div className="flex flex-wrap ml-11 gap-2 mb-4 justify-center">
                {categories.map((cat, index) => (
                  <motion.button
                    key={index}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: index * 0.05 }}
                    className={`px-3 py-1 rounded border ${
                      selectedCategory === cat.strCategory
                        ? "bg-black text-white"
                        : "bg-gradient-to-bl from-[#8e5047] to-fuchsia-50 text-black"
                    }`}
                    onClick={() => filterByCategory(cat.strCategory)}
                  >
                    <img   src={`https://source.unsplash.com/20x20/?cocktail,${cat.strCategory}`} alt={cat.categories} className="w-4 h-4" srcset="" />
                    {cat.strCategory}
                  </motion.button>
                ))}
              </div>

              {error && <p className="text-red-600">{error}</p>}

              <div className="grid ml-8  xs:ml-11 grid-cols-2 xm:grid-cols-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 mt-6 px-1 md:px-5">
                {drinks.map((drink, index) => (
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    whileHover={{
                      scale: 1.05,
                      shadow: "0 4px 20px rgba(0, 0, 0, 0.2)",
                      duration: 0.1,
                    }}
                    key={drink.idDrink}
                    transition={{ duration: 1, delay: index * 0.05 }}
                    className="bg-gradient-to-bl from-[#8e5047] to-fuchsia-50 rounded-lg shadow-md hover:shadow-lg transition"
                  > 
                    <Link to={`/cocktails/${drink.idDrink}`}>
                    <img
                      src={drink.strDrinkThumb}
                      alt={drink.strDrink}
                      className="rounded object-cover mb-2"
                    />
                    <h2 className="text-xl font-semibold flex justify-center text-center pb-5">
                      {drink.strDrink}
                    </h2>
                    </Link>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default CockTailss;
