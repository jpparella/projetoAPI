import { IsEmail, IsInt, IsNotEmpty, IsString, MinLength } from "class-validator";
import { EmailUnico } from "src/validacao/email-unico.validator";

export class CriaUsuarioDTO{

    @IsString()
    @IsNotEmpty({message: "id_pessoa não pode ser vazio"})
    idpessoa: string;

    @IsEmail(undefined,{message: "Email inválido"})
    // @EmailUnico({message:"Já existe usuário com esse email"})
    email:string;

    @IsString()
    @IsNotEmpty({message: "login não pode ser vazio"})
    login: string;

    @MinLength(6,{message: "Tamanho da senha inválido"})
    senha:string;

}