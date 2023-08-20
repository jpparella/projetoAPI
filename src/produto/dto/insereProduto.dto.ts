import { IsArray, IsBoolean, IsInt, IsNotEmpty, IsNumber, IsString } from "class-validator";


export class CriaProdutoDTO {
    @IsString()
    @IsNotEmpty({ message: "Nome não pode ser vazio" })
    NOME: string;

    @IsNumber()
    VALOR: number;

    @IsString()
    IDMARCA: string;
}