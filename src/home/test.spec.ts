import { Test, TestingModule } from '@nestjs/testing'
import { HomeController } from './controller'
import { HomeService } from './service'

describe('HomeController', () => {
    let homeController: HomeController
    let homeService: HomeService

    beforeEach(async () => {
        const home: TestingModule = await Test.createTestingModule({
            controllers: [HomeController],
            providers: [HomeService],
        }).compile()

        homeController = home.get<HomeController>(HomeController)
        homeService = home.get<HomeService>(HomeService)
    })

    describe('home', () => {
        it('controller should return "Hello World!"', () => {
            expect(homeController.getHello()).toBe('Hello World!')
        })

        it('service should return "Hello World!"', () => {
            expect(homeService.getHello()).toBe('Hello World!')
        })
    })
})
