import dotenv from 'dotenv';
dotenv.config();

import { ExpressServer } from './server';
import { initDb } from './services';
import controllers from './controllers';

async function initServer() {
  const server = new ExpressServer();
  try {
    await initDb();

    server.addControllers(controllers);
    server.start();
  } catch (err) {
    console.log(err);
    if (server.isRuning()) {
      server.stop();
    }
  }
}

export default initServer;
