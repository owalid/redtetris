import React, { useContext, useEffect } from "react";
import '@testing-library/jest-dom/extend-expect';
import Enzyme, { shallow } from "enzyme";
import Chat from '../../../src/client/components/Chat'
import { render, fireEvent } from '@testing-library/react'
import Adapter from "enzyme-adapter-react-16";
import io from 'socket.io-client';
import { rooms_instance, visitor_player, room1, room3 } from '../helpers/data'
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

describe('Chat component', () => {

  const Wrapper = () => (
    <Chat />
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
                <Chat
                  uuidRoom={room1.channel}
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

  it('Test button message', () => {
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
                <Chat
                  uuidRoom={room1.channel}
                  />
              </CurrentRoomsSetter>
            </TestAppRoomsProvider>
          </CurrentPlayerSetter>
        </TestAppUserProvider>
      </TestAppSocketProvider>
    )
    const { container, getByTestId } = render(<Wr />);
    const input_messsage = getByTestId('messageChat');
    const button_submit = container.querySelector('.test--btn-submit-message')

    expect(button_submit).toBeDisabled();
    fireEvent.change(input_messsage, { target: { value: 'abcd' } });
    expect(button_submit).not.toBeDisabled();
  })

  it('Send message', () => {
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
                <Chat
                  uuidRoom={room1.channel}
                  />
              </CurrentRoomsSetter>
            </TestAppRoomsProvider>
          </CurrentPlayerSetter>
        </TestAppUserProvider>
      </TestAppSocketProvider>
    )
    const { container, getByTestId } = render(<Wr />);
    const input_messsage = getByTestId('messageChat');
    const button_submit = container.querySelector('.test--btn-submit-message')
    
    fireEvent.change(input_messsage, { target: { value: 'abcd' } });
    fireEvent.click(button_submit)
  })

  it('Focus unFocus input', () => {
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
                <Chat
                  uuidRoom={room1.channel}
                  />
              </CurrentRoomsSetter>
            </TestAppRoomsProvider>
          </CurrentPlayerSetter>
        </TestAppUserProvider>
      </TestAppSocketProvider>
    )
    const { container, getByTestId } = render(<Wr />);
    const input_messsage = getByTestId('messageChat');
    
    fireEvent.focus(input_messsage)
    fireEvent.focusOut(input_messsage)
  })

  it('Have base message', () => {
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
                <Chat
                  uuidRoom={room1.channel}
                  />
              </CurrentRoomsSetter>
            </TestAppRoomsProvider>
          </CurrentPlayerSetter>
        </TestAppUserProvider>
      </TestAppSocketProvider>
    )
    const { container } = render(<Wr />);
    const message_base = container.querySelector('.test--message-base')
    expect(message_base).not.toBeNull();

  })

  it('Have message user', () => {
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
                <Chat
                  uuidRoom={room3.channel}
                  />
              </CurrentRoomsSetter>
            </TestAppRoomsProvider>
          </CurrentPlayerSetter>
        </TestAppUserProvider>
      </TestAppSocketProvider>
    )
    const { container } = render(<Wr />);
    const message_base = container.querySelector('.test--message-user')
    expect(message_base).not.toBeNull();

  })

  it('Send message', () => {
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
                <Chat
                  uuidRoom={room1.channel}
                  />
              </CurrentRoomsSetter>
            </TestAppRoomsProvider>
          </CurrentPlayerSetter>
        </TestAppUserProvider>
      </TestAppSocketProvider>
    )

    const { container, getByTestId } = render(<Wr />);
    const input_messsage = getByTestId('messageChat');
    const button_submit = container.querySelector('.test--btn-submit-message')
    fireEvent.change(input_messsage, { target: { value: 'abcd' } });
    fireEvent.click(button_submit)
    const message_user = container.querySelector('.test--message-user')
    expect(message_user).toBeNull();
  })

  it('Scape without focus', () => {
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
                <Chat
                  uuidRoom={room1.channel}
                  />
              </CurrentRoomsSetter>
            </TestAppRoomsProvider>
          </CurrentPlayerSetter>
        </TestAppUserProvider>
      </TestAppSocketProvider>
    )

    const { container } = render(<Wr />);
    fireEvent.keyDown(container, {
      key: "Escape",
      code: "Escape",
      keyCode: 27,
      charCode: 27
    });
    expect(mockSocket.emit).toHaveBeenCalledTimes(2)
  })

  it('Arrow without focus', () => {
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
                <Chat
                  uuidRoom={room1.channel}
                  />
              </CurrentRoomsSetter>
            </TestAppRoomsProvider>
          </CurrentPlayerSetter>
        </TestAppUserProvider>
      </TestAppSocketProvider>
    )

    const { container } = render(<Wr />);
    fireEvent.keyDown(container, {
      key: "ArrowRight",
      code: "ArrowRight",
      keyCode: 39,
      charCode: 39
    });
    expect(mockSocket.emit).toHaveBeenCalledTimes(2)
  })

});