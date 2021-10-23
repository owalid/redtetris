import React, { useContext, useEffect } from "react";
import '@testing-library/jest-dom/extend-expect';
import Enzyme, { mount, shallow } from "enzyme";
import OtherPlayerGrid from '../../../src/client/components/OtherPlayerGrid'
import { render } from '@testing-library/react'
import Adapter from "enzyme-adapter-react-16";
import { player_instance1, rooms_instance, visitor_player, room1 } from '../helpers/data'
import { TestAppSocketProvider } from "../helpers/SocketContext";
import { TestAppUserProvider } from "../helpers/UserContext";
import { TestAppRoomsProvider } from "../helpers/RoomsContext";
import { Context as UserContext } from "../../../src/client/context/UserContext";
import { Context as RoomsContext } from "../../../src/client/context/RoomsContext";

Enzyme.configure({ adapter: new Adapter() });
describe('Alert component', () => {

  const Wrapper = () => (
    <OtherPlayerGrid />
  )

  it('Is exists', () => {
    const wrapper = shallow(<Wrapper />);
    expect(wrapper).toMatchSnapshot();
  });

  it('Can mount', () => {

    const CurrentPlayerSetter = ({ children }) => {
      const { updatePlayer } = useContext(UserContext);
      useEffect(() => {
        updatePlayer(visitor_player);
      }, [])
      return <>{children}</>;
    };

    const CurrentRoomsSetter = ({ children }) => {
      const { updateRooms } = useContext(RoomsContext);
      useEffect(() => {
        updateRooms(rooms_instance);
      }, []);
      return <>{children}</>;
    };

    const Wr = () => (
      <TestAppSocketProvider>
        <TestAppUserProvider>
          <CurrentPlayerSetter>
            <TestAppRoomsProvider>
              <CurrentRoomsSetter>
                <OtherPlayerGrid
                  isAlone={false}
                  mapGamePreview={room1.players[player_instance1.uuid]}
                />
              </CurrentRoomsSetter>
            </TestAppRoomsProvider>
          </CurrentPlayerSetter>
        </TestAppUserProvider>
      </TestAppSocketProvider>
    )
    const w = render(<Wr />);
    expect(w).not.toBeNull()
  })

});