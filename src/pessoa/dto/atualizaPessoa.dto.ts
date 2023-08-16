import { IsNotEmpty, IsString } from "class-validator";

export class AlteraPessoaDTO{
    @IsString()
    @IsNotEmpty({message: "Nome não pode ser vazio"})
    NOME: string;
}