import React from "react";
import _ from 'lodash'
import '@testing-library/jest-dom/extend-expect';
import io from 'socket.io-client';
import Enzyme from "enzyme";
import { render, fireEvent } from '@testing-library/react'
import Adapter from "enzyme-adapter-react-16";
import { TestAppSocketProvider } from "../helpers/SocketContext";
import FormCreateRoom from "../../../src/client/components/FormCreateRoom";

jest.mock('socket.io-client', () => {
  const mSocket = {
    emit: jest.fn(),
  };
  return jest.fn(() => mSocket);
});

Enzyme.configure({ adapter: new Adapter() });


describe('FormCreateRoom component', () => {  
  it('Can mount', () => {
    const Wr = () => (
      <TestAppSocketProvider>
        <FormCreateRoom
          login="toto"
        />
      </TestAppSocketProvider>
    )
    render(<Wr />);
  })

  
  it('No game', () => {
    const ENDPOINT = 'localhost:3004';
    const mockSocket = io(ENDPOINT);

    const Wr = () => (
      <TestAppSocketProvider>
        <FormCreateRoom
          login="toto"
        />
      </TestAppSocketProvider>
    )
    const { container } = render(<Wr />);
    const btn_create_room = container.querySelector('.test--btn-create-room')
    fireEvent.click(btn_create_room)
    expect(mockSocket.emit).toHaveBeenCalledTimes(1)
  })

});