import { Module } from '@nestjs/common'
import { ConfigService } from './config.service'
import * as path from 'path'

@Module({
    providers: [
        {
            provide: ConfigService,
            useValue: new ConfigService(`config/${process.env.NODE_ENV || 'local'}.yml`),
        },
    ],
    exports: [ConfigService],
})
export class ConfigModule { }
