import { io } from 'socket.io-client';

const socketUrl = process.env.REACT_APP_SERVER_URL;

const socket = io(socketUrl);

export default socket;