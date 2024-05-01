import { io } from './socket.io.esm.min.js';
const userChat = document.getElementById('user-chat');
const chatContainer = document.getElementById('chat-container');
const imageContainer = document.getElementById('image-container');
const chatInput = document.getElementById('chat-input');

const socket = io();

let lastMessageSentBy;

socket.on('welcome', (data) => {
	console.log('got welcome!', [data]);
});

socket.on('message', (data) => {
	lastMessageSentBy = data.last;
	newMessage(data.message, data.pfp, socket);
});

userChat.addEventListener('submit', (e) => {
	e.preventDefault();
	const message = chatInput.value;
	socket.emit('message', message);
	chatInput.value = '';
});

function newMessage(message, pfp, socket) {
	console.log(pfp);
	const messageElement = document.createElement('div');
	console.log(socket.id);
	console.log(lastMessageSentBy);

	const imageElement = document.createElement('img');
	imageElement.src = pfp;
	imageElement.alt = 'user_pfp';
	imageElement.style.width = '100px';
	imageElement.style.height = '100px';
	imageContainer.appendChild(imageElement);

	/* const imageElement = document.createElement('img');
	imageElement.src = pfp;
	imageElement.alt = 'user_pfp';
	imageElement.style.width = '100px';
	imageElement.style.height = '100px'; */
	messageElement.innerText = message;
	imageContainer.append(messageElement);
}
