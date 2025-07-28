import React, { useState, useEffect } from "react";
import Sidebars from "../Component/Sidebars";
import DeleteModal from "../Component/DeleteModal";
import FlutterWave from "../Component/flutterWave";
import Order from "./Order";

function AddTochart() {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(stored);
  }, []);

  const getTotal = () =>
    cart.reduce((sum, item) => sum + item.quantity * item.price, 0);

  const handleCheckout = () => {
    localStorage.setItem("checkoutCart", JSON.stringify(cart));
    localStorage.setItem("totalAmount", getTotal());
    // Move cart items to "orders" in localStorage
  };

  const formatCurrency = (amount) =>
    new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
      minimumFractionDigits: 0,
    }).format(amount);

  const handleDelete = (id) => {
    const updatedCart = cart.filter((item) => item.id !== id);
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };
  const handleSaveForLater = (item) => {
    // Prepare the full item with fallback values
    const safeItem = {
      id: item.id,
      title: item.title || "Unnamed item",
      price: item.price,
      image: item.image,
      quantity: item.quantity,
    };

    const savedItems = JSON.parse(localStorage.getItem("safeItems")) || [];

    // Add the new item to the saved list
    const updatedSaved = [...savedItems, safeItem];
    localStorage.setItem("safeItems", JSON.stringify(updatedSaved));

    // Remove it from the cart
    const updatedCart = cart.filter((c) => c.id !== item.id);
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const handlePaymentSuccess = () => {
    const existingOrders = JSON.parse(localStorage.getItem("orders")) || [];
    const currentCart = JSON.parse(localStorage.getItem("cart")) || [];
    const updatedOrders = [...existingOrders, ...currentCart];
    localStorage.setItem("orders", JSON.stringify(updatedOrders));
    setCart([]);

    localStorage.removeItem("cart");
    localStorage.removeItem("checkoutCart");
    localStorage.removeItem("totalAmount");

    alert("Payment successful! Your order has been placed.");
  };

  return (
    <>
      <div className="flex flex-row min-h-screen">
        <Sidebars />
        <div className="w-screen bg-[#C88D84] ml-[80px]">
          <div className="pt-8 md:px-[2rem] rounded-lg shadow-lg w-full">
            <div className="p-4">
              <h1 className="text-2xl font-bold mb-4 text-center">Your Cart</h1>
              {cart.length === 0 ? (
                <p>Your cart is empty.</p>
              ) : (
                <div>
                  {cart.map((item) => (
                    <div
                      key={item.id}
                      className="grid grid-cols-2 xs:grid-cols-3 items-center mb-4 gap-4 bg-gradient-to-bl from-[#8e5047] to-fuchsia-50 p-4 xl:ml-32"
                    >
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-16 h-16 md:w-28 md:h-28 lg:w-36 lg:h-36 rounded"
                      />
                      <div className="md:text-2xl">
                        <h2>{item.title}</h2>
                        <p>{formatCurrency(item.price)}</p>
                        <div className="flex flex-row xs:hidden gap-3">
                          <div className="mt-8  -ml-5">
                            <DeleteModal
                              onDelete={() => handleDelete(item.id)}
                              onSafeForLater={() => handleSaveForLater(item)}
                            />
                          </div>
                          <div className="flex flex-row gap-4 mt-4">
                            <button
                              className="p-2 border rounded"
                              onClick={() =>
                                setCart((prev) =>
                                  prev.map((cartItem) =>
                                    cartItem.id === item.id
                                      ? {
                                          ...cartItem,
                                          quantity: Math.max(
                                            1,
                                            cartItem.quantity - 1
                                          ),
                                        }
                                      : cartItem
                                  )
                                )
                              }
                            >
                              -
                            </button>
                            <p className="mt-2">{item.quantity}</p>
                            <button
                              className="p-2 border rounded"
                              onClick={() =>
                                setCart((prev) =>
                                  prev.map((cartItem) =>
                                    cartItem.id === item.id
                                      ? {
                                          ...cartItem,
                                          quantity: cartItem.quantity + 1,
                                        }
                                      : cartItem
                                  )
                                )
                              }
                            >
                              +
                            </button>
                          </div>
                        </div>
                      </div>

                      <div className="text-right hidden xs:flex  xs:flex-col">
                        <div className="ml-20 xs:ml-[50px] md:ml-[110px] xl:-mr-[2rem]">
                          <DeleteModal
                            onDelete={() => handleDelete(item.id)}
                            onSafeForLater={() => handleSaveForLater(item)}
                          />
                        </div>
                        <div className="flex flex-row gap-4 mt-4 md:ml-[50px] xl:ml-[170px]">
                          <button
                            className="p-2 border rounded"
                            onClick={() =>
                              setCart((prev) =>
                                prev.map((cartItem) =>
                                  cartItem.id === item.id
                                    ? {
                                        ...cartItem,
                                        quantity: Math.max(
                                          1,
                                          cartItem.quantity - 1
                                        ),
                                      }
                                    : cartItem
                                )
                              )
                            }
                          >
                            -
                          </button>
                          <p className="mt-2">{item.quantity}</p>
                          <button
                            className="p-2 border rounded"
                            onClick={() =>
                              setCart((prev) =>
                                prev.map((cartItem) =>
                                  cartItem.id === item.id
                                    ? {
                                        ...cartItem,
                                        quantity: cartItem.quantity + 1,
                                      }
                                    : cartItem
                                )
                              )
                            }
                          >
                            +
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}

                  <h2 className="mt-4 text-xl font-bold text-center">
                    Total: {formatCurrency(getTotal())}
                  </h2>
                  <button className="mt-4  bg-gradient-to-bl from-[#8e5047] to-fuchsia-50 text-white px-4 py-2 rounded block mx-auto">
                    <FlutterWave
                      onPaymentSuccess={handlePaymentSuccess}
                      onCheckout={handleCheckout}
                    />
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default AddTochart;
