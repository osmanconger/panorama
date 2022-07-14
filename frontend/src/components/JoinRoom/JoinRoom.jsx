import { useState, useContext } from "react";
import { Button, TextField } from "@mui/material";
import { connect } from "twilio-video";
import { AuthContext } from "../../context/AuthProvider";

import "../Form.css";
import Room from "../Room/Room";

const JoinRoom = () => {
  const { user } = useContext(AuthContext);
  const [roomId, setRoomId] = useState("");
  const [room, setRoom] = useState(null);
  // const [name, setName] = useState("");
  const [errors, setErrors] = useState("");

  const joinRoom = (e) => {
    e.preventDefault();
    fetch(`http://localhost:5000/api/room/${roomId}`).then((res) => {
      //Connect to room if it exists
      if (res.status === 200) {
        fetch(`http://localhost:5000/api/token`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            identity: user.name,
            room: roomId,
          }),
        })
          .then((res) => {
            return res.json();
          })
          .then((json) => {
            connect(json.token, { name: roomId }).then((room) => setRoom(room));
          })
          .catch((err) => console.log(err));
      } else {
        setErrors("Room Not Found");
      }
    });
  };

  return (
    <div>
      {!room ? (
        <form onSubmit={joinRoom} className="form">
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
          {errors && <p>{errors}</p>}
        </form>
      ) : (
        <Room room={room} id={roomId} />
      )}
    </div>
  );
};

export default JoinRoom;
