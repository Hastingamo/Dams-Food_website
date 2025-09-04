import React, { useState, useEffect } from "react";
import Sidebars from "../Component/Sidebars";

function SafeToLater() {
  const [safeToLater, setSafeToLater] = useState([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("safeItems")) || [];
    setSafeToLater(stored);
  }, []);

  const handleDelete = (id) => {
    const updated = safeToLater.filter((item) => item.id !== id);
    setSafeToLater(updated);
    localStorage.setItem("safeItems", JSON.stringify(updated));
  };

  return (
        // <div className="flex flex-row items-center justify-center bg-[#C88D84] min-h-screen">
    //   <Sidebars />
    //   <div className="w-screen ml-[80px] h-screen">
    //     <h1 className="text-2xl font-bold mb-4 text-center">Safe To Later</h1>

    //     <div className="p-4">
    //       {safeToLater.length === 0 ? (
    //         <p>Your safe to later list is empty.</p>
    //       ) : (
    //         safeToLater.map((item) => (
    //           <div
    //             key={item.id}
    //             className="flex flex-row md:grid md:grid-cols-3 md:ml-[4rem] md:w-[30rem] lg:w-[40rem] lg:ml-[5.5rem] xl:ml-[15rem] items-center mb-4 gap-4 bg-gradient-to-bl from-[#8e5047] to-fuchsia-50 p-4 rounded"
    //           >
    //             <img
    //               src={item.image}
    //               alt={item.title}
    //               className="w-16 h-16 md:w-28 md:h-28 lg:w-36 lg:h-36 rounded"
    //             />
    //             <div className="w-44 ml-4">
    //               <h2 className="text-lg font-semibold">{item.title}</h2>
    //               <p className="text-gray-600">Price: NGN {item.price}</p>
    //               <div className="flex md:hidden">
    //                 <button onClick={() => handleDelete(item.id)}>
    //                   <img src="/Images/trash.png" alt="Delete item" className="w-4 h-4" />
    //                 </button>
    //               </div>
    //             </div>
    //             <div className="hidden md:flex md:justify-end">
    //               <button onClick={() => handleDelete(item.id)}>
    //                 <img src="/Images/trash.png" alt="Delete item" className="w-4 h-4" />
    //               </button>
    //             </div>
    //           </div>
    //         ))
    //       )}
    //     </div>
    //   </div>
    // </div>
<div className="flex flex-col items-center bg-[#C88D84] min-h-screen overflow-x-hidden">
  <Sidebars />

  <div className="flex-1 w-full ml-[80px] p-6">
    <h1 className="text-2xl font-bold mb-6 text-center">Safe To Later</h1>

    {safeToLater.length === 0 ? (
      <p className="text-center">Your safe to later list is empty.</p>
    ) : (
      <div className="space-y-4 max-w-4xl mx-auto w-full">
        {safeToLater.map((item) => (
          <div
            key={item.id}
            className="flex items-center justify-between gap-4 bg-gradient-to-bl from-[#8e5047] to-fuchsia-50 p-4 rounded-lg shadow-md w-full overflow-hidden"
          >
            {/* Image */}
            <img
              src={item.image}
              alt={item.title}
              className="w-20 h-20 md:w-28 md:h-28 rounded object-cover flex-shrink-0"
            />

            {/* Text */}
            <div className="flex-1 min-w-0">
              <h2 className="text-lg font-semibold truncate">{item.title}</h2>
              <p className="text-gray-600">Price: NGN {item.price}</p>
            </div>

            {/* Delete button */}
            <button onClick={() => handleDelete(item.id)}>
              <img src="/Images/trash.png" alt="Delete item" className="w-5 h-5" />
            </button>
          </div>
        ))}
      </div>
    )}
  </div>
</div>

  );
}

export default SafeToLater;
