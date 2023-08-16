import { IsNotEmpty, IsString } from "class-validator";


export class CriaPessoaDTO {
    @IsString()
    @IsNotEmpty({ message: "Nome não pode ser vazio" })
    NOME: string;
}