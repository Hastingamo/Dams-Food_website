import React from "react";
import { useState } from "react";
function DeleteModal() {
  const [isOpen, setIsOpen] = useState();
  function handleOpen() {
    setIsOpen(true);
  }
  function handleOutSideClick(e) {
    if (e.target === e.currentTarget) {
      setIsOpen(false);
    }
  }
  //   function handleClose() {
  //     setIsOpen(false);
  //   }
  return (
    <>
      {/* <button
          onClick={() => setIsOpen(true)}
          className="bg-red-500 text-white px-4 py-2 rounded"
        >
          Delete Item
        </button> */}
      <img
        src="Images/trash.png"
        className="w-4 h-4"
        onClick={handleOpen}
        alt=""
      />
      {isOpen && (
        <div
          onClick={handleOutSideClick}
          className="fixed inset-0 backdrop-blur-sm bg-opacity-50  flex items-center justify-center"
        >
          <div className="bg-white p-6 rounded shadow-lg">
            <h2 className="text-xl font-bold mb-4">Delete Item</h2>
            <div className="mt-4 flex justify-end gap-2">
              <button className="bg-gray-300 px-4 py-2 rounded">
                remove from cart
              </button>
              <button className="bg-red-500 text-white px-4 py-2 rounded">
                safe to wishlist
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default DeleteModal;
