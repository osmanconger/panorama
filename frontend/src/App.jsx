import "./App.css";
import { Tldraw } from '@tldraw/tldraw';
import { useMultiplayerState } from "./useMultiplayerState";
import { roomID } from "./components/storage";

function App() {
  
  const { onMount, ...events } = useMultiplayerState(roomID);

  return (
    <div className="App">
      <h1>Panorama</h1>
      <Tldraw showMenu={false} showMultiplayerMenu={false}
      showPages={false} onMount = {onMount} {...events}/>
    </div>
  );
}

export default App;