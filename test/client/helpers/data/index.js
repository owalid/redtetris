import uuidv4 from 'uuid'
import Player from '../../../../src/server/class/tetris/Player';
import Room from '../../../../src/server/class/tetris/Room';

const date = new Date()

// UTILS AND CONSTANTS
export const player_instance1 = new Player('owalid1', () => {}, true);
export const player_visitor_instance = new Player('owalid_visitor', () => {}, false, true);

const r1 = new Room(player_instance1, false);
r1.addPlayer(player_visitor_instance);

r1.addMessage({
  login: null,
  uuidUser: -1,
  time: `${date.getHours()}:${date.getMinutes()}`,
  content: `owalid1 à rejoint la room`
})

export const room1 = r1

export const player_instance2 = new Player('owalid2', () => {}, true);
export const player_instance3 = new Player('owalid', () => {}, false);
const r2 = new Room(player_instance2, false);
r2.addPlayer(player_instance3);
r2.startGame();
export const room2 = r2


export const player_instance4 = new Player('owalid44', () => {}, true);
export const player_instance5 = new Player('owalid55', () => {}, false);
const r3 = new Room(player_instance4, false);
r3.addPlayer(player_instance5);
r3.startGame();
r3.changeIsPlaying();
r3.addMessage({
  login: player_instance4.name,
  uuidUser: player_instance4.uuid,
  time: `${date.getHours()}:${date.getMinutes()}`,
  content: `${player_instance4.name} à rejoint la room`
})
export const room3 = r3


export const player_instanceSolo = new Player('owalid44', () => {}, true);
const r4 = new Room(player_instanceSolo, true);
r4.addPlayer(player_instance5);
r4.startGame();
r4.changeIsPlaying();
export const room4 = r4


export const rooms_instance = {
  [room1.channel]: room1,
  [room2.channel]: room2,
  [room3.channel]: room3
};

// export const room

const GAME_WIDTH = 10;
const GAME_HEIGHT = 20;
const default_values_players = {
  sheets: [],
  indestructible: 0,
  time: 1000,
  isPlaying: false,
  visitor: false,
  currentMapGame: Array.from(Array(GAME_HEIGHT), () => new Array(GAME_WIDTH).fill(0)),
  nextMapGame: Array.from(Array(GAME_HEIGHT), () => new Array(GAME_WIDTH).fill(0)),
  block: null
}

const default_values_room = {
 isStart: false,
 isPlaying: false
}

const fillPlayersRoom = (players) => {
  let result = {}
  players.map(player => {
    result[player.uuid] = player
  })
  return result;
}


// PLAYERS

export const visitor_player = {
  uuid: uuidv4(),
  name: "Player1",
  score: 0,
  admin: false,
  visitor: true,
  ...default_values_players
}

export const players_1 = [
  {
    uuid: uuidv4(),
    name: "Player1",
    score: 0,
    admin: true,
    ...default_values_players
  },
  {
    uuid: uuidv4(),
    name: "Player2",
    score: 0,
    admin: false,
    ...default_values_players
  },
  visitor_player
]
export const players_2 = [
  {
    uuid: uuidv4(),
    name: "Player3",
    score: 0,
    admin: true,
    ...default_values_players
  },
  {
    uuid: uuidv4(),
    name: "Player4",
    score: 0,
    admin: false,
    ...default_values_players
  }
]

export const players_3 = [
  {
    uuid: uuidv4(),
    name: "Player001",
    score: 0,
    admin: true,
    ...default_values_players
  },
  {
    uuid: uuidv4(),
    name: "Player002",
    score: 0,
    admin: false,
    ...default_values_players
  }
]


export const uuid_1 = uuidv4()
const uuid_2 = uuidv4() 
const uuid_3 = uuidv4() 
// ROOMS
export const rooms_1 = {
  [uuid_1]: {
    isPlaying: true,
    isStart: true,
    channel: uuid_1,
    players: fillPlayersRoom(players_1),
    ...default_values_room
  },
  [uuid_2]: {
    channel: uuid_2,
    players: fillPlayersRoom(players_2),
    ...default_values_room
  }
}

export const rooms_2 = {
  ...rooms_1,
  [uuid_3]: {
    channel: uuid_3,
    players: fillPlayersRoom(players_3),
    ...default_values_room
  }
}