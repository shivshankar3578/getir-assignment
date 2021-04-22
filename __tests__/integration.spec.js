const request = require('supertest');
const { matchers } = require('jest-json-schema');
const app = require('../app')
expect.extend(matchers);

const recordSchema = {
  $id: 'recordSchema',
  type: 'array',
  items: {
    additionalProperties: false,
    type: 'object',
    properties: {
      totalCount: {
        type: 'number',
      },
      createdAt: {
        type: 'string',
        // format: 'date',
      },
    }
  }
};

describe('testing Record API ', () => {
  test('GET /records', (done) => {
    request(app)
      .get('/records?startDate=2017-01-01&endDate=2017-12-31&minCount=3000&maxCount=4000')
      .expect('Content-Type', /json/)
      .expect(200)
      .end(function (err, res) {
        if (err) return done(err)

        if (res.body && res.body.records) {
          expect(res.body.records).toMatchSchema(recordSchema)
        }
        done()
      });
  }, 10000)

  test('404', (done) => {
    request(app)
      .get('/unknown')
      .expect('Content-Type', /json/)
      .expect(404)
      .end(function (err, res) {
        if (err) return done(err)
        done()
      });
  })

})