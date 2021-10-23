import React from 'react';
import { TETROMINOS } from '../plugins/tetrominos';
import Cell from './Cell';
import StyledPreview from './style/styledPreview';

const PreviewPiece = ({ sheet }) => {
  const game = { game: TETROMINOS[sheet.type].shape }
  return (
    <div>
      <StyledPreview
        isOtherUser={game.isOtherUser}
        width={game.game[0].length} 
        height={game.game.length}
      >
        {game.game.map(row => 
          row.map((cell, x) => 
            <Cell key={x} type={cell} isOtherUser={game.isOtherUser}/>
        ))}
      </StyledPreview>
    </div>
  )
}

export default PreviewPiece
