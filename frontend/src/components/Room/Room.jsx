import { useState, useEffect } from "react";
import { Button } from "@mui/material";

import "./Room.css";
import Participant from "../Participant/Participant";
import Whiteboard from "../Whiteboard/Whiteboard";

const Room = ({ room, id }) => {
  const [remoteParticipants, setRemoteParticipants] = useState([]);

  useEffect(() => {
    const addParticipant = (participant) => {
      setRemoteParticipants((prev) => [...prev, participant]);
    };

    const removeParticipant = (participant) => {
      participant.removeAllListeners();
      setRemoteParticipants((prev) => prev.filter((p) => p !== participant));
    };

    if (room) {
      room.participants.forEach(addParticipant);
      room.on("participantConnected", addParticipant);
      room.on("participantDisconnected", removeParticipant);
      //local participant disconnects
      window.addEventListener("pagehide", () => room.disconnect());
      window.addEventListener("beforeunload", () => room.disconnect());
    }
  }, [room]);

  return (
    <div className="room page">
      {room && (
        <div>
          <div className="room-invite">
            <p>
              <b>RoomId :</b> {id}
            </p>
            <Button
              variant="outlined"
              size="small"
              onClick={() => {
                navigator.clipboard.writeText(id);
              }}
            >
              Copy Room Id
            </Button>
          </div>
          <div className="videos-container">
            <div id="local-user">
              <Participant participant={room.localParticipant} />
            </div>
            {remoteParticipants.map((participant) => (
              <Participant key={participant.sid} participant={participant} />
            ))}
            {/* <Whiteboard roomId={id} /> */}
          </div>
          <div className="controls">
            <i className="fa-solid fa-microphone"></i>
            <i className="fa-solid fa-microphone-slash"></i>
            <i className="fa-solid fa-video"></i>
            <i className="fa-solid fa-video-slash"></i>
            <i className="fa-solid fa-phone-xmark"></i>
            {/* TODO: Only show this option if you are the host */}
            <Button variant="outlined" color="error">
              End Call
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Room;
