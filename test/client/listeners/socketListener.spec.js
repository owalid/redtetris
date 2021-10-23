import React from 'react';
import io from 'socket.io-client';
import { render } from '@testing-library/react';
import HomePage from "../../../src/client/pages/home/Home"
import { player_instance1, room2, room1 } from "../helpers/data";
import { TestAppAlertProvider } from "../helpers/AlertContext";
import { TestAppRoomsProvider } from "../helpers/RoomsContext";
import { TestAppSocketProvider } from "../helpers/SocketContext";
import { TestAppUserProvider } from "../helpers/UserContext";

jest.mock('socket.io-client', () => {
  const mSocket = {
    emit: jest.fn(),
  };
  return jest.fn(() => mSocket);
});

describe("Test sockets listener", () => {
  const rooms = jest.fn();
  const Wrapper = () => (
    <TestAppAlertProvider>
      <TestAppUserProvider>
        <TestAppRoomsProvider value={{ rooms }}>
          <TestAppSocketProvider>
            <HomePage />
          </TestAppSocketProvider>
        </TestAppRoomsProvider>
      </TestAppUserProvider>
    </TestAppAlertProvider>
  );

  test("Test ping work", () => {
    const ENDPOINT = 'localhost:3004';
    const mockSocket = io(ENDPOINT);
    render(<Wrapper />);
    expect(mockSocket.emit).toHaveBeenCalledTimes(0)
  })

  test("Test client/update-rooms", () => {
    const ENDPOINT = 'localhost:3004';
    const mockSocket = io(ENDPOINT);
    render(<Wrapper />);
    mockSocket.emit('client/update-rooms', { _data: room2 });
    expect(mockSocket.emit).toHaveBeenCalledTimes(1)
  })

  test("Test client/join-room", () => {
    const ENDPOINT = 'localhost:3004';
    const mockSocket = io(ENDPOINT);
    render(<Wrapper />);
    mockSocket.emit('client/join-room', {
        uuidRoom: room1.channel,
        player: player_instance1
    });
    expect(mockSocket.emit).toHaveBeenCalledTimes(2)
  })

  test("Test client/update-user", () => {
    const ENDPOINT = 'localhost:3004';
    const mockSocket = io(ENDPOINT);
    render(<Wrapper />);
    mockSocket.emit('client/update-user',  {
        uuidRoom: room1.channel,
        player: player_instance1
    });
    expect(mockSocket.emit).toHaveBeenCalledTimes(3)
  })

  test("Test client/start-game", () => {
    const ENDPOINT = 'localhost:3004';
    const mockSocket = io(ENDPOINT);
    render(<Wrapper />);
    mockSocket.emit('client/start-game');
    expect(mockSocket.emit).toHaveBeenCalledTimes(4)
  })

})