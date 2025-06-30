import React from "react";
import { useState, useEffect, useRef } from "react";

function PaypalButton() {
  const [total, setTotal] = useState(0);
  const paypalRef = useRef();
  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    if (cart.length > 0) {
      const totalAmount = cart.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
      );
      setTotal(totalAmount);
    }
  }, []);
  const loadPayPalScript = () => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src =
        "https://www.paypal.com/sdk/js?client-id=AW7dSjVcOmfq4TQa-yPuG92LnzxJTgVqlOleBj2dyAXMXa78ldTlkqIj1ywHWgvWOHIygGK5x6Qr7q2v&currency=USD";
      script.addEventListener("load", resolve);
      document.body.appendChild(script);
    });
  };

  useEffect(() => {
    const loadPayPal = async () => {
      await loadPayPalScript();
      if (window.paypal && paypalRef.current) {
        window.paypal
          .Buttons({
            createOrder: (data, actions) => {
              return actions.order.create({
                purchase_units: [
                  {
                    amount: {
                      value: (total + 5).toFixed(2),
                      currency_code: "USD",
                    },
                  },
                ],
              });
            },
            onApprove: async (data, actions) => {
              const order = await actions.order.capture();
              console.log("Order approved:", order);
              alert(`Transaction completed by ${order.payer.name.given_name}`);
              localStorage.removeItem("cart");
              localStorage.removeItem("checkoutCart");
              localStorage.removeItem("totalAmount");
              // Optionally redirect
              // window.location.href = "/thank-you";
            },
            onError: (err) => {
              console.error("PayPal Button Error:", err);
              alert("An error occurred while processing your payment.");
            },
          })
          .render(paypalRef.current);
      } else {
        console.warn("PayPal SDK not loaded");
      }
    };

    loadPayPal();
  }, [total]);

  return (
    <>
      <div
        ref={paypalRef}
        className="w-2/4 bg-blue-400 h-screen flex items-center justify-center"
      ></div>
    </>
  );
}

export default PaypalButton;
