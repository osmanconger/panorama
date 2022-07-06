import { useState } from "react";

function JoinRoom() {
  const [roomId, setRoomId] = useState("");
  const joinRoom = (e) => {
    e.preventDefault();
    fetch(`http://localhost:5000/api/${roomId}`)
      .then((res) => res.json())
      .then((json) => (window.location = `${json.roomId}`))
      .catch((err) => console.log(err));
  };
  return (
    <div>
      <form onSubmit={joinRoom}>
        <input
          placeholder="Enter Room ID"
          value={roomId}
          onChange={(e) => setRoomId(e.target.value)}
        ></input>
        <button type="submit">Join Room</button>
      </form>
    </div>
  );
}

export default JoinRoom;
