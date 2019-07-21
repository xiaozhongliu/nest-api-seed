import { Module } from '@nestjs/common'
import { Logger } from './logger.service'
import { ConfigService } from './config.service'
import { ConfigModule } from './config.module'

if (!process.env.NODE_ENV) { process.env.NODE_ENV = 'local' }
if (!process.env.REGION) { process.env.REGION = 'hangzhou' }

@Module({
    imports: [ConfigModule],
    providers: [
        {
            provide: Logger,
            inject: [ConfigService],
            useFactory: (config: ConfigService) => new Logger(config),
        },
    ],
    exports: [Logger],
})
export class LoggerModule { }
