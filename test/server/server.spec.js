import socketIOClient from "socket.io-client"
import _ from 'lodash'
import Server from "../../src/server/class/Server"
import instanceRooms from '../../src/server/class/tetris/Rooms'
import SocketsManager from "../../src/server/class/sockets/SocketsManager";
import Game from "../../src/server/class/tetris/Game";
import Player from "../../src/server/class/tetris/Player";
import Room from "../../src/server/class/tetris/Room";
import Block, { I, O, T, S, Z, J, L } from "../../src/server/class/tetris/Tetriminos";
require('dotenv').config() 


describe('Server tests', () => {
  let channel = "";
  let uidplayer = "";
  let server;
  let socketClient;

  beforeEach(done => {
    socketClient = socketIOClient(process.env.API_URL)
    const srvInstance = new Server(true)
    socketClient.on('connect', () => {
      console.log("user connected")
    });
    server = srvInstance.app.listen(process.env.PORT_DEV_SERVER, () => done())
    const socketsManager = new SocketsManager(server);
    srvInstance.setServer(server)
    srvInstance.setSocketManager(socketsManager)
  });

  const getCurrentRoom = () => {
    return (Object.keys(instanceRooms).includes('_data')
          && Object.keys(instanceRooms._data).length > 0)
              ? instanceRooms._data[Object.keys(instanceRooms._data)[0]]
              : false;
  }

  afterEach(() => {
    if (socketClient.connected) {
      socketClient.disconnect()
    }
  	server.close();
  });
  
  it('Should ping', (done) => {
    socketClient.emit("server/ping");
    socketClient.on("client/pong", () => done())
  });

  it('create room', (done) => {
    const data = { login: 'owalid', playSolo: false }
    socketClient.on('client/update-rooms', (rooms) => {
      if (rooms && rooms._data && Object.keys(rooms._data).length > 0) {
        const room = rooms._data[Object.keys(rooms._data)[0]]
        const player = room.players[Object.keys(room.players)[0]]
        channel = room.channel;
        uidplayer = player.uuid;
        expect(player.name).toBe('owalid')
        expect(player.isPlaying).toBe(false)
        expect(player.admin).toBe(true)
        expect(player.visitor).toBe(false)
        expect(room.solo).toBe(false)
        const current_room = getCurrentRoom()
        expect(current_room.channel).toBe(channel)
        done()
      }
    })
    socketClient.emit("server/create-room", data);
  });

  it('join room', (done) => {
    const current_room = getCurrentRoom()
    const data = { channel: current_room.channel, login: "bobo" }
	  socketClient.on('client/join-room', (rooms) => {
      let player = rooms.player
      expect(player.end).toBe(false);
      expect(player.lock).toBe(true);
      expect(player.name).toBe("bobo");
      expect(player.admin).toBe(false);
      expect(player.score).toBe(0);
      expect(player.block).toBe(null);
      expect(player.visitor).toBe(false);
      expect(player.indestructible).toBe(0);
      expect(player.indestructible).toBe(0);
      expect(Object.keys(current_room.players).length).toBe(2)
      done()
    });
    socketClient.emit("server/join-room", data);
  });

  it('start room', (done) =>  {
    const current_room = getCurrentRoom()
    const data = { uuidRoom: current_room.channel }
    socketClient.on('client/update-rooms', (rooms) => {
      let room = rooms._data[channel];
      expect(room.solo).toBe(false);
      done()
    });
    socketClient.emit('server/start-game', data);
  });

  it('key up', (done) =>  {
    const current_room = getCurrentRoom()
    const current_player = current_room.players[Object.keys(current_room.players)[0]]
    const data = { key: "ArrowUp", channel: current_room.channel, uuidUser: current_player.uuid }
    
    socketClient.on('client/update-rooms', (rooms) => {
      done()
    });
    socketClient.emit('server/key-up', data);
  });

  it('pause', (done) => {
    const current_room = getCurrentRoom()
    const data = { channel: current_room.channel }
    expect(current_room.isPlaying).toBe(true)
	  socketClient.on('client/update-rooms', () => {
      expect(current_room.isPlaying).toBe(false)
      done()
    });
    socketClient.emit('server/pause-resume', data);
  });

	it('leave room', (done) =>  {
    const current_room = getCurrentRoom()
    const current_player = current_room.players[Object.keys(current_room.players)[0]]
    const data = { uuidRoom: current_room.channel, uuidUser: current_player.uuid }
    expect(Object.keys(current_room.players).length).toBe(2)
    socketClient.on('client/update-rooms', () => {
      expect(Object.keys(current_room.players).length).toBe(1)
      done()
    })
    socketClient.emit("server/leave-room",  data);
  });

	it('visitor join room', (done) =>  {
    const current_room = getCurrentRoom()
    const current_player = current_room.players[Object.keys(current_room.players)[0]]
    const data = { channel: current_room.channel, uuidUser: current_player.uuid }
    expect(Object.keys(current_room.players).length).toBe(1)
    socketClient.on('client/update-user', (player) => {
      expect(player).not.toBe(null)
      done()
    })
    socketClient.emit("server/visitor-join-room",  data);
  });

	it('send message', (done) =>  {
    const current_room = getCurrentRoom()
    const current_player = current_room.players[Object.keys(current_room.players)[0]]
    const data = {
      uuidRoom: current_room.channel,
      login: current_player.name,
      id_user: current_player.uuid,
      content: "Hello world"
    }
    socketClient.on('client/update-rooms', (rooms) => {
      done()
    })
    socketClient.emit("server/new-message",  data);
  });

	it('end game visitor', (done) =>  {
    const current_room = getCurrentRoom()
    const data = { channel: current_room.channel }
    expect(Object.keys(current_room.players).length).toBe(1)
    socketClient.on('client/update-rooms', () => {
      done()
    });
    socketClient.emit("server/end-game-visitor",  data);
  });

	it('end game', (done) =>  {
    const current_room = getCurrentRoom()
    const current_player = current_room.players[Object.keys(current_room.players)[0]]
    const data = { channel: current_room.channel, uuidUser: current_player.uuid }
    expect(Object.keys(current_room.players).length).toBe(1)
    socketClient.on('client/update-rooms', () => {
      done()
    });
    socketClient.emit("server/end-game",  data);
  });

	it('re game', (done) =>  {
    const current_room = getCurrentRoom()
    const current_player = current_room.players[Object.keys(current_room.players)[0]]
    const data = { channel: current_room.channel, uuidUser: current_player.uuid }
    socketClient.on('client/update-rooms', (rooms) => {
      done()
    });
    socketClient.on('client/update-user', (player) => {
      expect(player).not.toBe(null)
      done()
    })
    socketClient.emit("server/re-game",  data);
  });

  it('init game instance', () => {
    const game = new Game(() => {})
    expect(typeof game.initActionObject() === "object").toBe(true)
    expect(Object.keys(game.initActionObject()).length).toBe(5)
  })

  it('testing Action Game instance', () => {
    const game = new Game(() => {})
    expect(game.initActionObject()["ArrowUp"].toString()).not.toBeNull()
    expect(game.initActionObject()["ArrowDown"].toString()).not.toBeNull()
    expect(game.initActionObject()["ArrowLeft"].toString()).not.toBeNull()
    expect(game.initActionObject()["ArrowRight"].toString()).not.toBeNull()
    expect(game.initActionObject()[" "].toString()).not.toBeNull()
  })

  it('Start Game instance', () => {
    const player = new Player("login", () => {}, true);
    const room = new Room(player, false)
    room.startGame()
  })
  
  it('Call action Game instance', () => {
    const current_room = getCurrentRoom()
    const current_player = current_room.players[Object.keys(current_room.players)[0]]
    current_player.addSheet();
    current_player.block = _.cloneDeep(current_player.sheets.shift());
    current_player.right()
  })

  it('Tetrominos', () => {
    const block = new Block();
    const randomBlock = block.newBlock()
    const allBlocks = [I, O, T, S, Z, J, L];
    let founded = false;
    allBlocks.map(tetro => {
      if (randomBlock instanceof tetro) {
        founded = true
      }
    })
    
    expect(founded).toBe(true)

  })

  
});
