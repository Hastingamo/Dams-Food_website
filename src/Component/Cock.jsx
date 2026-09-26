import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

function Cock() {
  const [cockTail, setCockTail] = useState([]);

  useEffect(() => {
    const fetchCocktail = async () => {
      try {
        const response = await fetch(
          "https://www.thecocktaildb.com/api/json/v1/1/search.php?f=a"
        );
        const data = await response.json();
        setCockTail(data.drinks || []);
      } catch (error) {
        console.error("Error fetching cocktail:", error);
      }
    };

    fetchCocktail();
  }, []);

  const uniqueCategories = [
    ...new Set(cockTail.map((cocktail) => cocktail.strCategory)),
  ];

  return (
    <div className="px-5">
      {/* Category Heading */}
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="ml-14 text-2xl font-bold mt-8"
      >
        Category
      </motion.h1>

      {/* Category Cards */}
      <div className="ml-14 xp:ml-20 grid grid-cols-2 xm:grid-cols-3 sm:grid-cols-3 md:grid-cols-3 xp:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-14 mt-6">
        {uniqueCategories.map((category) => {
          const representative = cockTail.find(
            (cocktail) => cocktail.strCategory === category
          );
          return (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
              key={category}
              className="shadow-lg flex flex-col items-center gap-3 p-5 bg-[#FAEBD7] rounded-lg"
            >
              <img
                src={representative?.strDrinkThumb}
                className="w-20 h-20 object-cover rounded-full"
                alt={category}
              />
              <h1 className="text-xl font-semibold text-center">{category}</h1>
            </motion.div>
          );
        })}
      </div>

      {/* Full Cocktail List Heading */}
      <h2 className="ml-14 text-2xl font-bold mt-16">Cocktail List</h2>

      {/* Full cocktail list */}
      <div className="ml-14 xp:ml-20 grid grid-cols-2 xm:grid-cols-3 sm:grid-cols-3 md:grid-cols-3 xp:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 mt-6">
        {cockTail.length > 0 ? (
          cockTail.map((cocktail) => (
            <div
              key={cocktail.idDrink}
              className="bg-[#FAEBD7] rounded-lg shadow-md overflow-hidden"
            >
              <img
                src={cocktail.strDrinkThumb}
                alt={cocktail.strDrink}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h2 className="text-xl font-semibold">{cocktail.strDrink}</h2>
                <p className="text-gray-500">
                  {cocktail.strCategory} - {cocktail.strAlcoholic}
                </p>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-600 col-span-full">
            No cocktails found.
          </p>
        )}
      </div>
    </div>
  );
}

export default Cock;
