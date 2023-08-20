import { IsNotEmpty, IsOptional, IsString } from "class-validator";


export class PesquisaMarcaDTO {
    @IsString()
    @IsNotEmpty({ message: "Nome não pode ser vazio" })
    @IsOptional()
    NOME: string;
}