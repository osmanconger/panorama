import { useState, useEffect } from "react";
import { Button, Grid } from "@mui/material";
import { Mic, MicOff, Videocam, VideocamOff } from "@mui/icons-material";

import "./Room.css";
import Participant from "../Participant/Participant";
import Whiteboard from "../Whiteboard/Whiteboard";

const Room = ({ room, id, setRoom }) => {
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
    room.localParticipant.videoTracks.forEach((publication) => {
      publication.track.enable();
      publication.track.attach();
    });
    setVideoOn(true);
  };

  const stopVideo = () => {
    room.localParticipant.videoTracks.forEach((publication) => {
      publication.track.disable();
      publication.track.detach();
    });
    setVideoOn(false);
  };

  const leaveRoom = () => {
    if (room.localParticipant.state === "connected") {
      room.localParticipant.tracks.forEach((publication) =>
        publication.track.stop()
      );
      room.disconnect();
    }
    setRoom(null);
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
            <div className="participant" id="local-user">
              <Participant
                participant={room.localParticipant}
                videoOn={videoOn}
                audioOn={audioOn}
              />
            </div>
            {remoteParticipants.map((participant) => (
              <div className="participant">
                <Participant
                  key={participant.sid}
                  participant={participant}
                  videoOn={true}
                  audioOn={true}
                />
              </div>
            ))}
             <Whiteboard roomId={id} /> 
          </div>
          <br />
          <br />
          <div className="controls">
            {audioOn ? (
              <Button variant="outlined" onClick={() => mute()}>
                <MicOff /> Turn Mic Off
              </Button>
            ) : (
              <Button variant="outlined" onClick={() => unmute()}>
                <Mic /> Turn Mic On
              </Button>
            )}
            {videoOn ? (
              <Button variant="outlined" onClick={() => stopVideo()}>
                <VideocamOff /> Turn Video Off
              </Button>
            ) : (
              <Button variant="outlined" onClick={() => startVideo()}>
                <Videocam /> Turn Video On
              </Button>
            )}
            <Button
              variant="outlined"
              color="error"
              onClick={() => leaveRoom()}
            >
              Leave Call
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Room;
