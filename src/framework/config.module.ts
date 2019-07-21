import { Module } from '@nestjs/common'
import { ConfigService } from './config.service'

if (!process.env.NODE_ENV) { process.env.NODE_ENV = 'local' }
if (!process.env.REGION) { process.env.REGION = 'hangzhou' }

@Module({
    providers: [
        {
            provide: ConfigService,
            useValue: new ConfigService(`config/${process.env.NODE_ENV}.yml`),
        },
    ],
    exports: [ConfigService],
})
export class ConfigModule { }
