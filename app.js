import express from 'express';
import { Server as IO } from 'socket.io';

const catPfpURL = 'https://api.thecatapi.com/v1/images/search';

const port = 443;
const expressApp = express();

expressApp.use(express.static('./website'));

const appServer = expressApp.listen(port, () => {
	console.log('Server is up!');
});

export const IOServer = new IO(appServer);

const date = new Date();

console.log(date);

const users = {};

let lastMessageSentBy;

IOServer.on('connection', async (socket) => {
	fetch(catPfpURL)
		.then((res) => res.json())
		.then((data) => {
			users[socket.id] = data[0].url;
			//console.log(data[0].url);
		});

	socket.join('global');
	socket.data.room = 'global';
	socket.emit('welcome', 'hello world!');
	console.log(`Client connected ${socket.id}`);

	socket.on('message', (data) => {
		lastMessageSentBy = socket.id;
		IOServer.to(socket.data.room).emit('message', {
			message: data,
			pfp: users[socket.id],
			last: socket.id,
		});
	});
});
