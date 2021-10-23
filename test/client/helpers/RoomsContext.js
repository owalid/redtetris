import React, { useContext, useEffect } from "react";
import Enzyme from "enzyme";
import { rooms_instance } from "./data";
import Adapter from "enzyme-adapter-react-16";
import { Provider as RoomsProvider } from "../../../src/client/context/RoomsContext";
import { Context as RoomsContext } from "../../../src/client/context/RoomsContext";

Enzyme.configure({ adapter: new Adapter() });

export const TestAppRoomsProvider = ({ children }) => (
  <RoomsProvider>{children}</RoomsProvider>
);

export const TestAppRoomsProviderWithRooms = ({ children }) => (
  <TestAppRoomsProvider>
    <CurrentRoomsSetter>{children}</CurrentRoomsSetter>
  </TestAppRoomsProvider>
);

export const CurrentRoomsSetter = ({ children }) => {
  const { updateRooms } = useContext(RoomsContext);
  useEffect(() => {
    updateRooms(rooms_instance);
  }, []);
  return <>{children}</>;
};
