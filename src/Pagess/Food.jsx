import React from "react";
import Sidebars from "../Component/Sidebars.jsx";
import Foods from "../Component/Foods.jsx";
function Food() {
  return (
    <>
      <div className="flex flex-row items-center justify-center overflow-x-hidden  ">
        <div>
          <Sidebars />
        </div>
        <div className="flex flex-col items-center justify-center  bg-white rounded-lg  p-8">
          <h1 className="text-3xl font-bold mb-4">Food</h1>
          <input
            placeholder="search"
            className="border-black border-solid border rounded p-1 text-black xm:text-2xl md:text-2xl md:p-2"
          ></input>
          <Foods />
          <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
            Click Me
          </button>
        </div>
      </div>
    </>
  );
}

export default Food;
