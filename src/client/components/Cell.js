import React from 'react';
import StyledCell from './style/styledCell'
import { TETROMINOS } from '../plugins/tetrominos'

const Cell = ({ type, isOtherUser }) => 
  <StyledCell
    type={type}
    color={(!isOtherUser || type === 0) ? TETROMINOS[type].color : '40,40,40'}
  />

export default Cell
