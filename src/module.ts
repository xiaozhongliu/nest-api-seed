import { Module } from '@nestjs/common'
import { ConfigModule } from './_base/config.module'
import { LoggerModule } from './_base/logger.module'
import { HomeController } from './home/controller'
import { HomeService } from './home/service'

@Module({
    imports: [ConfigModule, LoggerModule],
    controllers: [HomeController],
    providers: [HomeService],
})
export class MainModule { }
