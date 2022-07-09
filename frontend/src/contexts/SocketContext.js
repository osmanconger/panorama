//Create a context for the socket so that all components now have access to this socket
import { createContext } from "react";

const SocketContext = createContext();

const SocketProvider = ({ children }) => {
  return <SocketContext.Provider value={{}}>{children}</SocketContext.Provider>;
};

export { SocketProvider, SocketContext };
