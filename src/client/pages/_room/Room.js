// Libs
import React, { useContext, useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom'
import Button from '@material-ui/core/Button';
import _ from 'lodash'

import { Context as AlertContext } from "../../context/AlertContext";
import { Context as UserContext } from "../../context/UserContext";
import { Context as RoomsContext } from "../../context/RoomsContext";
import { SocketContext } from "../../context/SocketContext";
import Board from '../../components/Board';
import ModalResume from '../../components/ModalResume';


const Room = () => {
  const { uuidRoom } = useParams()
  const [song, setSong] = useState(false);
  const history = useHistory()
  const { state: { player } } = useContext(UserContext);
  const { state: { rooms } } = useContext(RoomsContext);
  const { sendSocket } = useContext(SocketContext);
  const { sendAlert } = useContext(AlertContext);

  const handleSetStartGame = () => {
    sendSocket('server/start-game', { uuidRoom })
  }
  
  useEffect(() => {
    if (!player || !rooms || !rooms[uuidRoom]) {
      history.replace('/');
    }
  }, [player])

  useEffect(
    () => {
      sendAlert(`Bienvenu sur la partie #${uuidRoom}`, 'info')
      setTimeout(() => {
        sendAlert()
      }, 5000)
    }
  ,[])

  if (player && rooms && rooms[uuidRoom]) {
    if (!rooms[uuidRoom].isStart && (player.solo || player.admin)) {
      return (
        <div className="d-flex jcnt--center aitems--center fdir--row pt-3">
          <Button
            className="aself--center test--btn-start-game"
            variant="contained"
            onClick={handleSetStartGame}
            data-testid='gameElmt'
            >
            Commencer la partie !
          </Button>
        </div>
      )
    } else if (!rooms[uuidRoom].isStart && !player.admin) {
      return (
        <p className="test--wait-admin-message">
          Veuillez attendre que le maitre du jeux commence la partie
        </p>
      )
    } else if (!rooms[uuidRoom].isPlaying) {
      return (
        <div className="test--modal-active">
          <ModalResume
            isPlaying={!rooms[uuidRoom].isPlaying}
            setSong={setSong}
            song={song}
            player={player}
            uuidRoom={uuidRoom}
          />
        </div>
      )
    } else {
      return (
        <div className="overflow-h test--is-playing">
          <Board
            data-testid="gameElmt"
            song={song}
            currentRoom={rooms[uuidRoom]}
            isEnd={rooms[uuidRoom].players[player.uuid].end}
            mapGame={rooms[uuidRoom].players[player.uuid].currentMapGame}
            isAlone={Object.keys(rooms[uuidRoom].players).length === 1}
            mapsGamePreview={_.filter(rooms[uuidRoom].players, item => item.uuid !== player.uuid && !item.visitor)}
            score={rooms[uuidRoom].players[player.uuid].score}
            sheet={rooms[uuidRoom].players[player.uuid].sheets[0]}
            finalScore={rooms[uuidRoom].finalScore}
            uuidRoom={uuidRoom}
          />
        </div>
      )
    }
  } else {
    if (process.env.NODE_ENV !== 'test') {
      history.replace('/');
    }
    return ("")
  }
}

export default Room
