import React, { useState } from "react";
import Sidebars from "../Component/Sidebars.jsx";
import Login from "./Login.jsx";
import SignUp from "./SignUp.jsx";
function Authentication() {
  const [toggle, setToggle] = useState(false);
  const handleToggle = () => {
    setToggle(!toggle);
  };
  return (
    <div className="flex flex-row">
      <Sidebars />
      {toggle ? (
        <Login toggleSignUp={handleToggle} />
      ) : (
        <SignUp toggleLogin={handleToggle} />
      )}
    </div>
  );
}

export default Authentication;
