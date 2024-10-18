import {WebSocket} from 'ws';

export interface Connection {
  [id: string]: WebSocket;
}

export interface IncomingData {
  type: string;
  payload: string;
}