import { RecoilRoot } from "recoil";
import "./App.css";
import Homepage from "./components/homepage/hompage";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import StackEditor from "./components/page2/StackEditor";

function App() {
  return (
    <RecoilRoot>
      <Router>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/stack/:id" element={<StackEditor />} />
        </Routes>
      </Router>
    </RecoilRoot>
  );
}

export default App;
