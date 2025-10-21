import { io } from 'socket.io-client';

// adjust URL/port to match server (use env in production)
const SOCKET_URL = 'https://jz42r90t-5000.inc1.devtunnels.ms/';

const socket = io(SOCKET_URL, { autoConnect: true });

export default socket;
