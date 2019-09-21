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
  },
  validTo: {
    type: Number
  },
  createdAt: {
    type: Number
  }
});

export default model('cacheEntries', CacheEntry);
