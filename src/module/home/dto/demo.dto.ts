import { IsNotEmpty, IsEmail, IsInt, Min, Max } from 'class-validator'

export class DemoDto {
    @IsNotEmpty()
    name: string

    @IsEmail()
    email: string

    @IsInt()
    @Min(0)
    @Max(150)
    age: number
}
