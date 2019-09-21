import { cacheEntryConfig } from '../config';

export default class CommonHelpers {
  static generateRandomString() {
    let result = '';
    const characters =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;

    for (var i = 0; i < 30; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }

    return result;
  }

  static generateTtl() {
    const newDate = new Date();
    newDate.setMinutes(newDate.getMinutes() + cacheEntryConfig.ttl);

    return newDate.getTime();
  }
}
