// Libs
import React from 'react'
import { useContext } from 'react';
import _ from 'lodash'
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { Context as RoomsContext } from "../context/RoomsContext";
import { SocketContext } from "../context/SocketContext";
import FormCreateRoom from './FormCreateRoom';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
    width: 800,
    alignSelf: 'center'
  },
});

const TablePlayers = ({ login }) => {
  const { sendSocket } = useContext(SocketContext);
  const { state: { rooms } } = useContext(RoomsContext);
  const classes = useStyles();

  const joinRoom = (e, roomSelected) => {
    e.preventDefault();
    sendSocket('server/join-room', { channel: roomSelected, login })
  }

  if (!rooms || Object.keys(rooms).length === 0) {
    return (
      <div className="test--no-game">
        <div className="d-flex jcnt--center pt-3">
          <p className="aself--center">
            Aucune partie n'est disponible pour le moment 🙁
            <br /> 
            <span className="bold">Mais vous pouvez en créez une des a present !</span>
          </p>
        </div>
        <FormCreateRoom login={login} />
      </div>
    )
  } else {
    return (
      <div className="table-player d-flex jcnt--center fdir--column test--table-rooms">
      <h1 className="aself--center">Choisissez de crée une partie ou d'en rejoindre une</h1>
      <div className="aself--center">
      <h2>Partie en cours:</h2>
      <TableContainer>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Numero de la partie</TableCell>
              <TableCell>Participants</TableCell>
              <TableCell>Etat de la partie</TableCell>
              <TableCell>Solo</TableCell>
              <TableCell>Rejoindre</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
          {
            Object.keys(rooms).map((item, key) => {
               return (
                <TableRow key={key}>
                  <TableCell>
                    #{ rooms[item].channel }
                  </TableCell>
                <TableCell component="th" scope="row">
                {_.map(rooms[item].players, (player, index) =>
                  `${player.name}${(index !== Object.keys(rooms[item].players)[Object.keys(rooms[item].players).length - 1]) ? ', ' : ''}`
                )}
                </TableCell>
                <TableCell>
                  { rooms[item].isStart ? "En partie" : "Dans le salons" }
                </TableCell>
                <TableCell>
                  { rooms[item].solo ? "👍" : "👎" }
                </TableCell>
                <TableCell>
                  <Button
                    className="aself--center mt-2 test--btn-join-room"
                    id="joinRoom"
                    variant="contained"
                    color="primary"
                    data-testid='btnJoinRoom'
                    disabled={login.length === 0}
                    onClick={e => joinRoom(e, rooms[item].channel)}
                  >
                    Rejoindre
                  </Button>
                </TableCell>
              </TableRow>
              )})
            }
          </TableBody>
        </Table>
      </TableContainer>
      </div>
      <FormCreateRoom login={login} />
    </div>
    )
  }
}

export default TablePlayers