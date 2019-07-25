import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { Cat } from '../../schema/cat.schema'
import { CreateCatDto } from './dto/create-cat.dto'

@Injectable()
export class CatService {
    constructor(@InjectModel('Cat') private readonly catModel: Model<Cat>) { }

    async create(createCatDto: CreateCatDto): Promise<Cat> {
        const createdCat = new this.catModel(createCatDto)
        return createdCat.save()
    }

    async findAll(): Promise<Cat[]> {
        return this.catModel.find().exec()
    }
}
