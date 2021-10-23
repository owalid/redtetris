import React,  { useContext } from "react";
import Enzyme from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import { SocketContext } from "../../../src/client/context/SocketContext";
import { SocketContextProvider } from "../../../src/client/context/SocketContext";
import SocketListener from "../../../src/client/listeners/SocketListener";

Enzyme.configure({ adapter: new Adapter() });

export const TestAppSocketProvider = ({ children }) => (
  <SocketContextProvider>{children}</SocketContextProvider>
);

export const TestAppSocketProviderWithSocketClient = ({ children }) => {
  return (
    <TestAppSocketProvider>
      <SocketListenerSetterComp>{children}</SocketListenerSetterComp>
    </TestAppSocketProvider>
  );
};

const SocketListenerSetterComp = ({ children }) => {
  const { socketClient } = useContext(SocketContext);
  SocketListener(socketClient);
  return <>{children}</>;
};
