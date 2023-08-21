import { IsNotEmpty, IsString } from "class-validator";

export class CriaPessoaDTO{
    @IsString()
    @IsNotEmpty({message: "Nome não pode ser vazio"})
    nome: string;

    @IsString()
    @IsNotEmpty({message: "Endereço não pode ser vazio"})
    endereco: string;

    @IsString()
    @IsNotEmpty({message: "Telefone não pode ser vazio"})
    telefone: string;
}