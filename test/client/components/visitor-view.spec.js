import React, { useContext, useEffect } from "react";
import _ from 'lodash'
import '@testing-library/jest-dom/extend-expect';
import io from 'socket.io-client';
import Enzyme from "enzyme";
import { render, fireEvent } from '@testing-library/react'
import Adapter from "enzyme-adapter-react-16";
import { player_instance1, rooms_instance, visitor_player, room1 } from '../helpers/data'
import { TestAppSocketProvider } from "../helpers/SocketContext";
import { TestAppUserProvider } from "../helpers/UserContext";
import { TestAppRoomsProvider } from "../helpers/RoomsContext";
import { Context as UserContext } from "../../../src/client/context/UserContext";
import { Context as RoomsContext } from "../../../src/client/context/RoomsContext";
import VisitorView from "../../../src/client/components/VisitorView";

jest.mock('socket.io-client', () => {
  const mSocket = {
    emit: jest.fn(),
  };
  return jest.fn(() => mSocket);
});

Enzyme.configure({ adapter: new Adapter() });


describe('VisitorView component', () => {

  const boxProps = {
    bgcolor: 'background.paper',
    bordercolor: 'text.primary',
    border: 1,
    borderradius: "borderRadius",
    style: { backgroundColor: 'white', height: '100%', width: '100%'},
    m: 1
  };
  
  
  it('Can mount', () => {
    const CurrentRoomsSetter = ({ children }) => {
      const { updateRooms } = useContext(RoomsContext);
      useEffect(() => {
        updateRooms(rooms_instance);
      }, []);
      return <>{children}</>;
    };
    const CurrentPlayerSetter = ({ children }) => {
      const { updatePlayer } = useContext(UserContext);
      useEffect(() => {
        updatePlayer(visitor_player);
      }, [])
      return <>{children}</>;
    };
    const Wr = () => (
      <TestAppSocketProvider>
          <TestAppUserProvider>
            <CurrentPlayerSetter>
              <TestAppRoomsProvider>
                <CurrentRoomsSetter>
                  <VisitorView
                    uuidRoom={room1.channel}
                    currentRoom={room1}
                    player={player_instance1}
                    mapsGamePreview={_.filter(room1.players, item => item.uuid !== player_instance1.uuid && !item.visitor)}
                    isAlone={Object.keys(room1.players).length === 1}
                    isEnd={room1.players[player_instance1.uuid].end}
                    boxProps={boxProps}
                  />
                </CurrentRoomsSetter>
              </TestAppRoomsProvider>
            </CurrentPlayerSetter>
          </TestAppUserProvider>
        </TestAppSocketProvider>
      )
    render(<Wr />);
  })
  
  it('is not null', () => {
    const CurrentRoomsSetter = ({ children }) => {
      const { updateRooms } = useContext(RoomsContext);
      useEffect(() => {
        updateRooms(rooms_instance);
      }, []);
      return <>{children}</>;
    };
    const CurrentPlayerSetter = ({ children }) => {
      const { updatePlayer } = useContext(UserContext);
      useEffect(() => {
        updatePlayer(visitor_player);
      }, [])
      return <>{children}</>;
    };
    const Wr = () => (
      <TestAppSocketProvider>
          <TestAppUserProvider>
            <CurrentPlayerSetter>
              <TestAppRoomsProvider>
                <CurrentRoomsSetter>
                  <VisitorView
                    uuidRoom={room1.channel}
                    currentRoom={room1}
                    player={player_instance1}
                    mapsGamePreview={_.filter(room1.players, item => item.uuid !== player_instance1.uuid && !item.visitor)}
                    isAlone={Object.keys(room1.players).length === 1}
                    isEnd={room1.players[player_instance1.uuid].end}
                    boxProps={boxProps}
                  />
                </CurrentRoomsSetter>
              </TestAppRoomsProvider>
            </CurrentPlayerSetter>
          </TestAppUserProvider>
        </TestAppSocketProvider>
      )

    const { container } = render(<Wr />);
    const container_visitor_view = container.querySelector('.test--visitor-view')
    expect(container_visitor_view).not.toBeNull()
  })

  it('is end button null', () => {
    const CurrentRoomsSetter = ({ children }) => {
      const { updateRooms } = useContext(RoomsContext);
      useEffect(() => {
        updateRooms(rooms_instance);
      }, []);
      return <>{children}</>;
    };
    const CurrentPlayerSetter = ({ children }) => {
      const { updatePlayer } = useContext(UserContext);
      useEffect(() => {
        updatePlayer(visitor_player);
      }, [])
      return <>{children}</>;
    };
    const Wr = () => (
      <TestAppSocketProvider>
          <TestAppUserProvider>
            <CurrentPlayerSetter>
              <TestAppRoomsProvider>
                <CurrentRoomsSetter>
                  <VisitorView
                    uuidRoom={room1.channel}
                    currentRoom={room1}
                    player={player_instance1}
                    mapsGamePreview={_.filter(room1.players, item => item.uuid !== player_instance1.uuid && !item.visitor)}
                    isAlone={Object.keys(room1.players).length === 1}
                    isEnd={room1.players[player_instance1.uuid].end}
                    boxProps={boxProps}
                  />
                </CurrentRoomsSetter>
              </TestAppRoomsProvider>
            </CurrentPlayerSetter>
          </TestAppUserProvider>
        </TestAppSocketProvider>
      )

    const { container } = render(<Wr />);
    const container_visitor_regame = container.querySelector('.test--regame-visitor')
    expect(container_visitor_regame).toBeNull()
  })

  it('is leave button not null', () => {
    const CurrentRoomsSetter = ({ children }) => {
      const { updateRooms } = useContext(RoomsContext);
      useEffect(() => {
        updateRooms(rooms_instance);
      }, []);
      return <>{children}</>;
    };
    const CurrentPlayerSetter = ({ children }) => {
      const { updatePlayer } = useContext(UserContext);
      useEffect(() => {
        updatePlayer(visitor_player);
      }, [])
      return <>{children}</>;
    };
    const Wr = () => (
      <TestAppSocketProvider>
          <TestAppUserProvider>
            <CurrentPlayerSetter>
              <TestAppRoomsProvider>
                <CurrentRoomsSetter>
                  <VisitorView
                    uuidRoom={room1.channel}
                    currentRoom={room1}
                    player={player_instance1}
                    mapsGamePreview={_.filter(room1.players, item => item.uuid !== player_instance1.uuid && !item.visitor)}
                    isAlone={Object.keys(room1.players).length === 1}
                    isEnd={room1.players[player_instance1.uuid].end}
                    boxProps={boxProps}
                  />
                </CurrentRoomsSetter>
              </TestAppRoomsProvider>
            </CurrentPlayerSetter>
          </TestAppUserProvider>
        </TestAppSocketProvider>
      )

    const { container } = render(<Wr />);
    const container_visitor = container.querySelector('.test--leave-visitor')
    expect(container_visitor).not.toBeNull()
  })

  it('Click leave button', () => {

    const ENDPOINT = 'localhost:3004';
    const mockSocket = io(ENDPOINT);

    const CurrentRoomsSetter = ({ children }) => {
      const { updateRooms } = useContext(RoomsContext);
      useEffect(() => {
        updateRooms(rooms_instance);
      }, []);
      return <>{children}</>;
    };
    const CurrentPlayerSetter = ({ children }) => {
      const { updatePlayer } = useContext(UserContext);
      useEffect(() => {
        updatePlayer(visitor_player);
      }, [])
      return <>{children}</>;
    };
    const Wr = () => (
      <TestAppSocketProvider>
          <TestAppUserProvider>
            <CurrentPlayerSetter>
              <TestAppRoomsProvider>
                <CurrentRoomsSetter>
                  <VisitorView
                    uuidRoom={room1.channel}
                    currentRoom={room1}
                    player={player_instance1}
                    mapsGamePreview={_.filter(room1.players, item => item.uuid !== player_instance1.uuid && !item.visitor)}
                    isAlone={Object.keys(room1.players).length === 1}
                    isEnd={room1.players[player_instance1.uuid].end}
                    boxProps={boxProps}
                  />
                </CurrentRoomsSetter>
              </TestAppRoomsProvider>
            </CurrentPlayerSetter>
          </TestAppUserProvider>
        </TestAppSocketProvider>
      )

    const { container } = render(<Wr />);
    const button_leave = container.querySelector('.test--leave-visitor')
    fireEvent.click(button_leave)
    expect(button_leave).not.toBeNull()
    expect(mockSocket.emit).toHaveBeenCalledTimes(1)

  })

});