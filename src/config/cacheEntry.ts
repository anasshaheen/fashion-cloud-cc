import { ICacehEntryConfig } from '../types';

const cacheEntryConfig: ICacehEntryConfig = {
  ttl: (process.env.TTL_IN_MINS || 60) as number,
  maxNumberOfEntries: (process.env.MAX_NUMBER_OF_ENTIRES || 10) as number
};

export default cacheEntryConfig;
