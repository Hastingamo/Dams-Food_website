import React, { useState, useEffect} from "react";
import { MoonLoader } from "react-spinners";
import Sidebars from "../Component/Sidebars";
import PaypalButton from "../Component/PaypalButton";


function CheckOut() {
  const [loading, setLoading] = useState(true);
  const [total, setTotal] = useState(0);
  

  // Load total from localStorage and simulate a short loading screen
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000); // You can reduce this to 500ms or remove it

    const storedTotal = localStorage.getItem("totalAmount");
    if (storedTotal) {
      setTotal(parseFloat(storedTotal)); // Convert from string to float
    }

    return () => clearTimeout(timer); // Clean up timer
  }, []);



  return (
    <div className="flex flex-col min-h-screen  bg-[#C88D84]">
      <Sidebars />
      {loading ? (
        <div className="flex items-center justify-center h-screen">
          <MoonLoader color="black" size={100} />
        </div>
      ) : (
        <div>
          <h1 className="text-2xl font-bold ml-[80px]">Checkout Page</h1>
          <div className="flex flex-row bg-pink-200 h-screen ml-[80px]">
            <div className="w-2/4">
              <p className="text-lg">Order Summary</p>
              <p>Total price: ${total.toFixed(2)}</p>
              <p>Shipping fee: $5.00</p>
              <hr className="my-2" />
              <p className="text-lg font-bold">
                Total: ${(total + 5).toFixed(2)}
              </p>
              <p className="text-lg font-bold">Thank you for your order!</p>
            </div>
            <div className="w-2/4 bg-blue-400 h-screen flex items-center justify-center">
                  {/* <h1>buy now </h1> */}
              <PaypalButton/>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default CheckOut;
