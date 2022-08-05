import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Videoplayer from "./pages/Videoplayer";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/watch" element={<Videoplayer />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
