import { Controller, UseInterceptors, Inject, Get } from '@nestjs/common'
import { LoggingInterceptor } from '../../interceptor/logging.interceptor'
import { HomeService } from './service'

@Controller()
@UseInterceptors(LoggingInterceptor)
export class HomeController {
    @Inject() private readonly homeService: HomeService

    @Get()
    index(): string {
        return this.homeService.index()
    }
}
