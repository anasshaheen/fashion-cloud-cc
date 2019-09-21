import { cacheEntryConfig } from '../config';
import { CacheEntry } from '../models';
import { CommonHelpers } from './';

// Handle max number of entries in the cache as follows:
// if it's exceeded then remove the entries with TTL
// that about to finish and created at is old.
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
