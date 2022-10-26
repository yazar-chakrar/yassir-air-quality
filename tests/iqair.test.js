/*jshint esversion: 8*/
const request = require('supertest');
const mongoose = require('mongoose');

let server;

describe('API / Air Quality', () => {
    beforeEach(() => { server = require('../app'); });
    afterEach(  () => { 
        server.close(); 
        mongoose.connection.close();
    });

    describe('GET ', () => {
        it('sould return status 200', async ()=>{
            const res = await request(server)
            .get('/api/iqair?lat=48&lon=2.352222');
        
        expect(res.status).toBe(200);

        });

        it('sould return status 400, giving Invalid lat', async ()=>{
            const res = await request(server)
            .get('/api/iqair?lat=448&lon=2.352222');
        
        expect(res.status).toBe(400);

        });
        
    });
});