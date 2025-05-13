import React, { useState, useEffect } from "react";
import Sidebars from "../Component/Sidebars";
import { MoonLoader } from "react-spinners";

function Home() {
  const [loading, setLoading] = useState(true);
  const [image, setImage] = useState([]);
  const [featuredImage, setFeaturedImage] = useState(null);

  useEffect(() => {
    // Fetching data from the API
    fetch("https://www.themealdb.com/api/json/v1/1/search.php?s=")
      .then((response) => response.json())
      .then((data) => {
        if (data.meals) {
          setImage(data.meals);

          // Pick a random image from the array
          const randomImage = data.meals[Math.floor(Math.random() * data.meals.length)];
          setFeaturedImage(randomImage);
        }
      })
      .catch((error) => console.error("Error fetching data:", error));

    // Timeout for loader simulation
    const timer = setTimeout(() => {
      setLoading(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="flex flex-row items-center justify-center h-screen bg-gray-100">
      <Sidebars />
      {loading ? (
        <div className="flex justify-center items-center h-screen w-screen">
          <MoonLoader color="black" size={100} />
        </div>
      ) : (
        <>
          <div className="flex flex-row w-full h-full">
            {/* Left Section */}
            <div className="w-2/3 ml-[5rem] bg-blue-200 pl-8 pt-6">
              <div className="shadow-2xl h-full pt-10 gap-3">
                <h1 className="text-6xl md:text-8xl font-bold ml-4 text-white w-fit">
                  Food{" "}
                </h1>
                <p className="text-white ml-4">is your good </p>
                <h1 className="text-6xl md:text-8xl font-bold ml-4 text-white w-fit">
                  Mood
                </h1>
                <div className="mt-14 w-fit shadow-md ml-10 ">
                  <h1 className="text-2xl font-bold text-white">
                    Welcome to Food Mood
                  </h1>
                  <p className="text-gray-600">
                    This is a simple food mood application.
                  </p>
                </div>
              </div>
            </div>

            {/* Right Section */}
            <div className="w-1/3 bg-pink-200 pt-6 pr-8">
              <div className="pl-10 shadow-2xl h-full flex justify-center items-center">
                {featuredImage ? (
                  <div
                    key={featuredImage.idMeal}
                    className="flex flex-col -ml-[40rem] items-center"
                  >
                    <img
                      src={featuredImage.strMealThumb}
                      alt={featuredImage.strMeal}
                      className="w-[20rem] h-auto rounded-lg shadow-lg mt-4"
                    />
                    <h2 className="text-xl font-bold mt-2">
                      {featuredImage.strMeal}
                    </h2>
                  </div>
                ) : (
                  <p>No Image Available</p>
                )}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default Home;
