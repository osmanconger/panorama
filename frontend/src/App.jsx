import "./App.css";
import { useState, useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { io } from "socket.io-client";
import CreateRoom from "./components/CreateRoom/CreateRoom";
import JoinRoom from "./components/JoinRoom/JoinRoom";
import Room from "./components/Room/Room";
import Login from "./components/Login/Login";
import Signup from "./components/Signup/Signup";

function App() {

  return (
    <BrowserRouter>
      <div className="App">
        <h1>Panorama</h1>
      </div>
      <Routes>
        <Route path="/:roomId" element={<Room />} />
        <Route path="/createRoom" element={<CreateRoom />} />
        <Route path="/joinRoom" element={<JoinRoom />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
