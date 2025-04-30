import LayOut from "./LayOut";
import Home from "./Pagess/Home"
import CockTailss from "./Pagess/CockTailss";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Food from "./pagess/Food";
function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<LayOut />}>
            <Route index element={<Home />} />
            <Route path="/Home" element={<Home />} />
            <Route path="/food" element={<Food/>} />
            <Route path="/cocktails" element={<CockTailss />} />
            <Route path="/cocktails/:id" element={<CockTailss />} />
            <Route path="/food/:id" element={<Food />} />
            <Route path="*" element={<h1>404</h1>} />
          </Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
