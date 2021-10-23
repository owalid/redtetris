// Libs
import React from 'react'
import { useContext, useState } from 'react';
import _ from 'lodash'
import Button from '@material-ui/core/Button';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import { SocketContext } from "../context/SocketContext";

const FormCreateRoom = ({ login }) => {
  const [playSolo, setPlaySolo] = useState(false);
  const { sendSocket } = useContext(SocketContext);

  const handleChangeCheckBox = (event) => {
    setPlaySolo(event.target.checked);
  };

  const createRoom = (e) => {
    e.preventDefault()
    sendSocket('server/create-room', { login, playSolo })
  }

  return (
    <div className="test--form-create-room d-flex jcnt--center pt-3">
      <div>
        <FormControlLabel
          control={<Checkbox
            checked={playSolo}
            onChange={handleChangeCheckBox}
            color="primary"
            />}
          label="Jouer en solo ?"
        />
      </div>
      <div className="aself--center">
        <Button
          className="aself--center mt-2 test--btn-create-room"
          id="createRoom"
          variant="contained"
          color="primary"
          data-testid='btnCreateRoom'
          onClick={e => createRoom(e)}
        >
          Crée une partie
        </Button>
      </div>
    </div>
  )
}

export default FormCreateRoom