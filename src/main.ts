import dotenv from 'dotenv';
dotenv.config();

import { ExpressServer } from './server';

export default function initServer() {
  const server = new ExpressServer();
  server.start();
}
