import React, { useEffect, useState } from "react";
import Homess from "./Homess";

function Homes() {
  const [isLandscape, setIsLandscape] = useState(false);

  useEffect(() => {
    const checkOrientation = () => {
      const isLandscapeNow = window.matchMedia(
        "(orientation: landscape)"
      ).matches;
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
        <div className="max-w-md">
          <div className="text-6xl mb-4">📱</div>
          <p className="text-xl md:text-2xl font-semibold mb-4">
            Please rotate your device to portrait mode to use this site.
          </p>
          <div className="animate-bounce">
            <div className="w-12 h-20 border-2 border-white rounded-lg mx-auto relative">
              <div className="w-8 h-14 bg-white rounded-sm absolute top-2 left-1 animate-pulse"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="flex xl:hidden w-screen h-screen overflow-hidden">
        <Homess />
      </div>
    </>
  );
}

export default Homes;
