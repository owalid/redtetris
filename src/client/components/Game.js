import React from 'react';
import Cell from './Cell'
import StyledStage from './style/styledStage'
import tetrisSong from '../static/media/tetris.mp3';


const Sound = () => <audio src={tetrisSong} volume={0.1} autoPlay loop />;

const isNotTest = process.env.NODE_ENV !== "test"
const Game = ({ song, mapGame, isOtherUser }) =>
  <div>
    { song && isNotTest && <Sound /> }
    <StyledStage
      isOtherUser={isOtherUser}
      width={mapGame[0].length} 
      height={mapGame.length}
      >
      {mapGame.map(row => 
        row.map((cell, x) => 
          <Cell
            key={x}
            type={cell}
            isOtherUser={isOtherUser}
          />
        ))}
    </StyledStage>
  </div>
  
export default Game