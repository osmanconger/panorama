import { useState, useEffect } from "react";
import { Button } from "@mui/material";

import "./Room.css";
import Participant from "../Participant/Participant";

const Room = ({ room, id }) => {
  const [remoteParticipants, setRemoteParticipants] = useState([]);
  //audioOn set to true means unmuted
  const [audioOn, setAudioOn] = useState(true);
  const [videoOn, setVideoOn] = useState(true);

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

  const mute = () => {
    room.localParticipant.audioTracks.forEach((publication) =>
      publication.track.disable()
    );
    setAudioOn(false);
  };

  const unmute = () => {
    room.localParticipant.audioTracks.forEach((publication) =>
      publication.track.enable()
    );
    setAudioOn(true);
  };

  const startVideo = () => {
    room.localParticipant.videoTracks.forEach((publication) =>
      publication.track.enable()
    );
    setVideoOn(true);
  };

  const stopVideo = () => {
    room.localParticipant.videoTracks.forEach((publication) => {
      publication.track.disable();
      // publication.track.detach();
    });
    setVideoOn(false);
  };

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
            {audioOn ? (
              <Button variant="outlined" onClick={() => mute()}>
                Mute
              </Button>
            ) : (
              <Button variant="outlined" onClick={() => unmute()}>
                Unmute
              </Button>
            )}
            {videoOn ? (
              <Button variant="outlined" onClick={() => stopVideo()}>
                Turn Video Off
              </Button>
            ) : (
              <Button variant="outlined" onClick={() => startVideo()}>
                Turn Video On
              </Button>
            )}
            {/* <i className="fa-solid fa-microphone"></i>
            <i className="fa-solid fa-microphone-slash"></i>
            <i className="fa-solid fa-video"></i>
            <i className="fa-solid fa-video-slash"></i>
            <i className="fa-solid fa-phone-xmark"></i> */}
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
