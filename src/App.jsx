import LayOut from "./LayOut";
import Home from "./Pagess/Home"
import CockTailss from "./Pagess/CockTailss";
import CockDetails from "./Pagess/CockDetails";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import FoodDetials from "./Pagess/FoodDetials";
import Foods from "./Pagess/Foods";
import SignUp from "./Pagess/SignUp";
import Login from "./Pagess/Login";
function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<LayOut />}>
            <Route index element={<Home />} />
            <Route path="/Home" element={<Home />} />
            <Route path="/food" element={<Foods/>} />
            <Route path="/cocktails" element={<CockTailss />} />
            <Route path="/cocktails/:id" element={<CockDetails/>} />
            <Route path="/food/:id" element={<FoodDetials />} />
            <Route path="/foodDetails" element={<FoodDetials />} />
            <Route path="/SignUp" element={<SignUp />} />
            <Route path="/Login" element={<Login />} />
            <Route path="*" element={<h1>404</h1>} />
          </Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
