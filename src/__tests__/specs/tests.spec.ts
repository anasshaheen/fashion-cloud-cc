import supertest from 'supertest';

import { ExpressServer } from '../../server';
import controllers from '../../controllers';
import { DbServices } from '../../services';

const server = new ExpressServer();
server.addControllers(controllers);

beforeAll(async () => {
  jest.setTimeout(30000);
  await DbServices.initDb();
});

test('GET /api/cacheEntries/:key : valid payload, 200', done => {
  supertest(server.app)
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
  supertest(server.app)
    .get('/api/cacheEntries')
    .expect(200)
    .end((err: any, res: any) => {
      if (err) {
        done(err);
      } else {
        const actual = res.body.data;
        const expected = [123];

        expect(actual).toEqual(expected);
        done();
      }
    });
});

test('DELETE /api/cacheEntries/:key : valid payload, 200', done => {
  supertest(server.app)
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
  supertest(server.app)
    .delete('/api/cacheEntries/123')
    .expect(404)
    .end((err: any, res: any) => {
      if (err) {
        done(err);
      } else {
        const actual = res.body.message;
        const expected = 'Key is not valid!';

        expect(actual).toEqual(expected);
        done();
      }
    });
});

test('POST /api/cacheEntries : valid payload, 201', done => {
  supertest(server.app)
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
  supertest(server.app)
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
  supertest(server.app)
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
  supertest(server.app)
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
