import React from "react";
import Sidebars from "../Component/Sidebars.jsx";
import Foods from "../Component/Foods.jsx";
import FoodLoading from "../Component/FoodLoading.jsx";
import MoonLoader from "react-spinners/MoonLoader";
function Food() {
  // const [loading, setLoading] = useState(true);
  // useEffect(() => {
  //   setLoading(true);
  //   setTimeout(() => {
  //     setLoading(false);
  //   }, 3000);
  // }, []);
  return (
    <>
      <div className="flex flex-row items-center bg-[#C88D84]  justify-center overflow-x-hidden  ">
        <div>
          <Sidebars />
        </div>
   
          <div className="fixed top-0 left-0 w-screen h-screen flex justify-center items-center bg-opacity-80 z-50 overflow-x-hidden">
          </div>
          <div className="flex justify-center items-center h-screen">
            <div className="flex flex-col items-center justify-center  rounded-lg  pl-8">
              <h1 className="text-3xl font-bold mb-4">Food</h1>
              <input
                placeholder="search"
                className="border-black border-solid border rounded p-1 text-black xm:text-2xl md:text-2xl md:p-2"
              ></input>
              <Foods />
            </div>
          </div>
      </div>
    </>
  );
}

export default Food;
