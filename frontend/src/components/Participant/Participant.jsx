import { useState, useRef, useEffect } from "react";

const Participant = ({ participant }) => {
  const [videos, setVideos] = useState([]);
  const [audios, setAudios] = useState([]);
  const videoRef = useRef();
  const audioRef = useRef();

  const addTrack = (track) => {
    if (track.kind === "video") setVideos((videos) => [...videos, track]);
    else setAudios((audios) => [...audios, track]);
  };

  const removeTrack = (track) => {
    if (track.kind === "video")
      setVideos((videos) => videos.filter((v) => v !== track));
    else setAudios((audios) => audios.filter((a) => a !== track));
  };

  const getInitialTracks = (tracks) => {
    //tracks are null if they are not subscribed to, we don't want to return those
    return Array.from(tracks.values())
      .map((publication) => publication.track)
      .filter((track) => track !== null);
  };

  useEffect(() => {
    //Get Tracks that participant has already published
    setVideos(getInitialTracks(participant.videoTracks));
    setAudios(getInitialTracks(participant.audioTracks));

    //Checks for new tracks that a participant publishes
    participant.on("trackSubscribed", (track) => {
      addTrack(track);
    });

    participant.on("trackUnsubscribed", (track) => {
      removeTrack(track);
    });
  }, [participant]);

  //attach video
  useEffect(() => {
    const video = videos[0];
    if (video) video.attach(videoRef.current);
  }, [videos]);

  useEffect(() => {
    const audio = audios[0];
    if (audio) audio.attach(audioRef.current);
  }, [audios]);

  return (
    <div>
      <h3>{participant.identity}</h3>
      <video ref={videoRef} autoPlay playsInline />
      <audio ref={audioRef} autoPlay muted />
    </div>
  );
};

export default Participant;
