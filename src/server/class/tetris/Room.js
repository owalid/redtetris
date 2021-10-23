import _ from 'lodash'
import Block from './Tetriminos';
import uuidv4 from 'uuid';

class Room {
	
	constructor(player, solo = false, channel = uuidv4()) {
		this.isStart = false;
		this.isPlaying = false;
		this.solo = solo;
		this.block = new Block();
		this.channel = channel;
		this.players = {};
		this.messages = [];
    this.arrPlayer = [];
    this.finalScore = [];
		this.addPlayer(player, true);
	}

  playerEnd = (uuidUser) => {
    let isLast = false;
    if (!this.players[uuidUser].visitor) {
      this.finalScore.push({
        login: _.clone(this.players[uuidUser].name),
        score: _.clone(this.players[uuidUser].score)
      })
      this.finalScore = this.finalScore.sort((a, b) => a.score < b.score);
    }
    _.map(this.players, player => {
      if (!player.end && player.uuid !== uuidUser) {
        isLast = true;
      }
    })
  }
	
	reGame = (uuidUser) => {
		let isLast = true;
    this.arrPlayer.push(uuidUser)
		_.map(this.players, player => {
      if (player.uuid !== uuidUser && !player.requestNewGame) {
        isLast = false;
      }
		})

		if (isLast) {
      this.finalScore = [];
      let index = 0
      this.arrPlayer.map(uuid_player => {
        if (index > 2) {
          this.players[uuid_player].initGame();
          this.players[uuid_player].setVisitor(true);
        } else {
          this.players[uuid_player].initGame();
          this.players[uuid_player].addSheetFunc(this.addSheet);
          this.players[uuid_player].addDestroyFunc(this.destroyer);
          index++;
        }
      })
      this.startGame();
      this.arrPlayer = []
		} else {
			this.players[uuidUser].setRequestNewGame(true)
		}
	}

	visitorEnd = () => {
		_.map(this.players, player => {
			if (player.visitor) player.end = true;
		})
	}

	addMessage = (data) => {
		this.messages.push({ ...data, uuid: uuidv4() })
	}

	changeVisitorMode = (uuidUser) => {
		let result;
		_.map(this.players, player => {
			if (player.uuid === uuidUser) {
				player.visitor = false;
        player.setRequestNewGame(true);
				result = player;
			}
		})
		return result;
	}

	removePlayer = (uuidUser, endGame) => {
    delete this.players[uuidUser]

		if (endGame) {
			let isLastRequestNewGame = true;
			_.map(this.players, player => {
				if (player.requestNewGame === false) {
					isLastRequestNewGame = false
				}
			})
			if (isLastRequestNewGame) {
				_.map(this.players, player => {
					player.initGame();
				})
			}
		}
	}

	addSheet = () => {
		let sheet = this.block.newBlock();
		_.map(this.players, elem => elem.sheets.push(_.cloneDeep(sheet)));
	}

	destroyer = (uuid, i) => {
		_.map(this.players, player => {
			if (player.uuid !== uuid) {
				player.destroyLine(i)
			}
		})
	}

	addPlayer = (player, is_root = false) => {
    if (!is_root && (this.isStart || this.solo || Object.keys(this.players).length >= 3)) {
      player.visitor = true
    } else {
      player.addSheetFunc(this.addSheet);
      player.addDestroyFunc(this.destroyer);
    }
    this.players[player.uuid] = player;
	}

	onKey = (key, uuidUser) => {
		this.players[uuidUser].moveAction(key);
	}

	countPlayer = () => {
		let i = this.players.length;
		if (i === 4) {
			this.startGame();
		}
	}

	startGame = () => {
		this.isPlaying = true;
		this.isStart = true;
		_.map(this.players, player => {
      if (!player.visitor) {
        player.startGame()
      }
    });
	}

	changeIsPlaying = () => {
		this.isPlaying = !this.isPlaying;
		_.map(this.players, elem => elem.changePlaying(this.isPlaying));
	}

	getPlayers = () => {
	  return this.players
	}
}

export default Room;
