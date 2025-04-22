import React from "react";

function Foods() {
  return (
    <>
      <div>
        <div className="grid grid-cols-2 xm:grid-cols-3 sm:grid-cols-3 md:grid-cols-3 xp:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 mt-6 px-5">
          <div>
            <img src="" alt="" srcset="" />
            <h1 className="text-2xl font-bold">all</h1>
          </div>
          <div>
            <img src="" alt="" srcset="" />
            <h1 className="text-2xl font-bold">Breakfast</h1>{" "}
          </div>
          <div>
            <img src="" alt="" srcset="" />
            <h1 className="text-2xl font-bold">soup</h1>{" "}
          </div>
          <div>
            {" "}
            <img src="" alt="" srcset="" />
            <h1 className="text-2xl font-bold">pasta</h1>
          </div>
          <div>
            <img src="" alt="" srcset="" />
            <h1 className="text-2xl font-bold">pizza</h1>
          </div>
          <div>
            <img src="" alt="" srcset="" />
            <h1 className="text-2xl font-bold">burger</h1>
          </div>
          <div>
            <img src="" alt="" srcset="" />
            <h1 className="text-2xl font-bold">main_course</h1>
          </div>
        </div>
      </div>
    </>
  );
}

export default Foods;
