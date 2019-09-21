import { Router } from 'express';

export interface IServerConfig {
  port: number;
  env: string;
}

export interface IController {
  path: string;
  router: Router;
}
