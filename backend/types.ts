import {WebSocket} from 'ws';
import {Model} from 'mongoose';

export interface ActiveConnection {
  [id: string]: WebSocket;
}

export interface IncomingMessage {
  type: string;
  payload: string;
}

export interface UserDocument {
  _id: string;
  username: string;
  password: string;
  token: string;
  role: string;
  active: boolean;
}

export interface UserFields {
  _id: string;
  username: string;
  password: string;
  token: string;
  role: string;
  displayName?: string;
  active: boolean;
}

export interface UserMethods {
  checkPassword(password: string): Promise<boolean>;

  generateToken(): void;
}

export type UserModel = Model<UserFields, {}, UserMethods>;