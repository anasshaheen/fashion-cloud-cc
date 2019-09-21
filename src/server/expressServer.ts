import bodyParser from 'body-parser';
import compression from 'compression';
import cors from 'cors';
import express, { Express } from 'express';
import helmet from 'helmet';
import { Server } from 'http';

import { serverConfig } from '../config';
import { IController } from '../types';

export default class ExpressServer {
  private startingMessage: string;
  private app: Express;
  private server: Server;

  constructor(
    startingMessage: string = `server started at port ${serverConfig.port}`
  ) {
    this.startingMessage = startingMessage;
    this.init();
  }

  start() {
    this.server = this.app.listen(serverConfig.port, () => {
      console.log(this.startingMessage);
    });
  }

  addControllers(controllers: IController[]) {
    controllers.map(controller => {
      this.app.use('/', controller.router);
    });
  }

  stop() {
    if (!this.server) {
      throw new Error('Server is not runnign!');
    }

    this.server.close();
  }

  private init() {
    this.app = express();
    this.setMiddlewares();
  }

  private setMiddlewares() {
    this.app.use(bodyParser.urlencoded({ extended: true }));
    this.app.use(bodyParser.json());
    this.app.use(cors());
    this.app.use(compression());
    this.app.use(helmet());
  }
}
