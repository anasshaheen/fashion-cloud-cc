import { Router } from 'express';

export interface IServerConfig {
  port: number;
  env: string;
}

export interface IController {
  path: string;
  router: Router;
}

export interface IDbConfig {
  url: string;
}

export interface ICacehEntryConfig {
  ttl: number;
  maxNumberOfEntries: number;
}
