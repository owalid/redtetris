import { MemoryRouter, Route, Router } from 'react-router-dom';
import ReactRouter from 'react-router'
import { uuid_1, visitor_player, rooms_instance, player_instance1, room1, player_visitor_instance, player_instance2, room2, room3, player_instance4 } from '../../helpers/data';
import React, { useContext, useEffect } from "react";
import io from 'socket.io-client';
import Enzyme, { shallow } from "enzyme";
import { render, fireEvent } from '@testing-library/react'
import Adapter from "enzyme-adapter-react-16";
import Room from '../../../../src/client/pages/_room/Room'
import { TestAppAlertProvider } from "../../helpers/AlertContext";
import { TestAppRoomsProvider } from "../../helpers/RoomsContext";
import { TestAppSocketProvider } from "../../helpers/SocketContext";
import { TestAppUserProvider } from "../../helpers/UserContext";
import { describe, expect } from "@jest/globals";
import { Context as RoomsContext } from "../../../../src/client/context/RoomsContext";
import { Context as UserContext } from "../../../../src/client/context/UserContext";
import { createMemoryHistory } from "history";

jest.mock('socket.io-client', () => {
  const mSocket = {
    emit: jest.fn(),
  };
  return jest.fn(() => mSocket);
});
Enzyme.configure({ adapter: new Adapter() });

describe("Test Room", () => {

  it("can shallow", () => {
    const CurrentRoomsSetter = ({ children }) => {
      const { updateRooms } = useContext(RoomsContext);
      useEffect(() => {
        updateRooms(rooms_instance);
      }, []);
      return <>{children}</>;
    };
    const Wrapper = () => (
      <TestAppAlertProvider>
        <TestAppUserProvider>
            <TestAppSocketProvider>
            <TestAppRoomsProvider>
              <CurrentRoomsSetter>
                <MemoryRouter initialEntries={[ `/room/${uuid_1}` ]}>
                  <Route path='/room/:uuidRoom' render={(props) => {
                    return ( <Room {...props } /> )
                  }} />
                </MemoryRouter>
              </CurrentRoomsSetter>
            </TestAppRoomsProvider>
            </TestAppSocketProvider>
        </TestAppUserProvider>
      </TestAppAlertProvider>
    );

  
    const wrapper = shallow(<Wrapper />);
    expect(wrapper).not.toBeNull()
  })

  it("Test login input", () => {
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

    const mountWithRouter = node => render(<MemoryRouter>{node}</MemoryRouter>);

    const Wrapper = () => (
      <TestAppAlertProvider>
        <TestAppUserProvider>
          <CurrentPlayerSetter>
            <TestAppRoomsProvider>
              <CurrentRoomsSetter>
                <TestAppSocketProvider>
                  <Room />
                </TestAppSocketProvider>
              </CurrentRoomsSetter>
            </TestAppRoomsProvider>
          </CurrentPlayerSetter>
        </TestAppUserProvider>
      </TestAppAlertProvider>
    );

    const wrapper = mountWithRouter(<Wrapper />);
    expect(wrapper).not.toBeNull()
  })

  it("room not started and admin player", () => {

    const ENDPOINT = 'localhost:3004';
    const mockSocket = io(ENDPOINT);

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
    const history = createMemoryHistory({ initialEntries: [`/${room1.channel}[${player_instance1.name}]`] });
    const uuidRoom = room1.channel

    jest.spyOn(ReactRouter, 'useParams').mockReturnValue({ uuidRoom });

    const Wrap = () => (
      <TestAppAlertProvider>
        <TestAppUserProvider>
          <CurrentPlayerSetter>
            <TestAppRoomsProvider>
              <CurrentRoomsSetter>
                <TestAppSocketProvider>
                  <Router history={history}>
                    <Room />
                  </Router>
                </TestAppSocketProvider>
              </CurrentRoomsSetter>
            </TestAppRoomsProvider>
          </CurrentPlayerSetter>
        </TestAppUserProvider>
      </TestAppAlertProvider>
    );

    const { container } = render(<Wrap />);

    const btn_start_game = container.querySelector('.test--btn-start-game')
    expect(btn_start_game).not.toBeNull()
    fireEvent.click(btn_start_game)
    expect(mockSocket.emit).toHaveBeenCalledTimes(1)

  })

  it("room not started and not admin player", () => {

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
    const history = createMemoryHistory({ initialEntries: [`/${room1.channel}[${player_visitor_instance.name}]`] });
    const uuidRoom = room1.channel

    jest.spyOn(ReactRouter, 'useParams').mockReturnValue({ uuidRoom });

    const Wrap = () => (
      <TestAppAlertProvider>
        <TestAppUserProvider>
          <CurrentPlayerSetter>
            <TestAppRoomsProvider>
              <CurrentRoomsSetter>
                <TestAppSocketProvider>
                  <Router history={history}>
                    <Room />
                  </Router>
                </TestAppSocketProvider>
              </CurrentRoomsSetter>
            </TestAppRoomsProvider>
          </CurrentPlayerSetter>
        </TestAppUserProvider>
      </TestAppAlertProvider>
    );

    const { container } = render(<Wrap />);

    const text_wait_admin = container.querySelector('.test--wait-admin-message')
    expect(text_wait_admin).not.toBeNull()
  })

  it("room not playing", () => {
    const CurrentPlayerSetter = ({ children }) => {
      const { updatePlayer } = useContext(UserContext);
      useEffect(() => {
        updatePlayer(player_instance4);
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
    const history = createMemoryHistory({ initialEntries: [`/${room3.channel}[${player_instance4.name}]`] });
    const uuidRoom = room3.channel

    jest.spyOn(ReactRouter, 'useParams').mockReturnValue({ uuidRoom });

    const Wrap = () => (
      <TestAppAlertProvider>
        <TestAppUserProvider>
          <CurrentPlayerSetter>
            <TestAppRoomsProvider>
              <CurrentRoomsSetter>
                <TestAppSocketProvider>
                  <Router history={history}>
                    <Room />
                  </Router>
                </TestAppSocketProvider>
              </CurrentRoomsSetter>
            </TestAppRoomsProvider>
          </CurrentPlayerSetter>
        </TestAppUserProvider>
      </TestAppAlertProvider>
    );

    const { container } = render(<Wrap />);
    const text_modal_active = container.querySelector('.test--modal-active')
    expect(text_modal_active).not.toBeNull()
  })

  it("room started, playing", () => {
    const CurrentPlayerSetter = ({ children }) => {
      const { updatePlayer } = useContext(UserContext);
      useEffect(() => {
        updatePlayer(player_instance2);
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
    const history = createMemoryHistory({ initialEntries: [`/${room2.channel}[${player_instance2.name}]`] });
    const uuidRoom = room2.channel

    jest.spyOn(ReactRouter, 'useParams').mockReturnValue({ uuidRoom });

    const Wrap = () => (
      <TestAppAlertProvider>
        <TestAppUserProvider>
          <CurrentPlayerSetter>
            <TestAppRoomsProvider>
              <CurrentRoomsSetter>
                <TestAppSocketProvider>
                  <Router history={history}>
                    <Room />
                  </Router>
                </TestAppSocketProvider>
              </CurrentRoomsSetter>
            </TestAppRoomsProvider>
          </CurrentPlayerSetter>
        </TestAppUserProvider>
      </TestAppAlertProvider>
    );

    const { container } = render(<Wrap />);
    
    const is_playing = container.querySelector('.test--is-playing')
    expect(is_playing).not.toBeNull()
  })
})