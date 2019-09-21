import { Db } from 'mongodb';
import mongoose from 'mongoose';

import { dbConfig } from '../config';

async function initDb(): Promise<Db> {
  return new Promise((resolve, reject) => {
    mongoose.Promise = global.Promise;

    mongoose.connect(
      dbConfig.url,
      {
        useCreateIndex: true,
        useNewUrlParser: true,
        useUnifiedTopology: true
      },
      err => {
        if (err) {
          reject(err);
        }
      }
    );

    mongoose.connection.once('open', async () => {
      console.log(`Connected to db at ${dbConfig.url}`);
      resolve(mongoose.connection.db);
    });
  });
}

export default initDb;
