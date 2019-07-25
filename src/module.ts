import { Module } from '@nestjs/common'
import { ConfigModule } from './facility/config.module'
import { LoggerModule } from './facility/logger.module'
import { HomeController } from './module/home/controller'
import { HomeService } from './module/home/service'

@Module({
    imports: [ConfigModule, LoggerModule],
    controllers: [HomeController],
    providers: [HomeService],
})
export class MainModule { }
