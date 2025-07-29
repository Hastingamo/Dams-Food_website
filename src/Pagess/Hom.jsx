import React from "react";
// import Homess from '../Component/Homess'
import Home from "../Component/Home";
import Homes from "../Component/Homes";
function Hom() {
  return (
    <>
<div  className="hidden xl:flex">
        <Home />
      </div>
      <div className="flex xl:hidden">
        <Homes/>
      </div>

    </>
  );
}

export default Hom;
