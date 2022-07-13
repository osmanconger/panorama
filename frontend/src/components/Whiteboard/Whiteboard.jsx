import { Tldraw } from "@tldraw/tldraw";
import { useMultiplayerState } from "./useMultiplayerState";

const Whiteboard = ({ roomId }) => {
  const { onMount, ...events } = useMultiplayerState(roomId);

  return (
    <div>
      <Tldraw
        showMenu={false}
        showMultiplayerMenu={false}
        showPages={false}
        onMount={onMount}
        {...events}
      />
    </div>
  );
};

export default Whiteboard;
