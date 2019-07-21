import { Controller, Logger, Get } from '@nestjs/common'
import { HomeService } from './service'
import { ConfigService } from 'src/framework/config.service'

@Controller()
export class HomeController {
    constructor(
        private readonly homeService: HomeService,
        private readonly config: ConfigService,
        private readonly logger: Logger,
    ) { }

    @Get()
    getHello(): string {
        this.logger.log(this.config.DEBUG)
        return this.homeService.getHello()
    }
}
