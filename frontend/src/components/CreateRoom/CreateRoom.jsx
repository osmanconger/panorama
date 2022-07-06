import React from "react";

function CreateRoom() {
  const createRoom = (e) => {
    e.preventDefault();
    fetch("http://localhost:5000/api/create-room")
      .then((res) => res.json())
      .then((json) => (window.location = `${json.roomId}`));
  };
  return (
    <div>
      <form onSubmit={createRoom}>
        <button type="submit">Create Room</button>
      </form>
    </div>
  );
}

export default CreateRoom;
