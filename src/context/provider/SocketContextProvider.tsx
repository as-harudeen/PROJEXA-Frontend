import { FC, useMemo, useState } from "react";
import { SocketContext } from "../useSocket";
import { io } from "socket.io-client";

interface SocketContextProviderProps {
  children: React.ReactNode;
}

export const SocketContextProvider: FC<SocketContextProviderProps> = ({
  children,
}) => {
  const socket = useMemo(
    () => io("ws://localhost:8000", { withCredentials: true }),
    []
  );

  const [myStream, setMyStream] = useState<MediaStream | null>(null);

  return (
    <SocketContext.Provider value={{ socket, myStream, setMyStream }}>
      {children}
    </SocketContext.Provider>
  );
};
