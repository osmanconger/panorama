import { useState } from "react";
import { ToggleButtonGroup, ToggleButton } from "@mui/material";

import JoinRoom from "../components/JoinRoom/JoinRoom";
import CreateRoom from "../components/CreateRoom/CreateRoom";
import "./Lobby.css";

const Lobby = () => {
  //set default type to join room, instead of creating a room
  const [type, setType] = useState("join");

  const changeType = (e) => {
    setType(e.target.value);
  };

  return (
    <div className="lobby page">
      <ToggleButtonGroup
        color="primary"
        value={type}
        exclusive
        onChange={changeType}
      >
        <ToggleButton value="join">Join Room</ToggleButton>
        <ToggleButton value="create">Create Room</ToggleButton>
      </ToggleButtonGroup>
      {type === "create" ? <CreateRoom /> : <JoinRoom />}
    </div>
  );
};

export default Lobby;
