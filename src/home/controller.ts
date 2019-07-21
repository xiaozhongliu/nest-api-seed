import { Controller, Get } from '@nestjs/common'
import { HomeService } from './service'
import { ConfigService } from '../framework/config.service'
import { Logger } from '../framework/logger.service'

@Controller()
export class HomeController {
    constructor(
        private readonly homeService: HomeService,
        private readonly config: ConfigService,
        private readonly logger: Logger,
    ) { }

    @Get()
    getHello(): string {
        this.logger.cache('event', 'controller', 'url', 'value')
        return this.homeService.getHello()
    }
}
