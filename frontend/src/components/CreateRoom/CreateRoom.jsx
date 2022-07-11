import { Button, TextField } from "@mui/material";
import { connect } from "twilio-video";

import { useState } from "react";
import "../Form.css";

const CreateRoom = () => {
  const [hostName, setHostName] = useState("");
  const [roomId, setRoomId] = useState(null);

  const createRoom = (e) => {
    e.preventDefault();
    fetch(`http://localhost:5000/api/room`, {
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
        setRoomId(json.roomId);
        // connect(json.token, { name: roomId }).then((room) => setRoom(room));
      })
      .catch((err) => console.log(err));
  };
  return (
    <div>
      <form onSubmit={createRoom} className="form">
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
        {roomId && <p>Your new room ID is: {roomId}</p>}
      </form>
    </div>
  );
};

export default CreateRoom;
