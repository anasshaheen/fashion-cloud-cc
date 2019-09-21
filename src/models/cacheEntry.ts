import { Schema, model } from 'mongoose';

const CacheEntry = new Schema({
  key: {
    type: String,
    required: true,
    unique: true,
    index: true
  },
  value: {
    type: String,
    required: true
  }
});

export default model('cacheEntries', CacheEntry);
