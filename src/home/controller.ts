import { Controller, UseInterceptors, Inject, Get } from '@nestjs/common'
import { LoggingInterceptor } from '../_interceptor/logging.interceptor'
import { HomeService } from './service'

@Controller()
@UseInterceptors(LoggingInterceptor)
export class HomeController {
    @Inject() private readonly homeService: HomeService

    @Get()
    getHello(): string {
        return this.homeService.getHello()
    }
}
