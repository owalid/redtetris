import React, { useContext, useEffect } from "react";
import Enzyme from "enzyme";
import { player_instance1, room1 } from "../helpers/data";
import Adapter from "enzyme-adapter-react-16";
import { Provider as UserProvider } from "../../../src/client/context/UserContext";
import { Context as UserContext } from "../../../src/client/context/UserContext";

Enzyme.configure({ adapter: new Adapter() });

export const TestAppUserProvider = ({ children }) => (
  <UserProvider>{children}</UserProvider>
);

export const TestAppUserProviderWithPlayer = ({ children }) => (
  <TestAppUserProvider>
    <CurrentUserSetter>{children}</CurrentUserSetter>
  </TestAppUserProvider>
);

export const TestAppUserProviderWithPlayerVisitor = ({ children }) => (
  <TestAppUserProvider>
    <CurrentUserVisitorSetter>{children}</CurrentUserVisitorSetter>
  </TestAppUserProvider>
);

const CurrentUserSetter = ({ children }) => {
  const { updateUuidRoom, updatePlayer } = useContext(UserContext);
  useEffect(() => {
    updateUuidRoom(room1.channel);
    updatePlayer(player_instance1);
  }, []);
  return <>{children}</>;
};

const CurrentUserVisitorSetter = ({ children }) => {
  const { updateUuidRoom, updatePlayer } = useContext(UserContext);
  useEffect(() => {
    updateUuidRoom(room1.channel);
    updatePlayer(player_visitor_instance);
  }, []);
  return <>{children}</>;
};
