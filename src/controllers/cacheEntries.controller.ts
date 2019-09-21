import { Request, Response, Router } from 'express';

import { CommonHelpers, handleCahceLimit } from '../helpers';
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
    const currentTime = new Date().getTime();
    const entries = await CacheEntry.find({});
    const keys = await Promise.all(
      entries.map(async entry => {
        if (entry.get('validTo') < currentTime) {
          const newValue = CommonHelpers.generateRandomString();
          await entry.updateOne({
            value: newValue
          });

          return newValue;
        }

        return entry.get('key');
      })
    );

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

      const randStr = CommonHelpers.generateRandomString();
      const result = await handleCahceLimit(key, randStr);
      if (!result) {
        cacheEntry = new CacheEntry({
          key,
          value: randStr,
          validTo: CommonHelpers.generateTtl(),
          createdAt: new Date().getTime()
        });
        await cacheEntry.save();
      }

      return res.status(200).json({
        message: 'Key retrived successfully!',
        data: randStr
      });
    } else {
      console.log('Cache hit');
      await cacheEntry.updateOne({
        validTo: CommonHelpers.generateTtl()
      });

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
      const result = await handleCahceLimit(key, value);
      if (!result) {
        cacheEntry = new CacheEntry({
          key,
          value,
          validTo: CommonHelpers.generateTtl(),
          createdAt: new Date().getTime()
        });
        await cacheEntry.save();
      }

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
    await CacheEntry.deleteMany({}).exec();

    return res.status(200).json({
      message: 'All keys removed from cache successfully!'
    });
  }
}

export default CacheEntriesController;
