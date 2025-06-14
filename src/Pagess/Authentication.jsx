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
