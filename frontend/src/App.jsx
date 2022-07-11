import "./App.css";
import { useState, useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import CreateRoom from "./components/CreateRoom/CreateRoom";
import JoinRoom from "./components/JoinRoom/JoinRoom";
import Room from "./components/Room/Room";
import Lobby from "./views/Lobby";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <h1>Panorama</h1>
      </div>
      <Routes>
        <Route path="/:roomId" element={<Room roo />} />
        <Route path="/" element={<Lobby />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
