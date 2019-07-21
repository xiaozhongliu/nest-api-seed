import * as request from 'supertest'
import { Test, TestingModule } from '@nestjs/testing'
import { MainModule } from '../src/module'

describe('AppController (e2e)', () => {
    let app

    beforeEach(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [MainModule],
        }).compile()

        app = moduleFixture.createNestApplication()
        await app.init()
    })

    it('/ (GET)', () => {
        return request(app.getHttpServer())
            .get('/')
            .expect(200)
            .expect('Hello World!')
    })
})
