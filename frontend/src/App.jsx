import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Room from "./components/Room/Room";
import Lobby from "./views/Lobby";
import Login from "./components/Login/Login";
import Signup from "./components/Signup/Signup";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/:roomId" element={<Room />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/" element={<Lobby />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;