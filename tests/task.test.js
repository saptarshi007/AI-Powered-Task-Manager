const request = require('supertest');
const app = require('../app');

describe('Task API', () => {
    it('should create a new task', async () => {
        const response = await request(app)
            .post('/api/tasks')
            .send({ title: 'Test Task', description: 'Test Description', deadline: '2025-03-30' });
        expect(response.status).toBe(201);
        expect(response.body.priority).toBeDefined();
    });

    it('should retrieve all tasks', async () => {
        const response = await request(app).get('/api/tasks');
        expect(response.status).toBe(200);
        expect(Array.isArray(response.body)).toBe(true);
    });
});