import { Schema, model } from 'mongoose';

const SystemConfig = new Schema({
  maxTtl: {
    type: Number,
    default: 30
  },
  maxNumberOfCacheEntries: {
    type: Number,
    default: 10
  }
});

export default model('systemConfig', SystemConfig);
