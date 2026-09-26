import React from "react";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="w-full bg-slate-900 text-slate-300 border-t border-slate-800 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
        {/* Brand column */}
        <div className="space-y-3">
          <div className="flex items-center space-x-2">
            <span className="text-2xl font-extrabold bg-gradient-to-r from-orange-400 via-rose-400 to-amber-300 bg-clip-text text-transparent">
              Food Mood
            </span>
            <span className="text-xl">✨</span>
          </div>
          <p className="text-xs text-slate-400 leading-relaxed">
            Discover culinary inspiration, exquisite recipes, and handcrafted cocktail pairings designed to elevate your mood every single day.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-3">
            Quick Links
          </h3>
          <ul className="space-y-2 text-xs">
            <li>
              <Link to="/Home" className="hover:text-orange-400 transition-colors">
                Home
              </Link>
            </li>
            <li>
              <Link to="/food" className="hover:text-orange-400 transition-colors">
                Food Menu
              </Link>
            </li>
            <li>
              <Link to="/cocktails" className="hover:text-orange-400 transition-colors">
                Cocktail Lounge
              </Link>
            </li>
            <li>
              <Link to="/Subscription" className="hover:text-orange-400 transition-colors">
                Subscription Plan
              </Link>
            </li>
          </ul>
        </div>

        {/* Account & Orders */}
        <div>
          <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-3">
            Your Account
          </h3>
          <ul className="space-y-2 text-xs">
            <li>
              <Link to="/Dashboard" className="hover:text-orange-400 transition-colors">
                User Profile
              </Link>
            </li>
            <li>
              <Link to="/AddToChart" className="hover:text-orange-400 transition-colors">
                My Cart
              </Link>
            </li>
            <li>
              <Link to="/SafeTOLater" className="hover:text-orange-400 transition-colors">
                Saved Items
              </Link>
            </li>
            <li>
              <Link to="/Order" className="hover:text-orange-400 transition-colors">
                Order History
              </Link>
            </li>
          </ul>
        </div>

        {/* Newsletter / Contact */}
        <div className="space-y-3">
          <h3 className="text-sm font-semibold text-white uppercase tracking-wider">
            Stay Connected
          </h3>
          <p className="text-xs text-slate-400">
            Get delicious recipes and weekly specials delivered right to your inbox.
          </p>
          <div className="flex">
            <input
              type="email"
              placeholder="Your email address"
              className="bg-slate-800 text-xs text-white px-3 py-2 rounded-l-md outline-none focus:ring-1 focus:ring-orange-400 w-full"
            />
            <button className="bg-orange-500 hover:bg-orange-600 text-white text-xs px-3 py-2 rounded-r-md font-semibold transition-colors">
              Join
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto pt-6 border-t border-slate-800 text-center text-xs text-slate-500">
        <p>All Rights Reserved &copy; {new Date().getFullYear()} Food Mood. Crafted with passion.</p>
      </div>
    </footer>
  );
}

export default Footer;
