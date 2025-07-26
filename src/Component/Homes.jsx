import React, { useEffect, useState } from "react";
import Home from "../Component/Home";
import Homess from "../Component/Homess";

function Homes() {
  const [isLandscape, setIsLandscape] = useState(false);

  useEffect(() => {
    const checkOrientation = () => {
      const isLandscapeNow = window.matchMedia("(orientation: landscape)").matches;
      setIsLandscape(isLandscapeNow);
    };

    checkOrientation(); // check on mount

    const mql = window.matchMedia("(orientation: landscape)");
    mql.addEventListener("change", checkOrientation);

    return () => mql.removeEventListener("change", checkOrientation);
  }, []);

  if (isLandscape) {
    return (
      <div className="flex items-center justify-center h-screen w-screen bg-black text-white text-center p-4">
        <p className="text-xl md:text-2xl font-semibold">
          Please rotate your device to portrait mode to use this site.
        </p>
      </div>
    );
  }



  return (
    <>
      <div className="flex md:hidden">
        <Home />
      </div>
      <div className="hidden md:flex lg:hidden xl:hidden">
        <Homess />
      </div>

    </>
  );
}

export default Homes;
