import { Module } from '@nestjs/common'
import { Logger } from './logger.service'
import { ConfigService } from './config.service'
import { ConfigModule } from './config.module'

@Module({
    imports: [ConfigModule],
    providers: [{
        provide: Logger,
        inject: [ConfigService],
        useFactory: (config: ConfigService) => new Logger(config),
    }],
    exports: [Logger],
})
export class LoggerModule { }
