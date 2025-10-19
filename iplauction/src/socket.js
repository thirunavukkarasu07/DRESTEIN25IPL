import { io } from 'socket.io-client';

// adjust URL/port to match server (use env in production)
const SOCKET_URL = 'http://localhost:5002';

const socket = io(SOCKET_URL, { autoConnect: true });

export default socket;
