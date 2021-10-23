import React, { useContext, useEffect } from "react";
import _ from 'lodash'
import '@testing-library/jest-dom/extend-expect';
import Enzyme, { shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import Board from '../../../src/client/components/Board'
import { render } from '@testing-library/react'
import { Context as UserContext } from "../../../src/client/context/UserContext";
import { Context as RoomsContext } from "../../../src/client/context/RoomsContext";
import { TestAppUserProvider } from "../helpers/UserContext";
import { player_instance1, rooms_instance, visitor_player, room1, player_visitor_instance } from '../helpers/data'
import { TestAppSocketProvider } from "../helpers/SocketContext";
import { TestAppRoomsProvider } from "../helpers/RoomsContext";


Enzyme.configure({ adapter: new Adapter() });
describe('Board component', () => {
  it('Is exists', () => {
    const CurrentUserSetter = ({ children }) => {
      const { updateUuidRoom, updatePlayer } = useContext(UserContext);
      useEffect(() => {
        updateUuidRoom("112233445566778899");
        updatePlayer(visitor_player);
      }, [])
      return <>{children}</>;
    };

    const Wrapper = () => (
      <CurrentUserSetter>
        <Board />
      </CurrentUserSetter>
    )
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
                <Board
                  song={false}
                  currentRoom={room1}
                  isEnd={room1.players[player_instance1.uuid].end}
                  mapGame={room1.players[player_instance1.uuid].currentMapGame}
                  isAlone={Object.keys(room1.players).length === 1}
                  mapsGamePreview={_.filter(room1.players, item => item.uuid !== player_instance1.uuid && !item.visitor)}
                  score={room1.players[player_instance1.uuid].score}
                  sheet={room1.players[player_instance1.uuid].sheets[0]}
                  finalScore={room1.finalScore}
                  uuidRoom={room1.channel}
                />
              </CurrentRoomsSetter>
            </TestAppRoomsProvider>
          </CurrentPlayerSetter>
        </TestAppUserProvider>
      </TestAppSocketProvider>
    )
    render(<Wr />);
  })

  it('Board Visitor', () => {
    const CurrentPlayerSetter = ({ children }) => {
      const { updatePlayer } = useContext(UserContext);
      useEffect(() => {
        updatePlayer(player_visitor_instance);
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
                <Board
                  song={false}
                  currentRoom={room1}
                  isEnd={room1.players[player_visitor_instance.uuid].end}
                  mapGame={room1.players[player_visitor_instance.uuid].currentMapGame}
                  isAlone={Object.keys(room1.players).length === 1}
                  mapsGamePreview={_.filter(room1.players, item => item.uuid !== player_visitor_instance.uuid && !item.visitor)}
                  score={room1.players[player_visitor_instance.uuid].score}
                  sheet={room1.players[player_visitor_instance.uuid].sheets[0]}
                  finalScore={room1.finalScore}
                  uuidRoom={room1.channel}
                />
              </CurrentRoomsSetter>
            </TestAppRoomsProvider>
          </CurrentPlayerSetter>
        </TestAppUserProvider>
      </TestAppSocketProvider>
    )
    const { container } = render(<Wr />);
    const container_not_visitor = container.querySelector('.test--visitor-player')
    expect(container_not_visitor).toBeNull()
  })

  it('Board Player', () => {
    const CurrentPlayerSetter = ({ children }) => {
      const { updatePlayer } = useContext(UserContext);
      useEffect(() => {
        updatePlayer(player_instance1);
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
                <Board
                  song={false}
                  currentRoom={room1}
                  isEnd={room1.players[player_instance1.uuid].end}
                  mapGame={room1.players[player_instance1.uuid].currentMapGame}
                  isAlone={Object.keys(room1.players).length === 1}
                  mapsGamePreview={_.filter(room1.players, item => item.uuid !== player_instance1.uuid && !item.visitor)}
                  score={room1.players[player_instance1.uuid].score}
                  sheet={room1.players[player_instance1.uuid].sheets[0]}
                  finalScore={room1.finalScore}
                  uuidRoom={room1.channel}
                />
              </CurrentRoomsSetter>
            </TestAppRoomsProvider>
          </CurrentPlayerSetter>
        </TestAppUserProvider>
      </TestAppSocketProvider>
    )
    const { container } = render(<Wr />);
    const container_not_visitor = container.querySelector('.test--player')
    expect(container_not_visitor).not.toBeNull()
  })

});
