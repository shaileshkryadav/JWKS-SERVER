const request = require('supertest');
const app = require('../server');
process.env.NODE_ENV = 'test';

describe('JWKS Server', () => {

    test('GET JWKS returns only valid keys', async () => {
        const res = await request(app).get('/.well-known/jwks.json');
        expect(res.statusCode).toBe(200);
        expect(res.body.keys.length).toBeGreaterThan(0);
    });

    test('POST /auth returns token', async () => {
        const res = await request(app).post('/auth');
        expect(res.statusCode).toBe(200);
        expect(res.body.token).toBeDefined();
    });

    test('POST /auth?expired=true returns expired token', async () => {
        const res = await request(app).post('/auth?expired=true');
        expect(res.statusCode).toBe(200);
        expect(res.body.token).toBeDefined();
    });
});