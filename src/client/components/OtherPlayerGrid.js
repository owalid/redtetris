import React from 'react';
import _ from 'lodash';
import Game from './Game';

const OtherPlayerGrid = ({ isAlone, mapGamePreview }) => {

  if (!isAlone) {
    const gamePreview = _.cloneDeep(mapGamePreview.currentMapGame)
    gamePreview.map((row, id_row) => {
      row.map((piece, id_piece) => {
        if (piece === 8) {
          gamePreview[id_row][id_piece] = 0
        }
      })
    });
    return (
      <Game
      mapGame={gamePreview}
      isOtherUser={true}
      />
    )
  } 
  return ("")
}

export default OtherPlayerGrid