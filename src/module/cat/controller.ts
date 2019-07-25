import { Controller, UseInterceptors, Inject, Get, Post, Body } from '@nestjs/common'
import { LoggingInterceptor } from '../../interceptor/logging.interceptor'
import { CatService } from './service'
import { CreateCatDto } from './dto/create-cat.dto'

@Controller('cats')
@UseInterceptors(LoggingInterceptor)
export class CatController {
    @Inject() private readonly catService: CatService

    @Post()
    async create(@Body() createCatDto: CreateCatDto) {
        return this.catService.create(createCatDto)
    }

    @Get()
    async findAll() {
        return this.catService.findAll()
    }
}
