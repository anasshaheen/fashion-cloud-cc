import { cacheEntryConfig } from '../config';
import { CacheEntry } from '../models';
import { CommonHelpers } from './';

// Handle the max number of entries in the cache as follows: 
// if the limit is exceeded then remove the entry with the TTL 
// which is about to finish or is already finished and the creation time is the oldest.
async function handleCahceLimit(key: string, value: string): Promise<boolean> {
  const count = await CacheEntry.countDocuments();
  if (count < cacheEntryConfig.maxNumberOfEntries) {
    return false;
  }

  const entry = await CacheEntry.find({})
    .sort({
      validTo: 1,
      createdAt: 1
    })
    .findOne()
    .exec();
  if (!entry) {
    return false;
  }

  await entry.updateOne({
    key,
    value,
    validTo: CommonHelpers.generateTtl(),
    createdAt: new Date().getTime()
  });

  return true;
}

export default handleCahceLimit;
