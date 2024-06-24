const request = require('supertest');
const server = require('../src/app.js');

describe("CRUD operations of EdiMarket", () => {
    it("Get status code 500" , async () => {
        const {statusCode, body: EdiMarketUsers} = await request(server).get("/usuarios/").send()
        expect(statusCode).toBe(500)
        // expect(EdiMarketUsers).toBeInstanceOf('Array')

    })
})
