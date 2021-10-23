import React, { useContext, useEffect } from "react";
import _ from 'lodash'
import '@testing-library/jest-dom/extend-expect';
import io from 'socket.io-client';
import Enzyme from "enzyme";
import { render, fireEvent } from '@testing-library/react'
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";
import { rooms_instance } from '../helpers/data'
import { TestAppSocketProvider } from "../helpers/SocketContext";
import { TestAppUserProvider } from "../helpers/UserContext";
import { TestAppRoomsProvider } from "../helpers/RoomsContext";
import { Context as RoomsContext } from "../../../src/client/context/RoomsContext";
import TablePlayers from "../../../src/client/components/TablePlayers";

jest.mock('socket.io-client', () => {
  const mSocket = {
    emit: jest.fn(),
  };
  return jest.fn(() => mSocket);
});

Enzyme.configure({ adapter: new Adapter() });


describe('VisitorView component', () => {  
  
  it('Can mount', () => {
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
              <TestAppRoomsProvider>
                <CurrentRoomsSetter>
                  <TablePlayers
                    login="toto"
                  />
                </CurrentRoomsSetter>
              </TestAppRoomsProvider>
          </TestAppUserProvider>
        </TestAppSocketProvider>
      )
    render(<Wr />);
  })

  
  it('No game', () => {
    const Wr = () => (
      <TestAppSocketProvider>
        <TestAppUserProvider>
          <TestAppRoomsProvider>
            <TablePlayers
              login="toto"
              />
          </TestAppRoomsProvider>
        </TestAppUserProvider>
      </TestAppSocketProvider>
      )
    const { container } = render(<Wr />);
    const container_no_game = container.querySelector('.test--no-game')
    const container_game = container.querySelector('.test--table-rooms')
    expect(container_no_game).not.toBeNull()
    expect(container_game).toBeNull()
  })
  
  it('Have game', () => {
    const CurrentRoomsSetter = ({ children }) => {
      const { updateRooms } = useContext(RoomsContext);
      useEffect(() => {
        updateRooms(rooms_instance);
      }, []);
      return <>{children}</>;
    };

    const Wrap = () => (
      <TestAppSocketProvider>
        <TestAppRoomsProvider>
          <CurrentRoomsSetter>
            <TablePlayers
              login="toto"
            />
          </CurrentRoomsSetter>
        </TestAppRoomsProvider>
      </TestAppSocketProvider>
    )

    const { container } = render(<Wrap />);
    const container_no_game = container.querySelector('.test--no-game')
    const container_game = container.querySelector('.test--table-rooms')
    expect(container_no_game).toBeNull()
    expect(container_game).not.toBeNull()
  })

  it('Can join room', () => {
    const ENDPOINT = 'localhost:3000';
    const mockSocket = io(ENDPOINT);
    const CurrentRoomsSetter = ({ children }) => {
      const { updateRooms } = useContext(RoomsContext);
      useEffect(() => {
        updateRooms(rooms_instance);
      }, []);
      return <>{children}</>;
    };

    const Wrap = () => (
      <TestAppSocketProvider>
        <TestAppRoomsProvider>
          <CurrentRoomsSetter>
            <TablePlayers
              login="toto"
            />
          </CurrentRoomsSetter>
        </TestAppRoomsProvider>
      </TestAppSocketProvider>
    )

    const { container } = render(<Wrap />);
    const join_room = container.querySelectorAll('.test--btn-join-room')[0]
    fireEvent.click(join_room)
    expect(mockSocket.emit).toHaveBeenCalledTimes(1)
  })

});