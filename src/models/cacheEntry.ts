import { Schema, model } from 'mongoose';

const CacheEntry = new Schema({
  key: {
    type: String,
    required: true
  },
  value: {
    type: Object,
    required: true
  }
});

export default model('cacheEntries', CacheEntry);
