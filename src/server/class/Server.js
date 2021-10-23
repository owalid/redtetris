import debug from 'debug'
import bodyParser from 'body-parser';
import cors from 'cors'
import express from 'express'
import SocketsManager from './sockets/SocketsManager';
const loginfo = debug('tetris:info')
require('dotenv').config() 

class Server {
	constructor (isTesting = false) {
		this.app = express();
		this.app.use(cors())
		this.app.use(bodyParser.json({limit: '10mb', extended: true}));
		if (!isTesting) {
			this.server = this.app.listen(process.env.port || process.env.PORT_DEV_SERVER, () => {
				loginfo(`tetris listen on ${process.env.port || process.env.PORT_DEV_SERVER}`);
			})
			const socketsManager = new SocketsManager(this.server);
			this.app.io = socketsManager.io;
			this.app.socketsManager = socketsManager;
		} else {
			this.server = null
		}
		this.rooms = {};
	}
	
	setServer = (value) => {
		this.server = value
	}
	setSocketManager = (socketsManager) => {
		this.app.io = socketsManager.io;
		this.app.socketsManager = socketsManager;
	}
}

export default Server;
