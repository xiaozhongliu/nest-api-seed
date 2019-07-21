import { Module } from '@nestjs/common'
import { ConfigModule } from './framework/config.module'
import { LoggerModule } from './framework/logger.module'
import { HomeController } from './home/controller'
import { HomeService } from './home/service'

@Module({
    imports: [ConfigModule, LoggerModule],
    controllers: [HomeController],
    providers: [HomeService],
})
export class MainModule { }
