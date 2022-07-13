import { Button, TextField } from "@mui/material";
import { connect } from "twilio-video";

import Room from "../Room/Room";

import { useState } from "react";
import "../Form.css";

const CreateRoom = () => {
  const [hostName, setHostName] = useState("");
  const [roomId, setRoomId] = useState(null);
  const [token, setToken] = useState(null);
  const [room, setRoom] = useState(null);

  const createRoom = (e) => {
    e.preventDefault();
    fetch(`http://localhost:5000/api/room/token`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        identity: hostName,
      }),
    })
      .then((res) => {
        return res.json();
      })
      .then((json) => {
        setRoomId(json.id);
        setToken(json.token);
      })
      .catch((err) => console.log(err));
  };

  //actually connect to the room
  const joinRoom = (e) => {
    e.preventDefault();
    connect(token, { name: roomId })
      .then((newRoom) => setRoom(newRoom))
      .catch((err) => console.log(err));
  };

  //TODO: Try to redirect to room component and pass in state instead of rendering the room here
  // const redirectToRoom = (newRoom) => {
  //   console.log(newRoom);
  //   navigate(`/${roomId}`, { replace: false, state: { newRoom: newRoom } });
  //   // navigate(`/${roomId}`, { state: { room: { newRoom } } });
  // };

  return (
    <div>
      <form onSubmit={createRoom} className="form">
        {!room && !roomId && (
          <>
            <TextField
              required
              variant="standard"
              placeholder="Enter your name"
              value={hostName}
              onChange={(e) => setHostName(e.target.value)}
            ></TextField>
            <br />
            <Button variant="outlined" type="submit">
              Generate a new room ID
            </Button>
          </>
        )}
        {!room && roomId && (
          <>
            <p>Your new room ID is: {roomId}</p>
            <Button variant="outlined" onClick={joinRoom}>
              Join This Room
            </Button>
          </>
        )}
        {room && <Room room={room} id={roomId} />}
      </form>
    </div>
  );
};

export default CreateRoom;
