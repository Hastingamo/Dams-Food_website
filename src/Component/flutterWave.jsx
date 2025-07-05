import React from 'react'
import { FlutterWaveButton, closePaymentModal } from 'flutterwave-react-v3';
import { useEffect, useState } from 'react';
import FireBaseUser from './FireBaseUser';
function FlutterWave() {
  const user = FireBaseUser();
  const [total, setTotal] = useState(0);
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
     const config = {
    public_key: 'FLWPUBK_TEST-591f4111d5e295abc6ad7a6028080b3c-X',
    tx_ref: Date.now(),
    currency: 'NGN',
    amount: (total + 5),
    payment_options: 'card,mobilemoney,ussd',
    customer: {
     email: user?.email || 'default@example.com',
      name: user?.userName || 'Default User',
    },
    customizations: {
      title: 'My store',
      description: 'Payment for items in cart',
      logo: 'https://st2.depositphotos.com/4403291/7418/v/450/depositphotos_74189661-stock-illustration-online-shop-log.jpg',
    },
  };

  const fwConfig = {
    ...config,
    text: 'Pay with Flutterwave!',
    callback: (response) => {
       console.log(response);
      closePaymentModal() // this will close the modal programmatically
    },
    onClose: () => {},
  };

  return (
    <div>
      <FlutterWaveButton {...fwConfig} />
    </div>
  )
}

export default FlutterWave