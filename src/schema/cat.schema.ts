import * as mongoose from 'mongoose'

export interface Cat extends mongoose.Document {
    readonly name: string,
    readonly age: number,
    readonly breed: string,
}

export const CatSchema = new mongoose.Schema<Cat>({
    name: String,
    age: Number,
    breed: String,
}, { versionKey: false })
