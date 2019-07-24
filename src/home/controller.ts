import { Controller, UseInterceptors, Inject, Get, Post, Body } from '@nestjs/common'
import { LoggingInterceptor } from '../_interceptor/logging.interceptor'
import { HomeService } from './service'
import { DemoDto } from './dto/demo.dto'

@Controller()
@UseInterceptors(LoggingInterceptor)
export class HomeController {
    @Inject() private readonly homeService: HomeService

    @Get()
    index(): string {
        return this.homeService.index()
    }

    @Post()
    create(@Body() demoDto: DemoDto) {
        return demoDto.name
    }
}
