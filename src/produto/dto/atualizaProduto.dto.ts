import { IsArray, IsBoolean, IsInt, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";


export class AlteraProdutoDTO {
    @IsString()
    @IsNotEmpty({ message: "Nome não pode ser vazio" })
    @IsOptional()
    NOME: string;

    @IsOptional()
    @IsNumber()
    VALOR: number;

    @IsOptional()
    @IsString()
    IDMARCA: string;
}

