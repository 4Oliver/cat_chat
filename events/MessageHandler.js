import { onMessage } from '../managers/onMessage';

export class ChatHandler {
	constructor(socket) {
		this.socket = socket;

		socket.on('message', ChatHandler.onMessage.bind(this));
	}
	/**
	 *
	 * @param {string} message
	 * @returns
	 */
	static onMessage(message) {
		onMessage(message);
	}
}
