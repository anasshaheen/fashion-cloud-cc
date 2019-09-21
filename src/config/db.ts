import { HostingEnvironment } from '../helpers';
import { IDbConfig } from '../types';

const nodeEnv = process.env.NODE_ENV as string;
// Checking for only testing and development
let dbConfig: IDbConfig;
if (HostingEnvironment.isDevelopment(nodeEnv)) {
  dbConfig = {
    url: process.env.DEV_DATABASE_URI as string
  };
} else if (HostingEnvironment.isProduction(nodeEnv)) {
  dbConfig = {
    url: process.env.PROD_DATABASE_URI as string
  };
} else {
  dbConfig = {
    url: process.env.TEST_DATABASE_URI as string
  };
}

export default dbConfig;
