import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { ConfigModule } from './facility/config.module'
import { LoggerModule } from './facility/logger.module'
import { CatSchema } from './schema/cat.schema'
import { HomeController } from './module/home/controller'
import { HomeService } from './module/home/service'
import { CatController } from './module/cat/controller'
import { CatService } from './module/cat/service'

@Module({
    imports: [
        ConfigModule,
        LoggerModule,
        MongooseModule.forRoot('mongodb://localhost/test', {
            useNewUrlParser: true,
        }),
        MongooseModule.forFeature([
            { name: 'Cat', schema: CatSchema },
        ]),
    ],
    controllers: [
        HomeController,
        CatController,
    ],
    providers: [
        HomeService,
        CatService,
    ],
})
export class MainModule { }
