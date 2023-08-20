import { IsNotEmpty, IsOptional, IsString } from "class-validator";


export class PesquisaPessoaDTO {
    @IsString()
    @IsNotEmpty({ message: "Nome não pode ser vazio" })
    @IsOptional()
    NOME: string;
}