import React from "react";
import Sidebars from "./Component/Sidebars";

const DetailLayout = ({ image, title, description, details, children }) => {
  return (
    <div className="flex flex-row md:flex-row gap-8 md:p-5  min-h-screen">
      {/* {" "}<Sidebars /> */}
      <div className="flex flex-col md:flex-row p-5 gap-8 bg-[#c88d84] w-screen">
        <div className="flex-1 flex justify-center items-center md:hidden">
          <img
            src={image}
            alt={title}
            className="w-full max-w-sm rounded-xl object-cover shadow-lg"
          />
        </div>
        <div className="hidden md:flex-1 md:flex md:justify-center md:items-center">
          <img
            src={image}
            alt={title}
            className="w-full max-w-md rounded-xl object-cover shadow-lg"
          />
        </div>

        <div className="flex-1 flex flex-col gap-4 shadow-lg rounded-3xl bg-[#e4c2bd] px-10 pt-3 md:hidden">
          <h1 className="text-2xl font-bold">{title}</h1>
          <p className="text-gray-600">{description}</p>



          <div className="mt-4">{children}</div>
        </div>
        
        <div className="hidden md:flex-1 md:flex md:flex-col md:gap-4 ">
          <h1 className="text-2xl font-bold">{title}</h1>
          <p className="text-gray-600">{description}</p>



          <div className="mt-4">{children}</div>
        </div>
      </div>
    </div>
  );
};

export default DetailLayout