import LayOut from "./LayOut";
import CockTailss from "./Pagess/CockTailss";
import CockDetails from "./Pagess/CockDetails";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import FoodDetials from "./Pagess/FoodDetials";
import Foods from "./Pagess/Foods";
import SignUp from "./Pagess/SignUp";
import Login from "./Pagess/Login";
import Authentication from "./Pagess/Authentication";
import Dashboard from "./Pagess/Dashboard";
import PrivateLayOut from "./PrivateLayOut";
import AddTochart from "./Pagess/AddTochart";
import CheckOut from "./Pagess/CheckOut";
import SafeTOLater from "./Pagess/SafeTOLater";
import Order from "./Pagess/Order";
import Hom from "./Pagess/Hom";
function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<LayOut />}>
            <Route index element={<Hom />} />
            <Route path="/Home" element={<Hom/>} />
            <Route path="/food" element={<Foods />} />
            <Route path="/cocktails" element={<CockTailss />} />
        
            <Route path="/SignUp" element={<SignUp />} />
            <Route path="/Login" element={<Login />} />
            <Route path="/SafeTOLater" element={<SafeTOLater/>} />

            <Route path="/Authentication" element={<Authentication />} />
            <Route path="*" element={<h1>404</h1>} />
          </Route>
          <Route element={<PrivateLayOut />}>
            <Route path="/Dashboard" element={<Dashboard />} />

            <Route path="/cocktails/:id" element={<CockDetails />} />
            <Route path="/food/:id" element={<FoodDetials />} />
            <Route path="/foodDetails" element={<FoodDetials />} />
            <Route path="AddToChart" element={<AddTochart/>} />
            <Route path="/CheckOut" element={<CheckOut/>} />
            <Route path="Order" element={<Order/>} />
          </Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
