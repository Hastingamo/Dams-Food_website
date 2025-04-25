import React from "react";

function Foods() {
  return (
    <>
      <div className="">
        <div className=" ml-20 w-[20rem] grid grid-cols-2 xm:grid-cols-3 sm:grid-cols-3 md:grid-cols-3 xp:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-6 mt-6 px-5">
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
          <div className="shadow-lg  justify-center items-center flex flex-col gap-3 p-5 bg-white rounded-lg">
            <img src="" alt="" srcset="" />
            <h1 className="text-2xl font-bold">main_course</h1>
          </div>
        </div>
      </div>
    </>
  );
}

export default Foods;
