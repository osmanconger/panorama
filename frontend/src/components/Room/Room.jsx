import { useState } from "react";
import "./Room.css";

function Room() {
  const [localStream, setLocalStream] = useState("");
  //Start local stream to share video and audio
  //TODO: Error handling
  const getLocalStream = () => {
    navigator.mediaDevices
      .getUserMedia({
        video: true,
        audio: true,
      })
      .then((stream) => {
        //TODO: Find better way to do this, possibly using state?
        document.querySelector("#local-video").srcObject = stream;
        setLocalStream(stream);
      })
      .catch((err) => console.log(err));
  };

  const stopLocalStream = () => {
    localStream
      .getTracks()
      .forEach((track) => track.readyState === "live" && track.stop());
    setLocalStream("");
  };

  return (
    <div className="room">
      <video className="video" id="local-video" autoPlay></video>
      <br />
      {localStream === "" && (
        <button onClick={getLocalStream}>Share Your Video and Audio</button>
      )}
      {localStream !== "" && (
        <button onClick={stopLocalStream}>Stop Sharing Video and Audio</button>
      )}
    </div>
  );
}

export default Room;
