import React from "react";
import { useNavigate } from "react-router";
function BackButton() {
  const navigate = useNavigate();
  return (
    <div className="mt-4">
      <button onClick={() => navigate(-1)} className=" bg-white px-4 pb-2  rounded-2xl  absolute top-0 left-2 md:top-4 md:left-4">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-10 w-10 flex justify-center items-center text-black"
          fill="none"
          viewBox="0 -4 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 19l-7-7 7-7"
          />
        </svg>
        <span className="opacity-0  hover:opacity-45 hover:text-black">Back</span>
      </button>
    </div>
  );
}

export default BackButton;
