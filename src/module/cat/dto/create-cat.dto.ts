import { IsOptional, IsInt, Min, Max, IsNotEmpty } from 'class-validator'

export class CreateCatDto {
    @IsNotEmpty()
    readonly name: string

    @IsInt()
    @Min(0)
    @Max(150)
    @IsOptional()
    readonly age: number

    readonly breed: string
}
