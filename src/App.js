import { BrowserRouter, Routes, Route } from "react-router-dom";
import VideoUpload from "./pages/VideoUpload";
import WatchVideo from "./pages/WatchVideo";
import Profile from "./pages/Profile";
import Landing from "./pages/Landing";
import { TransactionsProvider } from "./context/TransactionContext";

function App() {
  return (
    <BrowserRouter>
      <TransactionsProvider>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/upload" element={<VideoUpload />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/video">
            <Route path=":id" element={<WatchVideo />} />
          </Route>
        </Routes>
      </TransactionsProvider>
    </BrowserRouter>
  );
}

export default App;
