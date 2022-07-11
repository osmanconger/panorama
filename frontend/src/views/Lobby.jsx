import { useState } from "react";
import { ToggleButtonGroup, ToggleButton } from "@mui/material";

import JoinRoom from "../components/JoinRoom/JoinRoom";
import CreateRoom from "../components/CreateRoom/CreateRoom";
import "./Lobby.css";

const Lobby = () => {
  //set default type to join room, instead of creating a room
  // const [type, setType] = useState("join");

  const [type, setType] = useState("join");

  const handleAlignment = (e) => {
    setType(e.target.value);
  };

  return (
    <div className="lobby">
      <ToggleButtonGroup
        color="primary"
        value={type}
        exclusive
        onChange={handleAlignment}
      >
        <ToggleButton value="create">Create Room</ToggleButton>
        <ToggleButton value="join">Join Room</ToggleButton>
      </ToggleButtonGroup>
      {type === "create" ? <CreateRoom /> : <JoinRoom />}
    </div>
  );
};

export default Lobby;
