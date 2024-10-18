import mongoose from 'mongoose';
import config from './config';
import crypto from 'crypto';
import User from './models/User';
import Message from './models/Message';

const dropCollection = async (db: mongoose.Connection, collectionName: string) => {
  try {
    await db.dropCollection(collectionName);
  } catch (e) {
    console.log(`Collection ${collectionName} was missing, skipping drop...`);
  }
};

const run = async () => {
  await mongoose.connect(config.mongoose.db);
  const db = mongoose.connection;

  const collections = ['users', 'messages'];

  for (const collectionName of collections) {
    await dropCollection(db, collectionName);
  }

  const [moderator, user] = await User.create(
    {
      username: 'Dima Pupkin',
      password: '654321',
      token: crypto.randomUUID(),
      displayName: 'Dima',
      role: 'moderator',
      active: false,
    }, {
      username: 'Vasya Pupkin',
      password: '123456',
      token: crypto.randomUUID(),
      displayName: 'Vasya',
      role: 'user',
      active: false,
    }
  );

  await Message.create(
    {
      author: moderator._id,
      text: 'Hello Everyone',
      date: new Date(),
    }, {
      author: user._id,
      text: 'Hello Dima',
      date: new Date(),
    }
  );

  await db.close();
};

void run();