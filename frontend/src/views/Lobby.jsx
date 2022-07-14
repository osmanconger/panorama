import { useContext, useState } from "react";
import { ToggleButtonGroup, ToggleButton } from "@mui/material";
import { AuthContext } from "../context/AuthProvider";

import JoinRoom from "../components/JoinRoom/JoinRoom";
import CreateRoom from "../components/CreateRoom/CreateRoom";
import Login from "../components/Login/Login";
import Signup from "../components/Signup/Signup";
import "./Lobby.css";

const Lobby = () => {
  const { user } = useContext(AuthContext);

  //set default type to join room, instead of creating a room
  const [type, setType] = useState("join");
  const [loginType, setLoginType] = useState("signup");

  const changeType = (e) => {
    setType(e.target.value);
  };

  const changeLoginType = (e) => {
    setLoginType(e.target.value);
  }

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
        <div className="lobby page">
          <ToggleButtonGroup
            color="primary"
            value={loginType}
            exclusive
            onChange={changeLoginType}
          >
            <ToggleButton value="signup">Sign Up</ToggleButton>
            <ToggleButton value="login">Log In</ToggleButton>
          </ToggleButtonGroup>
          {loginType === "signup" ? <Signup /> : <Login />}
        </div>
      )}
    </div>
  );
};

export default Lobby;
