import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Sidebars = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false); // Start with the sidebar collapsed

  return (
    <div
      className={`fixed top-0 left-0 h-[50rem] md:h-screen z-10 bg-[#e4c2bd] transition-all duration-300 ${
        isOpen ? "w-64" : "w-20"
      }`}
    >
      <div className="flex justify-between p-4">
        {/* Toggle Button (Hamburger Menu) */}
        <button
          className="text-white focus:outline-none"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          )}
        </button>
      </div>

      <nav className="flex flex-col space-y-4 px-4 mt-8 gap-4">
        {/* Dashboard Link */}
        <div
          className="flex items-center space-x-2 group"
          onMouseEnter={() => setIsOpen(true)}
          onMouseLeave={() => setIsOpen(false)}
        >
          {/* <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className="w-6 h-6 text-white group-hover:text-blue-400"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M3 12l2 2 4-4m0 0l4 4 2-2"
            />
          </svg> */}
          {/* <span
            className={`text-white text-lg group-hover:block ${
              isOpen ? "block" : "hidden"
            }`}
          >
            Home
          </span> */}
          <img
            className="w-6 h-6 text-white group-hover:text-blue-400"
            src="Images/home.png"
            alt=""
          />

          <h1
            className={`text-black text-lg group-hover:block ${
              isOpen ? "block" : "hidden"
            }`}
            onClick={() => navigate("/Home")}
          >
            Home
          </h1>
        </div>

        {/* Movies Link */}
        <div
          className="flex items-center space-x-2 group"
          onMouseEnter={() => setIsOpen(true)}
          onMouseLeave={() => setIsOpen(false)}
        >
          <img
            className="w-6 h-6 text-white group-hover:text-blue-400"
            src="Images/tray.png"
            alt=""
          />

          <h1
            className={`text-black text-lg group-hover:block ${
              isOpen ? "block" : "hidden"
            }`}
            onClick={() => navigate("/food")}
          >
            Food
          </h1>
        </div>

        {/* TV Shows Link */}

        {/* Settings Link */}
        <div
          className="flex items-center space-x-2 group"
          onMouseEnter={() => setIsOpen(true)}
          onMouseLeave={() => setIsOpen(false)}
        >
          <img
            className="w-6 h-6 text-black group-hover:text-blue-400"
            src="Images/cocktail.png"
            alt=""
          />
          <h1
            className={`text-black text-lg group-hover:block ${
              isOpen ? "block" : "hidden"
            }`}
            onClick={() => navigate("/cocktails")}
          >
            cockTail
          </h1>
        </div>
        <div
          className="flex items-center space-x-2 group"
          onMouseEnter={() => setIsOpen(true)}
          onMouseLeave={() => setIsOpen(false)}
        >
          <img
            className="w-6 h-6 text-white group-hover:text-blue-400"
            src="Images/user.png"
            alt=""
          />
          <h1
            className={`text-black text-lg group-hover:block ${
              isOpen ? "block" : "hidden"
            }`}
            onClick={() => navigate("/Dashboard")}
          >
           Profile
          </h1>

        </div>
        <div
          className="flex items-center space-x-2 group"
          onMouseEnter={() => setIsOpen(true)}
          onMouseLeave={() => setIsOpen(false)}
        >
          <img
            className="w-6 h-6 text-white group-hover:text-blue-400"
            src="Images/shoppingCart.png"
            alt=""
          />
          <h1
            className={`text-black text-lg group-hover:block ${
              isOpen ? "block" : "hidden"
            }`}
            onClick={() => navigate("/AddToChart")}
          >
            cart
          </h1>

        </div>
        <div
          className="flex items-center space-x-2 group"
          onMouseEnter={() => setIsOpen(true)}
          onMouseLeave={() => setIsOpen(false)}
        >
          <img
            className="w-6 h-6 text-white group-hover:text-blue-400"
            src="Images/user.png"
            alt=""
          />
          <h1
            className={`text-black text-lg group-hover:block ${
              isOpen ? "block" : "hidden"
            }`}
            onClick={() => navigate("/")}
          >
            Profile
          </h1>

        </div>
      </nav>
    </div>
  );
};

export default Sidebars;
