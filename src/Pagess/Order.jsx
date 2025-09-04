import { Sidebar } from 'lucide'
import React from 'react'
import { useState, useEffect } from 'react'
import Sidebars from '../Component/Sidebars'
function Order() {
    const [order, setOrder] = useState([])
      useEffect(() => {
        const stored = JSON.parse(localStorage.getItem("orders")) || [];
        setOrder(stored);
      }, []);
  return (
    <>
        <div className='flex flex-row items-center justify-center min-h-screen bg-[#C88D84]'>
            <Sidebars/>
            <div className='w-full ml-[80px] h-screen'>
                <h1 className='text-2xl font-bold mb-4 text-center'>Order</h1>
                <div className='pt-8 md:px-[2rem] rounded-lg shadow-lg  w-full'>
                    <div className='p-4'>
                        {order.length === 0 ? (
                            <p>Your order list is empty.</p>
                        ) : (
                            <div>
                                {order.map((item) => (
                                    <div key={item.id} className='flex flex-row md:grid md:grid-cols-3 items-center mb-4 gap-4 xl:ml-32 bg-gradient-to-bl from-[#8e5047] to-fuchsia-50 p-4'>
                                        <img src={item.image} alt={item.title} className='w-16 h-16 md:w-28 md:h-28 lg:w-36 lg:h-36 rounded' />
                                        <div className='w-44 ml-4'>
                                            <h2 className='text-lg font-semibold'>{item.title}</h2>
                                            <p className='text-gray-600'>Price: NGN {item.price}</p>
                                            <p className='text-gray-600'>Quantity: {item.quantity}</p>
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
  )
}

export default Order