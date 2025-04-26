import React from "react";
import { useState, useEffect } from "react";
function Foods() {
  const [meals, setMeals] = useState([]); // Step 1

  useEffect(() => {
    fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=') // Step 2
      .then(response => response.json()) // Step 3
      .then(data => setMeals(data.meals)) // Step 4
      .catch(error => console.error('Error fetching data:', error)); // Step 5
  }, []);
  return (
    <>
      <div className="">
        <div className="ml-14 xp:ml-20 xs:w-[22rem] grid grid-cols-2 xm:grid-cols-3 sm:grid-cols-3 md:grid-cols-3 xp:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 mt-6 px-5">
          <div className="shadow-lg  justify-center items-center flex flex-col gap-3 p-5 bg-white rounded-lg">
            <img src="Images/all.png"  className="w-5 h-6" alt="" srcset="" />
            <h1 className="text-2xl font-bold">all</h1>
          </div>
          <div className="shadow-lg  justify-center items-center flex flex-col gap-3 p-5 bg-white rounded-lg">
            <img src="Images/breakfasts.png" className="w-5 h-6" alt="" srcset="" />
            <h1 className="text-2xl font-bold">Breakfast</h1>{" "}
          </div>
          <div className="shadow-lg  justify-center items-center flex flex-col gap-3 p-5 bg-white rounded-lg">
            <img src="Images/soups.png" className="w-5 h-6" alt="" srcset="" />
            <h1 className="text-2xl font-bold">soup</h1>{" "}
          </div>
          <div className="shadow-lg  justify-center items-center flex flex-col gap-3 p-5 bg-white rounded-lg">
            {" "}
            <img src="Images/spaghettis.png" className="w-5 h-6" alt="" srcset="" />
            <h1 className="text-2xl font-bold">pasta</h1>
          </div>
          <div className="shadow-lg  justify-center items-center flex flex-col gap-3 p-5 bg-white rounded-lg">
            <img src="Images/pizzas.png" className="w-5 h-6" alt="" srcset="" />
            <h1 className="text-2xl font-bold">pizza</h1>
          </div>
          <div className="shadow-lg  justify-center items-center flex flex-col gap-3 p-5 bg-white rounded-lg">
            <img src="Images/burger.png" className="w-5 h-6" alt="" srcset="" />
            <h1 className="text-2xl font-bold">burger</h1>
          </div>
          <div className="shadow-lg w-[16rem]  justify-center items-center flex flex-col gap-3 p-5 bg-white rounded-lg">
            <img src="" alt="" srcset="" />
            <h1 className="text-2xl font-bold">main_course</h1>
          </div>
        </div>
      </div>
      <div className="ml-14 xp:ml-20 grid grid-cols-2 xp:grid-col-3 xm:grid-cols-3 sm:grid-cols-3 md:grid-cols-3 xp:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 mt-15 px-5">
      {meals?.map(meal => (  // Step 9
          <div key={meal.idMeal} className="bg-white rounded-lg shadow-md overflow-hidden"> {/* Step 10 */}
            <img src={meal.strMealThumb} alt={meal.strMeal} className="w-full h-48 object-cover" /> {/* Step 11 */}
            <div className="p-4">
              <h2 className="text-xl font-semibold">{meal.strMeal}</h2> {/* Step 12 */}
              <p className="text-gray-600">{meal.strArea} - {meal.strCategory}</p> {/* Step 13 */}
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default Foods;
