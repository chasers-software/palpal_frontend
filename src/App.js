import { BrowserRouter, Routes, Route } from "react-router-dom";
import VideoUpload from "./pages/VideoUpload";
import WatchVideo from "./pages/WatchVideo";
import Profile from "./pages/Profile";
import Landing from "./pages/Landing";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/upload" element={<VideoUpload />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/video">
          <Route path=":hash/:name" element={<WatchVideo />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
