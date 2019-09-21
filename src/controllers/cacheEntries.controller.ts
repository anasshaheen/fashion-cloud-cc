import { Request, Response, Router } from 'express';

import { generateRandomString } from '../helpers';
import { CacheEntry } from '../models';
import { IController } from '../types';

class CacheEntriesController implements IController {
  path: string;
  router: import('express').Router;

  constructor() {
    this.path = '/cacheEntries';
    this.router = Router();
    this.initRoutes();
  }

  initRoutes() {
    this.router.get(`${this.path}/:key`, this.get);
    this.router.get(`${this.path}`, this.getAll);
    this.router.post(`${this.path}/:key`, this.createOrUpdate);
    this.router.delete(`${this.path}/:key`, this.remove);
    this.router.delete(`${this.path}`, this.removeAll);
  }

  async getAll(_: Request, res: Response) {
    const entries = await CacheEntry.find({});
    const keys = entries.map(entry => entry.get('key'));

    return res.json({
      data: keys,
      message: 'Cached keys retrieved successfully!'
    });
  }

  async get(req: Request, res: Response) {
    const { key } = req.params;

    let cacheEntry = await CacheEntry.findOne({
      key
    });
    if (!cacheEntry) {
      console.log('Cache miss');
      const randStr = generateRandomString();
      cacheEntry = new CacheEntry({
        key,
        value: randStr
      });
      await cacheEntry.save();

      return res.status(200).json({
        message: 'Key retrived successfully!',
        data: randStr
      });
    } else {
      console.log('Cache hit');

      return res.status(200).json({
        message: 'Key retrived successfully!',
        data: cacheEntry.get('value')
      });
    }
  }

  async createOrUpdate(req: Request, res: Response) {
    const { key } = req.params;
    const { value } = req.body;

    let cacheEntry = await CacheEntry.findOne({
      key
    });
    if (!cacheEntry) {
      cacheEntry = new CacheEntry({
        key,
        value
      });
      await cacheEntry.save();

      return res.status(201).json({
        message: 'Key is added successfully!'
      });
    } else {
      await cacheEntry.updateOne({
        value
      });

      return res.status(200).json({
        message: 'Key is updated successfully!'
      });
    }
  }

  async remove(req: Request, res: Response) {
    const { key } = req.params;
    if (!key) {
      return res.status(400).json({
        message: 'Key is not valid!'
      });
    }

    let cacheEntry = await CacheEntry.findOne({
      key
    });
    if (!cacheEntry) {
      return res.status(404).json({
        message: 'Key is not found!'
      });
    }
    await CacheEntry.deleteOne({
      key
    });

    return res.status(200).json({
      message: 'Key removed successfully!'
    });
  }

  async removeAll(_: Request, res: Response) {
    await CacheEntry.remove({}).exec();

    return res.status(200).json({
      message: 'All keys removed from cache successfully!'
    });
  }
}

export default CacheEntriesController;
