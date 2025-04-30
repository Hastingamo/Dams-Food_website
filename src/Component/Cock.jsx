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


  // Compute unique categories from cocktail data

  return (
    <div className="">
      {/* Category cards */}
      <motion.h1
          initial={{ opacity: 10, y: 20 }}
          whileHover={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex ml-[62px] text-2xl"
       >
        Category
      </motion.h1>
      <div className="ml-14 xp:ml-20 xs:w-[22rem] grid grid-cols-2 xm:grid-cols-3 sm:grid-cols-3 md:grid-cols-3 xp:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-14 mt-6 px-5">
        {uniqueCategories.map((category) => {
          const representative = cockTail.find(
            (cocktail) => cocktail.strCategory === category
          );
          return (
            <motion.div
            initial={{ opacity: 10, y: 20 }}
            whileHover={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
              key={category}
              className="shadow-lg  justify-center items-center flex flex-col gap-3 p-5 bg-[#FAEBD7] rounded-lg"
            >
              <img
                src={representative?.strDrinkThumb}
                className="w-20 h-20 object-cover rounded-full"
                alt={category}
              />
              <h1 className="text-2xl font-bold">{category}</h1>
            </motion.div>
          );
        })}
      </div>

      {/* Full cocktail list */}
      <div className="ml-14 xp:ml-20 grid grid-cols-2 xm:grid-cols-3 sm:grid-cols-3 md:grid-cols-3 xp:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 mt-16 px-5">
        {/* {cockTail.length > 0 ? (
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
        )} */}
      </div>
    </div>
  );
}

export default Cock;
