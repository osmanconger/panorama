import { useState, useEffect } from "react";
import "./Room.css";
import Participant from "../Participant/Participant";

const Room = ({ id, room }) => {
  const [remoteParticipants, setRemoteParticipants] = useState([]);

  useEffect(() => {
    const addParticipant = (p) => {
      console.log(p);
      setRemoteParticipants((prev) => [...prev, p]);
    };

    const removeParticipant = (participant) => {
      setRemoteParticipants((prev) => prev.filter((p) => p !== participant));
    };

    room.remoteParticipants.forEach(addParticipant);
    room.on("participantConnected", addParticipant);
    room.on("participantDisconnected", removeParticipant);
  }, [room]);
  return (
    <div className="room page">
      {room && (
        <div>
          <p>RoomId: {id}</p>
          <div id="local-user">
            <Participant participant={room.localParticipant} />
          </div>
          {remoteParticipants.map((participant) => (
            <Participant key={participant.sid} participant={participant} />
          ))}
          {/* <button onClick={() => leaveRoom()}>Leave Room</button> */}
        </div>
      )}
    </div>
  );
};

export default Room;
