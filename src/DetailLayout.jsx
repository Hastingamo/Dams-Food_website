import React from "react";
const DetailLayout = ({
  image,
  title,
  description,
  price,
  rating,
  calories,
  children,
  time,
}) => {
  return (
    <div className="flex flex-row min-h-screen">
      {/* Sidebar */}

      {/* Main Content */}
      <div className="flex flex-col md:flex-row p-5 gap-8 bg-[#f9f9f9] rounded-xl  flex-1">
        {/* Tablet View */}
        <div className="hidden md:flex w-full gap-8">
          {/* Left Section - Description and Details */}
          <div className="flex-1 p-8  bg-blue-300 rounded-xl shadow-md">
            <h1 className="text-2xl font-bold mt-20">{title}</h1>
            <p className="text-gray-600">{description}</p>

            <div className="mt-4">{children}</div>
          </div>


          {/* Right Section - Image Display */}
          <div className="flex-1 flex justify-center items-start ">
            <img
              src={image}
              alt={title}
              className="w-96 h-96 object-cover flex  shadow-lg"
            />
          </div>
        </div>

        {/* Mobile View */}
        <div className="md:hidden flex flex-col items-center bg-[#c88d84]">
          <div className="flex-1 flex justify-center items-center md:hidden">
            <img
              src={image}
              alt={title}
              className="w-full max-w-sm rounded-xl  object-cover shadow-lg"
            />
          </div>
          <div className="flex-1 flex flex-col gap-4th rounded-3xl w-full mt-20 bg-[#e4c2bd] px-10 pt-3 md:hidden">
            <h1 className="text-2xl font-bold mt-20">{title}</h1>
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
    </div>
  );
};

export default DetailLayout;
