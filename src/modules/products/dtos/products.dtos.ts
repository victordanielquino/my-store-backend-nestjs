import { IsString, IsNumber, IsUrl, IsEmail, IsNotEmpty, IsDate, IsPositive } from "class-validator";
//import { PartialType } from "@nestjs/mapped-types";
import { PartialType } from "@nestjs/swagger";

export class CreateProductDto {
    @IsString()
    @IsNotEmpty()
    readonly name: string;

    @IsString()
    @IsNotEmpty()
    readonly description: string;

    @IsNumber()
    @IsNotEmpty()
    @IsPositive()
    readonly price: number;

    @IsNumber()
    @IsNotEmpty()
    @IsPositive()
    readonly stock: number;

    @IsUrl()
    @IsNotEmpty()
    readonly image: string;
}

// con PartialType haremos que las validaciones opcionales sean dinamicas
/*
export class UpdateProductDto {
    readonly name?: string;
    readonly description?: string;
    readonly price?: number;
    readonly stock?: number;
    readonly image?: string;
}*/
export class UpdateProductDto extends PartialType(CreateProductDto){};
