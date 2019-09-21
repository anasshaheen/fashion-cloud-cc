import dotenv from 'dotenv';
dotenv.config();

import { ExpressServer } from './server';
import { initDb } from './services';

async function initServer() {
  const server = new ExpressServer();
  try {
    await initDb();

    server.start();
  } catch (err) {
    if (server.isRuning()) {
      server.stop();
    }
  }
}

export default initServer;
