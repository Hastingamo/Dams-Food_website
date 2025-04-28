import React from "react";
import { useState, useEffect } from "react";
function Cock() {
  const [cockTail, setCockTail] = useState([]);
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
  useEffect(() => {
    fetchCocktail();
  }, []);
  return (
    <>
      <div className="">
        <div className="ml-14 xp:ml-20 xs:w-[22rem] grid grid-cols-2 xm:grid-cols-3 sm:grid-cols-3 md:grid-cols-3 xp:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 mt-6 px-5">
          <div className="shadow-lg  justify-center items-center flex flex-col gap-3 p-5 bg-[#FAEBD7] rounded-lg">
            <img src="Images/all.png" className="w-5 h-6" alt="" srcset="" />
            <h1 className="text-2xl font-bold">all</h1>
          </div>
          <div className="shadow-lg  justify-center items-center flex flex-col gap-3 p-5 bg-[#FAEBD7] rounded-lg">
            <img
              src="Images/breakfasts.png"
              className="w-5 h-6"
              alt=""
              srcset=""
            />
            <h1 className="text-2xl font-bold">Breakfast</h1>{" "}
          </div>
          <div className="shadow-lg  justify-center items-center flex flex-col gap-3 p-5 bg-[#FAEBD7] rounded-lg">
            <img src="Images/soups.png" className="w-5 h-6" alt="" srcset="" />
            <h1 className="text-2xl font-bold">soup</h1>{" "}
          </div>
          <div className="shadow-lg  justify-center items-center flex flex-col gap-3 p-5 bg-[#FAEBD7] rounded-lg">
            {" "}
            <img
              src="Images/spaghettis.png"
              className="w-5 h-6"
              alt=""
              srcset=""
            />
            <h1 className="text-2xl font-bold">pasta</h1>
          </div>
          <div className="shadow-lg  justify-center items-center flex flex-col gap-3 p-5 bg-[#FAEBD7] rounded-lg">
            <img src="Images/pizzas.png" className="w-5 h-6" alt="" srcset="" />
            <h1 className="text-2xl font-bold">pizza</h1>
          </div>
          <div className="shadow-lg  justify-center items-center flex flex-col gap-3 p-5 bg-[#FAEBD7] rounded-lg">
            <img src="Images/burger.png" className="w-5 h-6" alt="" srcset="" />
            <h1 className="text-2xl font-bold">burger</h1>
          </div>
          <div className="shadow-lg w-[16rem]  justify-center items-center flex flex-col gap-3 p-5 bg-white rounded-lg">
            <img src="" alt="" srcset="" />
            <h1 className="text-2xl font-bold">main_course</h1>
          </div>
        </div>
        <div className="ml-14 xp:ml-20 grid grid-cols-2 xp:grid-col-3 xm:grid-cols-3 sm:grid-cols-3 md:grid-cols-3 xp:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 mt-[6rem] px-5">
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
    </>
  );
}

export default Cock;
