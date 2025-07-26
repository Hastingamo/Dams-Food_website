import React, { useState } from "react";
import Sidebars from "../Component/Sidebars.jsx";
import Login from "./Login.jsx";
import SignUp from "./SignUp.jsx";
import { useEffect } from "react";
function Authentication() {
  const [toggle, setToggle] = useState(false);
  const handleToggle = () => {
    setToggle(!toggle);
  };
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);
  const [isLandscape, setIsLandscape] = useState(false);

  useEffect(() => {
    const checkOrientation = () => {
      const isLandscapeNow = window.matchMedia(
        "(orientation: landscape)"
      ).matches;
      setIsLandscape(isLandscapeNow);
    };

    checkOrientation(); // check once on mount

    // Listen for changes in orientation
    const mql = window.matchMedia("(orientation: landscape)");
    mql.addEventListener("change", checkOrientation);

    return () => mql.removeEventListener("change", checkOrientation);
  }, []);

  // If landscape, render nothing
  if (isLandscape) {
    return (
      <p className="text-center ">
        plese rotate your phone should be on potrait to visit this site{" "}
      </p>
    );
  }
  return (
    <div className="flex flex-row h-fit overflow-hidden">
      {toggle ? (
        <Login toggleSignUp={handleToggle} />
      ) : (
        <SignUp toggleLogin={handleToggle} />
      )}
    </div>
  );
}

export default Authentication;
