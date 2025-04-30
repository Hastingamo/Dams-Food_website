import React, { useEffect, useState } from "react";
import MoonLoader from "react-spinners/MoonLoader";
// import Food from "../pagess/Food.jsx";
import Foods from "./Foods.jsx";
import Food from "../pagess/Food.jsx";
function FoodLoading() {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 3000);
  }, []);
  return (
    <>
      {loading ? (
        <div className="fixed top-0 left-0 w-screen h-screen flex justify-center items-center bg-opacity-80 z-50 overflow-x-hidden">
          <MoonLoader color={"black"} loading={loading} size={150} />
        </div>
      ) : (
        <div className="flex justify-center items-center h-screen">
          <div className="flex flex-col items-center justify-center  rounded-lg  pl-8">
            <h1 className="text-3xl font-bold mb-4">Food</h1>
            <input
              placeholder="search"
              className="border-black border-solid border rounded p-1 text-black xm:text-2xl md:text-2xl md:p-2"
            ></input>
            <Food />
          </div>
        </div>
      )}
    </>
  );
}

export default FoodLoading;
