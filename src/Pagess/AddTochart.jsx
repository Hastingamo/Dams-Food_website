import React from "react";
import Sidebars from "../Component/Sidebars";
import { useState, useEffect } from "react";
import DeleteModal from "../Component/DeleteModal";
function AddTochart() {
  const [cart, setCart] = useState([]);
  const [quantity, setQuantity] = useState(1);
  // const [amount, setAmount] = useState(0);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(stored);
  }, []);

  const getTotal = () =>
    cart.reduce((sum, item) => sum + item.quantity * item.price, 0);
  return (
    <>
      <diiv className="flex flex-row min-h-screen">
        <Sidebars />
        <div className="w-screen  bg-[#C88D84] ml-[80px]">
          <div className="pt-8  md:px-[2rem] rounded-lg shadow-lg w-full  ">
            <div className="p-4">
              <h1 className="text-2xl font-bold mb-4">Your Cart</h1>
              {cart.length === 0 ? (
                <p>Your cart is empty.</p>
              ) : (
                <div>
                  {cart.map((item) => (
                    <div
                      key={item.id}
                      className="grid grid-cols-3 items-center mb-4 gap-4 bg-linear-to-bl from-[#8e5047]-700 to-fuchsia-50  p-4"
                    >
                      <img
                        src={item.image}
                        className="w-16 h-16  md:w-28 md:h-28 rounded"
                        alt={item.title}
                      />
                      <div className="md:text-2xl">
                        <h2>{item.title}</h2>
                        <p>${item.price}</p>
                      </div>
                      <div classname=" float float-left">
                        <DeleteModal />
                        {/* <img src="Images/trash.png" alt=""  className="w-4 h-4 ml-[50px]  "/> */}
                        <div className="flex flex-row  gap-4 mt-4">
                          <button
                            className="p-2 border rounded"
                            onClick={() =>
                              setQuantity((prev) => Math.max(1, prev - 1))
                            }
                          >
                            -
                          </button>
                          <p className="mt-2">
                            {item.quantity}
                          </p>
                          <button className="p-2 border rounded">+</button>
                        </div>
                      </div>
                    </div>
                  ))}
                  <h2 className="mt-4 text-xl font-bold">
                    Total: ${getTotal()}
                  </h2>
                </div>
              )}
            </div>
          </div>
        </div>
      </diiv>
    </>
  );
}

export default AddTochart;
