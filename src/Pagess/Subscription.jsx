import React from "react";
import "../styles/Subscription.css";
function Subscription() {
  return (
    // <div className="imagess">
    <div className="imagess">
      <div className="container">
        <div className="divs">
          <h1 className="text-4xl text-center">choose your best plan</h1>
          {/* <div className="flex flex-row">
            <div>yearly</div>
            <div>monthly</div>
          </div> */}
        </div>
        <div className="cardingss divss">
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 ">
            <h1 className="text-3xl">free plan</h1>
            <h1 className="text-3xl">$0/month</h1>
              <h1>currrent plan</h1>
                        <h1 className="text-3xl">features</h1>

            <p className="text-3xl">1</p>
            <p className="text-3xl">1</p>
            <p className="text-3xl">1</p>
            <p className="text-3xl">1</p>
          </div>
        </div>

        <div className="cardingss divssss">
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 ">
            <h1 className="text-center text-3xl">prenium plan</h1>
            <h1 className="text-3xl"> $20000 / monthly</h1>
            <h1>upgrade to prenium</h1>
            <h1 className="text-3xl">features</h1>
            <p className="text-3xl">you will be able to see the ingredient</p>
            <p className="text-3xl">you will see video tutorial on how it is made</p>
            <p className="text-3xl">1</p>
            <p className="text-3xl">1</p>
            <p className="text-3xl">1</p>
            <p className="text-3xl">1</p>
  
          
          </div>{" "}
        </div>
      </div>
    </div>
  );
}

export default Subscription;
