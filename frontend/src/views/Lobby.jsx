import { useContext, useState } from "react";
import { ToggleButtonGroup, ToggleButton } from "@mui/material";
import { AuthContext } from "../context/AuthProvider";

import JoinRoom from "../components/JoinRoom/JoinRoom";
import CreateRoom from "../components/CreateRoom/CreateRoom";
import Login from "../components/Login/Login";
import "./Lobby.css";

const Lobby = () => {
  const { user } = useContext(AuthContext);
  console.log(user);

  //set default type to join room, instead of creating a room
  const [type, setType] = useState("join");

  const changeType = (e) => {
    setType(e.target.value);
  };

  return (
    <div>
      {user ? (
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
      ) : (
        <Login />
      )}
    </div>
  );
};

export default Lobby;
