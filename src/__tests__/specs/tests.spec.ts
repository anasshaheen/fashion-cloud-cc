import { Server } from 'http';
import { agent, SuperTest, Test } from 'supertest';

import { ExpressServer } from '../../server';
import { DbServices } from '../../services';
import controllers from '../../controllers';

const expressServer = new ExpressServer();
expressServer.addControllers(controllers);

let request: SuperTest<Test>;
let server: Server;

beforeAll(async done => {
  const db = await DbServices.initDb();
  await db.dropCollection('cacheentries');
  server = expressServer.app.listen(done);
  request = agent(server);
});

afterAll(done => {
  server.close(done);
});

describe('CacheEntries API', () => {
  test('GET /api/cacheEntries/:key : valid payload, 200', done => {
    return request
      .get('/api/cacheEntries/123')
      .expect(200)
      .end((err: any, res: any) => {
        if (err) {
          done(err);
        } else {
          const actual = res.body.message;
          const expected = 'Key retrived successfully!';

          expect(actual).toEqual(expected);
          done();
        }
      });
  });

  test('GET /api/cacheEntries : valid payload, 200', done => {
    return request
      .get('/api/cacheEntries')
      .expect(200)
      .end((err: any, res: any) => {
        if (err) {
          done(err);
        } else {
          const actual = res.body.data;
          const expected = ['123'];

          expect(actual).toEqual(expected);
          done();
        }
      });
  });

  test('DELETE /api/cacheEntries/:key : valid payload, 200', done => {
    return request
      .delete('/api/cacheEntries/123')
      .expect(200)
      .end((err: any, res: any) => {
        if (err) {
          done(err);
        } else {
          const actual = res.body.message;
          const expected = 'Key removed successfully!';

          expect(actual).toEqual(expected);
          done();
        }
      });
  });

  test('DELETE /api/cacheEntries : valid payload, 404', done => {
    return request
      .delete('/api/cacheEntries/123')
      .expect(404)
      .end((err: any, res: any) => {
        if (err) {
          done(err);
        } else {
          const actual = res.body.message;
          const expected = 'Key is not found!';

          expect(actual).toEqual(expected);
          done();
        }
      });
  });

  test('POST /api/cacheEntries : valid payload, 201', done => {
    return request
      .post('/api/cacheEntries/123456789')
      .send({
        value: '123456789'
      })
      .expect(201)
      .expect('Content-Type', 'application/json; charset=utf-8')
      .end((err: any, res: any) => {
        if (err) {
          done(err);
        } else {
          const actual = res.body.message;
          const expected = 'Key is added successfully!';

          expect(actual).toEqual(expected);
          done();
        }
      });
  });

  test('POST /api/cacheEntries : valid payload, 200', done => {
    return request
      .post('/api/cacheEntries/123456789')
      .send({
        value: '987456321'
      })
      .expect(200)
      .expect('Content-Type', 'application/json; charset=utf-8')
      .end((err: any, res: any) => {
        if (err) {
          done(err);
        } else {
          const actual = res.body.message;
          const expected = 'Key is updated successfully!';

          expect(actual).toEqual(expected);
          done();
        }
      });
  });

  test('DELETE /api/cacheEntries : valid payload, 200', done => {
    return request
      .delete('/api/cacheEntries')
      .expect(200)
      .end((err: any, res: any) => {
        if (err) {
          done(err);
        } else {
          const actual = res.body.message;
          const expected = 'All keys removed from cache successfully!';

          expect(actual).toEqual(expected);
          done();
        }
      });
  });

  test('DELETE /api/cacheEntries : valid payload, 200', done => {
    return request
      .delete('/api/cacheEntries')
      .expect(200)
      .end((err: any, res: any) => {
        if (err) {
          done(err);
        } else {
          const actual = res.body.message;
          const expected = 'All keys removed from cache successfully!';

          expect(actual).toEqual(expected);
          done();
        }
      });
  });
});
