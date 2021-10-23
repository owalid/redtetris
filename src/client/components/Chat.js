import React, { useState, useContext, useEffect } from 'react';
import { Button, Input } from '@material-ui/core';

import { Context as RoomsContext } from "../context/RoomsContext";
import { SocketContext } from "../context/SocketContext";
import { Context as UserContext } from "../context/UserContext";

const Chat = ({ uuidRoom }) => {
  const { sendSocket } = useContext(SocketContext);
  const { state: { player } } = useContext(UserContext);
  const { state: { rooms } } = useContext(RoomsContext);
  const [message, setMessage] = useState('');
  const [game, setGame] = useState(true);
  const keysCode = ['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', ' ', 'Escape'];

  useEffect(() => {
    const getKeyUp = (event) => {
      const { key } = event;
      if (keysCode.includes(key)) {
        if (key === 'Escape') {
          sendSocket('server/pause-resume', { channel: uuidRoom })
        } else {
          sendSocket('server/key-up', { key, channel: uuidRoom, uuidUser: player.uuid  })
        }
      }
    }
    if (game) {
      document.addEventListener('keyup', getKeyUp);
    } else {
      document.removeEventListener('keyup', getKeyUp);
    }
    return () => {
      document.removeEventListener('keyup', getKeyUp);
    };
  }, [game])


  const sendMessage = (e) => {
    e.preventDefault();
    if (message !== "") {
      sendSocket('server/new-message', {
          content: message,
          uuidRoom,
          login: player.name,
          id_user: player.uuid
      })
      setMessage("")
      const element = document.getElementById("chat");
      element.scrollTop = 0;
    }
  }

  useEffect(() => {
    const inputMessage = document.getElementById('input-message')
    inputMessage.addEventListener('focusout', (event) => {
      setGame(true);
    });
    inputMessage.addEventListener('focus', (event) => {
      setGame(false);
    });
  }, [])

return (
  <div>
    <div id="chat" className="container--chat">
      <div className="chat d-flex fdir--column">
        {
          rooms && rooms[uuidRoom].messages.map(msg => {
            if (!msg.login) {
                return (
                  <div
                    className="test--message-base"
                    key={msg.uuid}
                  >
                    <p>
                      <span className={`bold medium-text ${(msg.uuidUser === -1) ? "text--green" : "text--red"}`}>
                        {msg.time} -- { msg.content }
                      </span><br />
                    </p>
                  </div>
                )
              } else {
                  return (
                    <div
                      key={msg.uuid}
                      className={`${msg.uuidUser === player.uuid
                        ? 'aself--fend bubble--me'
                        : 'aself--fstart bubble--other'}
                        aself--fstart
                        pb-2
                        bubble
                        test--message-user
                      `}
                    >
                    <p>
                      <span className="bold medium-text">{ msg.login }:</span> { msg.content } <br />
                    </p>
                    <p className="thin small-text pt-0">{msg.time}</p>
                  </div>
                )
              }
            })
          }
        </div>
      </div>
      <div className="d-flex fdir--column">

      <div className="aself--center">
        <form onSubmit={sendMessage}>
            <Input
              className="aself--center mb-2 input-size"
              value={message}
              onChange={e => setMessage(e.target.value)}
              variant="outlined"
              required
              name="message"
              label="message"
              type="message"
              id="input-message"
              inputProps={{
                'data-testid': 'messageChat'
              }}
              />
            <Button
              className="aself--center mt-2 test--btn-submit-message"
              color="primary"
              data-testid='btnLogin'
              disabled={message.length === 0}
              onClick={sendMessage}
              >
              ➡️
            </Button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Chat
