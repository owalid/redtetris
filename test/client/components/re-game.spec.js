import React, { useContext, useEffect } from "react";
import '@testing-library/jest-dom/extend-expect';
import Enzyme, { shallow } from "enzyme";
import io from 'socket.io-client';
import ReGame from '../../../src/client/components/ReGame'
import { render, fireEvent } from '@testing-library/react'
import Adapter from "enzyme-adapter-react-16";
import { player_instance1, rooms_instance, visitor_player, room1, player_instanceSolo, room4 } from '../helpers/data'
import { TestAppSocketProvider } from "../helpers/SocketContext";
import { TestAppUserProvider } from "../helpers/UserContext";
import { TestAppRoomsProvider } from "../helpers/RoomsContext";
import { Context as UserContext } from "../../../src/client/context/UserContext";
import { Context as RoomsContext } from "../../../src/client/context/RoomsContext";


jest.mock('socket.io-client', () => {
  const mSocket = {
    emit: jest.fn(),
  };
  return jest.fn(() => mSocket);
});
Enzyme.configure({ adapter: new Adapter() });
describe('Alert component', () => {

  const Wrapper = () => (
    <ReGame />
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
                <ReGame
                  finalScore={[{ login: "owalid", score: 1000}, { login: "owalid2", score: 0 }]}
                  player={player_instance1}
                  currentRoom={room1}
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

  it('LeaveRoom', () => {
    const ENDPOINT = 'localhost:3004';
    const mockSocket = io(ENDPOINT);

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
                <ReGame
                  finalScore={[{ login: "owalid", score: 1000}, { login: "owalid2", score: 0 }]}
                  player={player_instance1}
                  currentRoom={room1}
                />
              </CurrentRoomsSetter>
            </TestAppRoomsProvider>
          </CurrentPlayerSetter>
        </TestAppUserProvider>
      </TestAppSocketProvider>
    )
    const w = render(<Wr />);
    expect(w).not.toBeNull()

    const { container } = render(<Wr />);
    const btn_leave_room = container.querySelector('.test--btn-leave-room')
    expect(btn_leave_room).not.toBeNull()
    fireEvent.click(btn_leave_room)
    expect(mockSocket.emit).toHaveBeenCalledTimes(1)

  })

  it('Resume', () => {
    const ENDPOINT = 'localhost:3004';
    const mockSocket = io(ENDPOINT);

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
                <ReGame
                  finalScore={[{ login: "owalid", score: 1000}, { login: "owalid2", score: 0 }]}
                  player={player_instance1}
                  currentRoom={room1}
                />
              </CurrentRoomsSetter>
            </TestAppRoomsProvider>
          </CurrentPlayerSetter>
        </TestAppUserProvider>
      </TestAppSocketProvider>
    )
    const w = render(<Wr />);
    expect(w).not.toBeNull()

    const { container } = render(<Wr />);
    const btn_regame = container.querySelector('.test--btn-re-game')
    expect(btn_regame).not.toBeNull()
    fireEvent.click(btn_regame)
    expect(mockSocket.emit).toHaveBeenCalledTimes(2)

  })

  it('Alone player', () => {
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
                <ReGame
                  finalScore={[ { login: "owalid44", score: 1000} ]}
                  player={player_instanceSolo}
                  currentRoom={room4}
                />
              </CurrentRoomsSetter>
            </TestAppRoomsProvider>
          </CurrentPlayerSetter>
        </TestAppUserProvider>
      </TestAppSocketProvider>
    )
    const w = render(<Wr />);
    expect(w).not.toBeNull()

    const { container } = render(<Wr />);
    const alone_text = container.querySelector('.test--alone-player')
    expect(alone_text).not.toBeNull()
  })

});