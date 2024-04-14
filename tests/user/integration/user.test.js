const request = require('supertest')
let server = require('../../../index.js')
const db = require('../../../services/db/db.js')()

describe('API CALL /api/user', () => {
    // beforeAll(async () => {
    //     await db()
    // })
    describe('GET /user', () => {
        it('Should return all users', async () => {
            const res = await request(server).get('/api/user')
            expect(res.status).toBe(200)
        })
    })
    describe('POST /create-account', () => {
        it('It should return registered user with status code of 201', async () => {
            const res = await request(server)
                .post('/api/user/create-account')
                .send({
                    firstname: 'Kenechukwu',
                    lastname: 'adada',
                    password: '34242fwfwmom',
                    email: 'testme1022@gmail.com',
                    role: 'user',
                })

            expect(res.status).toBe(201)
        })
    })
})
