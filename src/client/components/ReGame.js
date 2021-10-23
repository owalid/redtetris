import React, { useState, useContext } from 'react';
import _ from 'lodash';
import { Button } from '@material-ui/core';
import { SocketContext } from "../context/SocketContext";

const ReGame = ({ finalScore, player, currentRoom }) => {
  const { sendSocket } = useContext(SocketContext);
  const [haveSendReGame, setHaveSendReGame] = useState(false);

  const leaveRoom = (e, sendSocket, uuidRoom, uuidUser, endGame) => {
    e.preventDefault()
    sendSocket('server/leave-room', {
      uuidRoom,
      uuidUser,
      endGame
    })
  }

  const wantReGame = (e) => {
    e.preventDefault()
    setHaveSendReGame(true)
    sendSocket('server/re-game', {
      channel: currentRoom.channel,
      uuidUser: player.uuid
    })
  }

  return (
    <div className="width-100 d-flex jcnt--center aitems--center fdir--column pt-3">
      {
        (_.filter(currentRoom.players, player => !player.visitor).length > 1)
        ?
          finalScore.map((score, index) => (
            <p key={index}>
              { (index + 1) === 1 ? "🥇 -"
                : (index + 1) === 2 ? "🥈 -"
                : (index + 1) === 3 ? "🥉 -"
                : `${index} -`
              }
              {score.login} {score.score}
            </p>
          ))
        : <p className="test--alone-player">Votre score final est de {currentRoom.players[player.uuid].score}</p>
      }
      
      {
        !haveSendReGame
        ?
         (
            <div className="d-flex jcnt--center aitems--center fdir--row">
              <Button
                className="ml-2 test--btn-leave-room"
                id="leaveRoom"
                variant="contained"
                color="secondary"
                data-testid='btnLeaveGame'
                onClick={e => leaveRoom(e, sendSocket, currentRoom.channel, player.uuid, true)}
              >
                Quitter
              </Button>
              <Button
                className="mr-2 test--btn-re-game"
                id="wantReGame"
                variant="contained"
                color="primary"
                data-testid='btnReGame'
                onClick={e => wantReGame(e, currentRoom.channel)}
              >
                Rejouez
              </Button>
            </div>
          )
        : (
            <div className="d-flex jcnt--center aitems--center fdir--row">
              <p>
                Veuillez attendre que votre adversaire accepte de rejouez
              </p>
            </div>
          )
        }
    </div>
  )
}

export default ReGame
