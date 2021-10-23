import { useEffect, useContext } from 'react';
import { Context as UserContext } from "../context/UserContext";
import { Context as RoomsContext } from "../context/RoomsContext";

export default (socketClient) => {
  const {
    updateUuidRoom,
    updatePlayer
  } = useContext(UserContext);

  const {
    updateRooms
  } = useContext(RoomsContext);

  useEffect(() => {
    socketClient.on('client/created-room', (data) => {
      const { uuidRoom, player } = data;
      updateUuidRoom(uuidRoom)
      updatePlayer(player)
    })

    socketClient.on('client/update-user', (data) => {
      const { uuidRoom, player } = data;
      updateUuidRoom(uuidRoom)
      updatePlayer(player)
    })

    socketClient.on('client/join-room', (data) => {
      const { uuidRoom, player } = data;
      updateUuidRoom(uuidRoom)
      updatePlayer(player)
    })

    socketClient.on('client/update-rooms', (rooms) => {
      updateRooms(rooms)
    })

    return () => socketClient.disconnect();
  }, [])
}