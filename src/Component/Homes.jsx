import React, { useEffect, useState } from "react";
import Homess from "./Homess";
import { motion } from "framer-motion";

function Homes() {
  const [isLandscape, setIsLandscape] = useState(false);
  const [isMobileDevice, setIsMobileDevice] = useState(false);

  useEffect(() => {
    const checkDeviceType = () => {
      // Check if it's a mobile or tablet device
      const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
      
      // Check screen size (mobile/tablet range)
      const isSmallScreen = window.innerWidth <= 1024; // tablets are usually up to 1024px
      
      // Check if device has touch capability
      const hasTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
      
      // Check pixel density (mobile devices usually have higher pixel density)
      const isHighDPI = window.devicePixelRatio > 1.5;
      
      // Combine checks - should be mobile/tablet if:
      // - User agent indicates mobile OR
      // - Small screen AND touch capability OR
      // - Small screen AND high DPI
      const isMobileOrTablet = isMobile || (isSmallScreen && (hasTouch || isHighDPI));
      
      setIsMobileDevice(isMobileOrTablet);
    };

    const checkOrientation = () => {
      // Only check orientation if it's a mobile/tablet device
      if (isMobileDevice) {
        const isLandscapeNow = window.matchMedia("(orientation: landscape)").matches;
        setIsLandscape(isLandscapeNow);
      } else {
        setIsLandscape(false); // Always allow landscape for desktop/TV
      }
    };

    // Initial checks
    checkDeviceType();
    checkOrientation();

    // Set up listeners
    const orientationMql = window.matchMedia("(orientation: landscape)");
    orientationMql.addEventListener("change", checkOrientation);

    // Listen for window resize to recheck device type
    window.addEventListener("resize", () => {
      checkDeviceType();
      checkOrientation();
    });

    return () => {
      orientationMql.removeEventListener("change", checkOrientation);
      window.removeEventListener("resize", checkOrientation);
    };
  }, [isMobileDevice]);

  // Only show landscape warning for mobile/tablet devices
  if (isMobileDevice && isLandscape) {
    return (
      <motion.div 
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="flex items-center justify-center h-screen w-screen bg-black text-white text-center p-4"
      >
        <div className="max-w-md">
          <motion.div 
            animate={{ rotateY: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            className="text-6xl mb-4"
          >
            📱
          </motion.div>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-xl md:text-2xl font-semibold mb-4"
          >
            Please rotate your device to portrait mode to use this site.
          </motion.p>
          <motion.div 
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            className="mx-auto"
          >
            <div className="w-12 h-20 border-2 border-white rounded-lg mx-auto relative">
              <motion.div 
                animate={{ opacity: [0.3, 1, 0.3] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="w-8 h-14 bg-white rounded-sm absolute top-2 left-1"
              />
            </div>
          </motion.div>
        </div>
      </motion.div>
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