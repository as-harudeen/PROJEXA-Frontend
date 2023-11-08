import { createContext, useContext } from "react";
import {Socket} from 'socket.io-client';

interface SocketContext {
    socket: Socket;
    myStream: MediaStream | null;
    setMyStream: React.Dispatch<React.SetStateAction<MediaStream | null>>
}


export const SocketContext = createContext<SocketContext>({} as SocketContext);

export const useSocket = () => {
    return useContext(SocketContext);
}

