import { Module } from '@nestjs/common'
import { Logger } from './logger.service'
import { ConfigModule } from './config.module'
import { ConfigService } from './config.service'

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
