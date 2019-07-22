import { Controller, Inject, Get } from '@nestjs/common'
import { Logger } from '../_base/logger.service'
import { HomeService } from './service'

@Controller()
export class HomeController {
    @Inject() private readonly logger: Logger
    @Inject() private readonly homeService: HomeService

    @Get()
    getHello(): string {
        this.logger.cache('event', 'controller', 'url', 'value')
        return this.homeService.getHello()
    }
}
