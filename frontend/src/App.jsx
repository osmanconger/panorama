import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Room from "./components/Room/Room";
import Lobby from "./views/Lobby";

function App() {
  // //access token to room
  // const [room, setRoom] = useState(null);

  // const updateRoom = (room) => {
  //   setRoom(room);
  // };

  return (
    <BrowserRouter>
      <Routes>
        {/* <Route path="/:roomId" element={<Room room={room} />} /> */}
        <Route path="/" element={<Lobby />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
