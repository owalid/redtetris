import socketIo from 'socket.io';
import Room from '../tetris/Room';
import instanceRooms from '../tetris/Rooms';
import Player from '../tetris/Player';
import _ from 'lodash'

let sockets = {} //https://stackoverflow.com/questions/40816355/socket-io-send-disconnect-event-with-parameter
class SocketsManager {
	constructor (server) {
    this.io = socketIo(server);
    this.rooms = instanceRooms;
    this.io.on('connection', (socket) => {
      this.utilsIo = { io: this.io, socket };
      this.initListener(socket)
    });
  }
  
  updateRooms = (rooms = this.rooms, socket = this.utilsIo.socket) => {
    socket.emit('client/update-rooms', rooms);
    this.io.sockets.emit('client/update-rooms', rooms)
  }
  
  // Default
  defaultListener = (socket) => {
    socket.on('server/ping', () => {
      socket.emit('client/pong');
    })
    socket.on('disconnect', () => {
      if (process.env.NODE_ENV !== "test" && Object.keys(sockets).includes(socket.id)) {
        console.log("disconnected")
        const { uuidUser, channel } = sockets[socket.id]

        const date = new Date()
        let player = null
        let isLast = false
        if (this.rooms._data && Object.keys(this.rooms._data).includes(channel)) {
          player = _.filter(this.rooms._data[channel].players, player => player.uuid === uuidUser)
          isLast = this.rooms.deletePlayer(channel, uuidUser, false)
        }
        
        if (player && Array.isArray(player) && player.length > 0) {
          this.rooms.addMessage(channel, {
            login: null,
            uuidUser: -2,
            time: `${date.getHours()}:${date.getMinutes()}`,
            content: `${player[0].name} à été deconnecté de la room`
          })
        }
        this.updateRooms(this.rooms, socket)
        if (isLast === true) this.rooms.deleteRoom(channel)
        this.updateRooms(this.rooms, socket)
        socket.leave(channel);
        socket.leave(uuidUser);
        delete sockets[socket.id]
      }
      socket.disconnect();
    });
  } 

  // Room listener
  roomListener = (socket) => {
    socket.on('server/create-room', (data) => {
      const { login, playSolo } = data
      const date = new Date()
      const player = new Player(login, () => this.updateRooms(), true);

      const room = new Room(player, playSolo)
      this.rooms.addRoom(room);
      this.updateRooms(this.rooms, socket)
      if (process.env.NODE_ENV !== "test") {
        sockets[socket.id] = { channel: room.channel, uuidUser: player.uuid }
      }
      socket.join(room.channel);
      socket.join(player.uuid);


      this.rooms.addMessage(room.channel, {
        login: null,
        uuidUser: -1,
        time: `${date.getHours()}:${date.getMinutes()}`,
        content: `${login} à rejoint la room`
      })


      this.updateRooms(this.rooms, socket)
      socket.emit('client/created-room', { uuidRoom: room.channel, player })
    });
    
    // leave room
    socket.on('server/leave-room', (data) => {
      let { uuidRoom, uuidUser, endGame } = data;
      const date = new Date()
      endGame = endGame || false

      let player = null
      if (this.rooms._data && Object.keys(this.rooms._data).includes(uuidRoom)) {
        player = _.filter(this.rooms._data[uuidRoom].players, player => player.uuid === uuidUser)
      }

      if (player) {
        this.rooms.addMessage(uuidRoom, {
          login: null,
          uuidUser: -2,
          time: `${date.getHours()}:${date.getMinutes()}`,
          content: `${player[0].name} à quitté la room`
        })
      }

      const isLast = this.rooms.deletePlayer(uuidRoom, uuidUser, endGame)
      socket.emit('client/update-user', { uuidRoom: null, player: null })


      this.updateRooms(this.rooms, socket)
      
      if (isLast === true) {
        this.rooms.deleteRoom(uuidRoom)
        this.updateRooms(this.rooms, socket)
      }
      socket.leave(uuidUser);
    });
    
    // join room
    socket.on('server/join-room', (data) => {
      const { channel, login } = data;
      const date = new Date()
      const player = new Player(login, () => this.updateRooms());
      this.rooms.addPlayer(channel, player);
      this.updateRooms(this.rooms, socket)
      socket.emit('client/join-room', { uuidRoom: channel, player });
      socket.join(channel);
      socket.join(player.uuid);
      sockets[socket.id] = { channel: channel, uuidUser: player.uuid }


      this.rooms.addMessage(channel, {
        login: null,
        uuidUser: -1,
        time: `${date.getHours()}:${date.getMinutes()}`,
        content: `${login} à rejoint la room`
      })

      this.updateRooms(this.rooms, socket)
      socket.emit('client/join-room', { uuidRoom: channel, player })
    });
    
  }

  // Game Listener
  gameListener = (socket) => {

    socket.on('server/new-message', (data) => {
      const { uuidRoom } = data
      const date = new Date()
      this.rooms.addMessage(uuidRoom, {
        login: data.login,
        uuidUser: data.id_user,
        time: `${date.getHours()}:${date.getMinutes()}`,
        content: data.content
      })
      this.updateRooms(this.rooms, socket)
    })

    socket.on('server/start-game', (data) => {
      const { uuidRoom } = data;
      this.rooms.startGame(uuidRoom);
      this.updateRooms(this.rooms, socket)
      socket.to(uuidRoom).emit('client/start-game')
    });
    
    socket.on('server/key-up', (data) => {
      // KEY: 'ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', ' '
      const { key, channel, uuidUser } = data;
      this.rooms.onKey(key, channel, uuidUser);
      this.updateRooms(this.rooms, socket)
    });
    
    socket.on('server/pause-resume', (data) => {
      // get channel
      const { channel } = data;
      this.rooms.changeIsPlaying(channel);
      this.updateRooms(this.rooms, socket)
    });
    
    socket.on('server/re-game', (data) => {
      const { channel, uuidUser } = data
      this.rooms.reGame(channel, uuidUser)
      this.updateRooms(this.rooms, socket)
      _.map(this.rooms._data[channel].players, player => 
        socket.to(player.uuid).emit('client/update-user', { uuidRoom: channel, player: player })
      )
    })
    
    socket.on('server/visitor-join-room', (data) => {
      const { channel, uuidUser } = data
      const player = this.rooms.changeVisitorMode(channel, uuidUser)
      socket.emit('client/update-user', { uuidRoom: channel, player })
      this.updateRooms(this.rooms, socket)
    })

    socket.on('server/end-game-visitor', (data) => {
      const { channel } = data
      this.rooms.visitorEnd(channel)
      this.updateRooms(this.rooms, socket)
    })

    socket.on('server/end-game', (data) => {
      const { channel, uuidUser } = data
      this.rooms.playerEnd(channel, uuidUser)
      this.updateRooms(this.rooms, socket)
    })
  }

  initListener = (socket) => {
    this.defaultListener(socket);
    this.roomListener(socket);
    this.gameListener(socket);
    this.updateRooms(this.rooms, socket)
  }
}

export default SocketsManager
