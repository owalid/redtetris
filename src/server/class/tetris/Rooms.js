import _ from 'lodash';
// Rooms Singleton
// instance => instance of Rooms
// rooms => Object = key (uuid), value (instance of Room)

class Rooms {
  constructor() {
   if (!Rooms.instance){
     this._data = {};
     Rooms.instance = this;
   }
   return Rooms.instance;
  }

  addRoom = item => {
    if (!Object.keys(this._data).includes(item.channel)) {
      this._data[item.channel] = item;
    } else {
      this._data[item.channel].player.push(item.player);
    }
  }
  
  visitorEnd = (channel) => {
    if (this._data[channel]) {
      this._data[channel].visitorEnd()
    }
  }

  playerEnd = (channel, uuidUser) => {
    if (this._data[channel]) {
      this._data[channel].playerEnd(uuidUser);
    }
  }

  reGame = (channel, uuidUser) => {
    if (this._data[channel]) {  
      this._data[channel].reGame(uuidUser)
    }
  }

  addMessage = (channel, data) => {
    this._data[channel].addMessage(data)
  }

  addPlayer = (channel, player) => {
    this._data[channel].addPlayer(player);
  }
  startGame = (channel) => {
    this._data[channel].startGame();
  }

  onKey = (key, channel, uuidUser) => {
    if (this._data[channel] && Object.keys(this._data[channel]).includes("onKey") && key && uuidUser) {
      this._data[channel].onKey(key, uuidUser);
    }
  }

  deleteRoom = (channel) => {
    delete this._data[channel]
  }

  deletePlayer = (channel, uuidUser, endGame) => {
    if (this._data[channel]) {
      this._data[channel].removePlayer(uuidUser, endGame);
      return Object.keys(this._data[channel].players).length === 0
    }
    return false;
  }

  changeVisitorMode = (channel, uuidUser) => {
    return this._data[channel].changeVisitorMode(uuidUser)
  }

  changeIsPlaying = (channel) => {
    this._data[channel].changeIsPlaying();
  }

  get = channel =>  {
    return this._data[channel]
  }
}

const instanceRooms = new Rooms();
Object.freeze(instanceRooms);

export default instanceRooms;

