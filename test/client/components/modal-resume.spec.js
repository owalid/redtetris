import React from "react";
import '@testing-library/jest-dom/extend-expect';
import Enzyme from "enzyme";
import { render, fireEvent } from '@testing-library/react'
import Adapter from "enzyme-adapter-react-16";
import { player_instance1, room1 } from '../helpers/data'
import io from 'socket.io-client';
import { TestAppSocketProvider } from "../helpers/SocketContext";
import ModalResume from "../../../src/client/components/ModalResume";

jest.mock('socket.io-client', () => {
  const mSocket = {
    emit: jest.fn(),
  };
  return jest.fn(() => mSocket);
});
Enzyme.configure({ adapter: new Adapter() });
let song = false
describe('ModalResume component', () => {

  const Wrapper = () => (
    <TestAppSocketProvider>
      <ModalResume
        setSong={() => {song = true}}
        isPlaying={true}
        song={false}
        player={player_instance1}
        uuidRoom={room1.channel}
      />
    </TestAppSocketProvider>
  )

  it('Can mount', () => {
    render(<Wrapper />);
  })

  it('is not null', () => {
    const { container } = render(<Wrapper />);
    const container_modal = container.querySelector('.test--modal-resume')
    expect(container_modal).not.toBeNull()
  })

  it('ChangeSongPref', () => {
    const { container } = render(<Wrapper />);
    const btn_change_song = container.querySelector('.test--btn-change-song-pref')
    expect(btn_change_song).not.toBeNull()
    fireEvent.click(btn_change_song)
    expect(song).toBe(true)
  })

  it('LeaveRoom', () => {
    const ENDPOINT = 'localhost:3004';
    const mockSocket = io(ENDPOINT);

    const { container } = render(<Wrapper />);
    const btn_leave_room = container.querySelector('.test--btn-leave-room')
    expect(btn_leave_room).not.toBeNull()
    fireEvent.click(btn_leave_room)
    expect(mockSocket.emit).toHaveBeenCalledTimes(1)

  })

  it('Resume', () => {
    const ENDPOINT = 'localhost:3004';
    const mockSocket = io(ENDPOINT);

    const { container } = render(<Wrapper />);
    const btn_resume = container.querySelector('.test--btn-resume')
    expect(btn_resume).not.toBeNull()
    fireEvent.click(btn_resume)
    expect(mockSocket.emit).toHaveBeenCalledTimes(2)

  })

});