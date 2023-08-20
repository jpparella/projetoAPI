import { IsNotEmpty, IsString } from "class-validator";

export class AlteraProdutoDTO {
    @IsString()
    @IsNotEmpty({ message: "Nome não pode ser vazio" })
    NOME: string;
}