import React from "react";
import Sidebars from "../Component/Sidebars";
import { useState, useEffect } from "react";
function SafeTOLater() {
  const [safeToLater, setSafeToLater] = useState([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("safeItems")) || [];
    setSafeToLater(stored);
  }, []);
  const handleDelete = (id) => {
    const Safe = safeToLater.filter((item) => item.id !== id);
    setSafeToLater(Safe);
    localStorage.setItem("safeItems", JSON.stringify(Safe));
  };
  useEffect(() => {}, []);
  return (
    <>
      <div className="flex flex-row items-center justify-center   bg-[#C88D84]">
        <Sidebars />
        <div className="w-screen  ml-[80px] h-screen">
          <h1 className="text-2xl font-bold mb-4 text-center">Safe To Later</h1>

          <div className="pt-8 md:px-[2rem] rounded-lg shadow-lg w-full ">
            <div className="p-4">
              {safeToLater.length === 0 ? (
                <p>Your safe to later list is empty.</p>
              ) : (
                <div>
                  {safeToLater.map((item) => (
                    <div
                      key={item.id}
                      className="flex flex-row md:grid md:grid-cols-3 md:ml-[4rem] md:w-[30rem] lg:w-[40rem] lg:ml-[5.5rem] xl:ml-[15rem] items-center mb-4 gap-4 bg-gradient-to-bl from-[#8e5047] to-fuchsia-50 p-4"
                    >
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-16 h-16 md:w-28 md:h-28 lg:w-36 lg:h-36 rounded"
                      />
                      <div className="w-44 ml-4">
                        <h2 className="text-lg font-semibold">{item.title}</h2>
                        <p className="text-gray-600">Price: NGN {item.price}</p>
                        <p className="text-gray-600"></p>
                        <div className="flex md:hidden">
                          <img
                            src="Images/trash.png"
                            alt=""
                            className="w-4 h-4 "
                            onClick={() => handleDelete(item.id)}
                          />
                        </div>
                      </div>
                      <div className="hidden  md:flex md:justify-end">
                        <img
                          src="Images/trash.png"
                          alt=""
                          className="w-4 h-4 "
                          onClick={() => handleDelete(item.id)}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default SafeTOLater;
