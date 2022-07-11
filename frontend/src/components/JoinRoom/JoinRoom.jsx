import { useState } from "react";
import { Button, TextField } from "@mui/material";

import "../Form.css";
import Room from "../Room/Room";

const JoinRoom = () => {
  const { connect } = require("twilio-video");

  const [roomId, setRoomId] = useState("");
  const [room, setRoom] = useState(null);
  const [name, setName] = useState("");
  const [token, setToken] = useState(null);

  const joinRoom = (e) => {
    e.preventDefault();
    fetch(`http://localhost:5000/api/token`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        identity: name,
        room: roomId,
      }),
    })
      .then((res) => {
        return res.json();
      })
      .then((json) => {
        setToken(json.token);
        connect(json.token, { name: roomId }).then((room) => setRoom(room));
      })
      .catch((err) => console.log(err));
  };

  return (
    <div>
      {/* TODO: Change this obviously, we need some global state for the token so that Room can get passed the necessary token and is not a component here*/}
      {!room ? (
        <form onSubmit={joinRoom} className="form">
          <TextField
            variant="standard"
            placeholder="Enter your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          ></TextField>
          <br />
          <TextField
            variant="standard"
            placeholder="Enter Room ID"
            value={roomId}
            onChange={(e) => setRoomId(e.target.value)}
          ></TextField>
          <br />
          <Button variant="outlined" type="submit">
            Join Room
          </Button>
        </form>
      ) : (
        <Room room={room} id={roomId} token={token} />
      )}
    </div>
  );
};

export default JoinRoom;
