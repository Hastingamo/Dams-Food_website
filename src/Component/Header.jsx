import React from "react";
import { Link, useNavigate } from "react-router-dom";

function Header() {
  const navigate = useNavigate();

  return (
    <header className="sticky top-0 z-40 w-full bg-slate-900/95 backdrop-blur-md text-white border-b border-slate-800 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link to="/Home" className="flex items-center space-x-2 group">
          <span className="text-2xl font-extrabold bg-gradient-to-r from-orange-400 via-rose-400 to-amber-300 bg-clip-text text-transparent group-hover:scale-105 transition-transform duration-200">
            Food Mood
          </span>
          <span className="text-xl">✨</span>
        </Link>

        {/* Navigation Links */}
        <nav className="hidden md:flex items-center space-x-8 text-sm font-medium">
          <Link
            to="/Home"
            className="text-slate-200 hover:text-orange-400 transition-colors"
          >
            Home
          </Link>
          <Link
            to="/food"
            className="text-slate-200 hover:text-orange-400 transition-colors"
          >
            Foods
          </Link>
          <Link
            to="/cocktails"
            className="text-slate-200 hover:text-orange-400 transition-colors"
          >
            Cocktails
          </Link>
          <Link
            to="/SafeTOLater"
            className="text-slate-200 hover:text-orange-400 transition-colors"
          >
            Saved Meals
          </Link>
          <Link
            to="/Order"
            className="text-slate-200 hover:text-orange-400 transition-colors"
          >
            Orders
          </Link>
        </nav>

        {/* Action Buttons */}
        <div className="flex items-center space-x-3">
          <button
            onClick={() => navigate("/AddToChart")}
            className="p-2 text-slate-300 hover:text-white rounded-full hover:bg-slate-800 transition-colors"
            title="Cart"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 100 4 2 2 0 000-4z"
              />
            </svg>
          </button>
          <button
            onClick={() => navigate("/food")}
            className="hidden sm:inline-flex items-center justify-center px-4 py-2 text-sm font-semibold text-white bg-gradient-to-r from-orange-500 to-rose-500 rounded-full hover:from-orange-600 hover:to-rose-600 shadow-md hover:shadow-orange-500/20 transition-all duration-200"
          >
            Explore Menu
          </button>
        </div>
      </div>
    </header>
  );
}

export default Header;
