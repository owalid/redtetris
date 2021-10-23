import React, { useContext, useEffect } from 'react';
import _ from 'lodash';
import { Card } from '@material-ui/core';

import { Context as UserContext } from "../context/UserContext";
import { SocketContext } from "../context/SocketContext";

import Preview from './Preview'
import Game from './Game'
import Chat from './Chat';
import ReGame from './ReGame';
import VisitorView from './VisitorView';

const boxProps = {
  bgcolor: 'background.paper',
  bordercolor: 'text.primary',
  border: 1,
  borderradius: "borderRadius",
  style: { backgroundColor: 'white', height: '100%', width: '100%'},
  m: 1
};


const Board = ({ finalScore, song, currentRoom, isEnd, uuidRoom, mapGame, mapsGamePreview, isAlone, score, sheet }) => {
  const { state: { player } } = useContext(UserContext);
  const { sendSocket } = useContext(SocketContext);


  useEffect(() => {
    if (isEnd === true && currentRoom) {
      sendSocket('server/end-game-visitor', { channel: uuidRoom })
      sendSocket('server/end-game', { channel: uuidRoom, uuidUser: player.uuid })
    }
  }, [isEnd])

  if ((player && player.visitor)
      || (player && Object.keys(currentRoom).includes('players')
            && Object.keys(currentRoom.players).includes(player.uuid)
            && currentRoom.players[player.uuid]
            && currentRoom.players[player.uuid].visitor)) {

    return (
      <div className="test--visitor-player">
        <VisitorView
          uuidRoom={uuidRoom}
          boxProps={boxProps}
          isEnd={isEnd}
          currentRoom={currentRoom}
          player={player}
          mapsGamePreview={mapsGamePreview}
          isAlone={isAlone}
          />
      </div>
    )

  } else {

    return (
      <div className="d-flex jcnt--start aitems--fs fdir--row test--player">
    
        {
          (isEnd)
          ? (<ReGame
              player={player}
              currentRoom={currentRoom}
              finalScore={finalScore}
            />)
          : (<div className="width-100">
                <Card {...boxProps} variant="outlined">
                  <Game
                    mapGame={mapGame}
                    song={song}
                    isOtherUser={false}
                  />
                </Card>
              </div>)
        }

        <div className="aself--str">
          <Preview
            mapsGamePreview={mapsGamePreview}
            isVisitor={false}
            isAlone={isAlone}
            score={score}
            sheet={sheet}
            uuidRoom={uuidRoom}
          />
        </div>
        <div style={{ width: '50vw' }}>
          <Card {...boxProps} variant="outlined">
            <Chat uuidRoom={uuidRoom} />
          </Card>
        </div>
      </div>
    );

  }
}

export default Board
