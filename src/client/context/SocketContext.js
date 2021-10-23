import React, { createContext } from "react"
import socketIOClient from "socket.io-client"
require('dotenv').config() 

export const SocketContext = createContext();

export const SocketContextProvider = ({ children }) => {
  const socketClient = socketIOClient(process.env.API_URL);  
  const sendSocket = (type, data = false) => {
    socketClient.emit(type, data);
  }
  
  return (
    <SocketContext.Provider
      value={{ socketClient, sendSocket }}
    >
      { children }
    </SocketContext.Provider>
  )
}