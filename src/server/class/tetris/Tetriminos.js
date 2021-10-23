class mounter {
	constructor () {
	}
	newCase = (x, y , pivot) => {
		return (!Number.isInteger(x) || !Number.isInteger(y) || typeof pivot !== "boolean")
			? false
			: { x, y, pivot };
		}
}

export class I extends mounter {
	constructor() {
		super();
		this.state = false;
		this.x = 5;
		this.y = 0;
		this.type = 1;
		this.rotate = true;
		this.field = 1;
		this.block = [
			this.newCase(-2, 0, false),
			this.newCase(-1,0, false),
			this.newCase(0, 0, true),
			this.newCase(1, 0, false),
		];
	}
}

export class O extends mounter {
	constructor() {
		super();
		this.state = false;
		this.x = 5;
		this.y = 0;
		this.type = 2;
		this.rotate = false;
		this.field = 1;
		this.block = [
			this.newCase(-1, 0, false),
			this.newCase(-1,1, false),
			this.newCase(0, 0, true),
			this.newCase(0, 1, false),
		];
	}
}

export class T extends mounter {
	constructor() {
		super();
		this.state = false;
		this.x = 5;
		this.y = 0;
		this.type = 3;
		this.rotate = true;
		this.field = 1;
		this.block = [
			this.newCase(-1, 0, false),
			this.newCase(0,1, false),
			this.newCase(0, 0, true),
			this.newCase(1, 0, false),
		];
	}
}

export class J extends mounter {
	constructor() {
		super();
		this.state = false;
		this.x = 5;
		this.y = 0;
		this.type = 4;
		this.rotate = true;
		this.field = 1;
		this.block = [
			this.newCase(-1, 1, false),
			this.newCase(-1,0, false),
			this.newCase(0, 0, true),
			this.newCase(1, 0, false),
		];
	}
}

export class L extends mounter {
	constructor() {	
		super();
		this.state = false;
		this.x = 5;
		this.y = 0;
		this.type = 5;
		this.rotate = true;
		this.field = 1;
		this.block = [
			this.newCase(-1, 0, false),
			this.newCase(0,0, true),
			this.newCase(1, 0, false),
			this.newCase(1, 1, false),
		];
	}
}


export class S extends mounter {
	constructor() {
		super();
		this.state = false;
		this.x = 5;
		this.y = 0;
		this.type = 6;
		this.rotate = true;
		this.field = 1;
		this.block = [
			this.newCase(-1, 0, false),
			this.newCase(0,0, true),
			this.newCase(0, 1, false),
			this.newCase(1, 1, false),
		];
	}
}

export class Z extends mounter {
	constructor() {
		super();
		this.state = false;
		this.x = 5;
		this.y = 0;
		this.type = 7;
		this.rotate = true;
		this.field = 1;
		this.block = [
			this.newCase(-1, 1, false),
			this.newCase(0,1, false),
			this.newCase(0, 0, true),
			this.newCase(1, 0, false),
		];
	}
}


class Block {
	constructor() {
		this.blocks = [I, O, T, S, Z, J, L];
	}
	newBlock = () => {
		let index = Math.floor(Math.random() * Math.floor(this.blocks.length));
		return new this.blocks[index]();
	}
}

export default Block;
