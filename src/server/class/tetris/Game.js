import _ from 'lodash'
import Piece from './Piece'

class Game extends Piece {
	constructor(updateRoomFunction) {
		super();
		this.updateRoomFunction = updateRoomFunction;
		this.block = null;
		this.shadow = null;
		this.action = null;
		this.lock = true;
		this.cantPose = false
    this.timing = 1000
		this.action = this.initActionObject();
	}

	initActionObject = () => {
		return {
			'ArrowUp': () => this.rotateR(),
			'ArrowDown': () => this.down(),
			'ArrowLeft': () => this.left(),
			'ArrowRight': () => this.right(),
			' ': () => this.space()
		}
	}

	getBlockShadow = (block) => {
		return {
			block: _.cloneDeep(block.block),
			y: block.y,
			x: block.x,
			type: 8,
			rotate: block.rotate,
			field: block.field,
		};
	}

	makeShadow = (block) => {
		let blockClone = this.getBlockShadow(block);
		if (!this.canPose(blockClone, 0, 1)) {
			this.shadow = null;
		} else {
			while (this.canPose(blockClone, 0, 1)) {
        blockClone.y = blockClone.y + 1;
      }
      this.shadow = blockClone;
		}
	}

	createIntervalGame = () => {
		const timer = setTimeout(() => {
			if (this.isPlaying) {
				if (!this.block) {
					this.addSheet();
					this.block = _.cloneDeep(this.sheets.shift());
					this.addSheet();
          if (!this.block) {
            return 0;
          }
					if (!this.canPose(this.block, 0, 0)) {
						this.end = true;
						clearTimeout(timer);
						this.block = null;
						this.updateRoomFunction();
						return;
					}
				}
				this.sendMap();
				if (this.cantPose) {
					this.cantPose = false;
					if (!this.canPose(this.block, 0, 1)) {
						this.draw(this.block, this.block.type);
						this.block = null;
						this.destroyFunc(this.uuid, this.verifLine());
					}
				} 
				if (this.block) {
					if (!this.canPose(this.block, 0, 1)) {
						this.cantPose = true;
					} else {
						this.draw(this.block, 0);
						this.block.y += 1;
					}
				}
			}
			setTimeout(this.createIntervalGame, 0)
		}, this.timing)
	}

	sendMap = () => {
		this.makeShadow(this.block);
		if (this.shadow) {
      this.draw(this.shadow, 8);
    }
		this.draw(this.block, this.block.type);
		this.currentMapGame = _.cloneDeep(this.nextMapGame);
		if (this.updateRoomFunction) {
      this.updateRoomFunction();
    }
		if (this.shadow) {
      this.draw(this.shadow, 0);
    }
		this.draw(this.block, 0);
	}

 	moveBlock = (yy, xx) => {
		if (yy !== 0 && this.canPose(this.block, xx, yy)) {
			this.block.y += yy;
		}
		if (xx !== 0 && this.canPose(this.block, xx, yy)) {
			this.block.x += xx;
		}
		this.sendMap();
	}

	moveAction = (event) => {
		if (this.block && event && Object.keys(this.action).includes(event)) {
			this.action[event]();
		}
	}

	left = () => {
		this.moveBlock(0, -1);
	}
	
	right = () => {
		this.moveBlock(0, 1);
	}
	
	down = () => {
		this.moveBlock(1, 0);
	}

	rotateL = () => {
		if (this.block.rotate) {
			this.rotate(this.block, 0);
			this.sendMap();
		}
	}
	
	rotateR = () => {
		if (this.block.rotate) {
			this.rotate(this.block, 1);
			this.sendMap();
		}
	}
	
	space = () => {
		this.lock = false;
		while (this.canPose(this.block, 0, 1)) {
			this.block.y += 1;
		}
		this.sendMap();
		this.draw(this.block, this.block.type);
		this.addSheet();
		this.block = null;
		this.destroyFunc(this.uuid, this.verifLine());
		this.lock = true;
	}

	draw = (blk, z) => {
		for (let i = 0; i < 4; i++) {
			this.nextMapGame[blk.y + blk.block[i].y][blk.x + blk.block[i].x] = z;
		}
	}

	wash = (e) => {
		this.nextMapGame.splice(e, 1);
		this.nextMapGame.unshift([0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
	}

	verifLine = () => {
		let arr = 0;
		for (let i = 19 - this.indestructible; i >= 0; i--) {
			let u = 1;
			for (let y = 0; y < 10; y++) {
				if (this.nextMapGame[i][y] === 0) {
					u = 0;
					break;
				}
			}

			if (u === 1) {
				arr = arr + 1;
				this.score = Math.ceil((this.score + 1000) * 1.1);
				this.timing = (this.timing > 100) ? this.timing - 30 : this.timing;
				this.wash(i);
				arr = arr + this.verifLine();
			}
		}
		return arr;
	}
}

export default Game;
