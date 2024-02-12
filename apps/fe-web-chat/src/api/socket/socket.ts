import { io } from 'socket.io-client';

const URL = process.env.NX_BE_EVENTS_URL || '';

export const socket = io(URL);
