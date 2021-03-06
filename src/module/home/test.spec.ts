import { Test, TestingModule } from '@nestjs/testing'
import { ConfigModule } from '../../facility/config.module'
import { LoggerModule } from '../../facility/logger.module'
import { HomeController } from './controller'
import { HomeService } from './service'

describe('HomeController', () => {
    let homeController: HomeController
    let homeService: HomeService

    beforeEach(async () => {
        const home: TestingModule = await Test.createTestingModule({
            imports: [ConfigModule, LoggerModule],
            controllers: [HomeController],
            providers: [HomeService],
        }).compile()

        homeController = home.get<HomeController>(HomeController)
        homeService = home.get<HomeService>(HomeService)
    })

    describe('home', () => {
        it('controller should return "Hello World!"', () => {
            expect(homeController.index()).toBe('Hello World!')
        })

        it('service should return "Hello World!"', () => {
            expect(homeService.index()).toBe('Hello World!')
        })
    })
})
