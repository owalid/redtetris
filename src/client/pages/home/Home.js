// Libs
import React from 'react'
import { useHistory } from 'react-router-dom'
import { useContext, useEffect, useState } from 'react';
import _ from 'lodash'
import Button from '@material-ui/core/Button';
import Input from '@material-ui/core/Input';
import { Context as UserContext } from "../../context/UserContext";
import TablePlayers from '../../components/TablePlayers';

const HomePage = () => {
  const { state: { uuidRoom } } = useContext(UserContext);
  const [login, setLogin] = useState('');
  const [haveChooseLogin, setHaveChooseLogin] = useState(false);
  const history = useHistory()

  const createPlayer = () => {
    setHaveChooseLogin(true)
  }

  useEffect(() => {
    if (uuidRoom) {
      history.push(`/${uuidRoom}[${login}]`)
    }
  }, [uuidRoom])

  return (
    <div>
      <div className="inital-form d-flex jcnt--center fdir--column">
        <h1 className="aself--center">Bienvenu sur Red-tetris !</h1>
        <span className="aself--center pt-3">Veuillez entrez un login.</span>
        <Input
          className="aself--center mb-2 input-size"
          value={login}
          onChange={e => setLogin(e.target.value)}
          variant="outlined"
          required
          name="login"
          label="Login"
          type="Login"
          id="Login"
          inputProps={{
            'data-testid': 'loginInput'
          }}
          autoComplete="current-login"
          />
        <Button
          className="aself--center mt-2 test--btn-create-room"
          variant="contained"
          color="primary"
          data-testid='btnLogin'
          disabled={login.length === 0}
          onClick={createPlayer}
          >
          Valider
        </Button>
      </div>
      { haveChooseLogin && (<TablePlayers login={login} />) }
    </div>
  )
}
export default HomePage
