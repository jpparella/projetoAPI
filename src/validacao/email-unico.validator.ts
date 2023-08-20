import { Injectable } from "@nestjs/common";
import { registerDecorator, ValidationArguments, ValidationOptions, ValidatorConstraint, ValidatorConstraintInterface } from "class-validator";
import { UsuarioService } from "src/usuario/usuario.service";

@Injectable()
@ValidatorConstraint({async:true})
export class EmailUnicoValidator implements ValidatorConstraintInterface{
    constructor (private usuarioService: UsuarioService){}
    
    async validate(value: string, validationArguments?: ValidationArguments): Promise<boolean> {
        const validarEmail = await this.usuarioService.validaEmail(value);
        return !validarEmail;
    }    
}

export const EmailUnico = (opcaoValidacao: ValidationOptions)=>{
    return (objeto: Object, propriedade: string) => {
        registerDecorator({
            target: objeto.constructor,
            propertyName: propriedade,
            options: opcaoValidacao,
            constraints: [],
            validator: EmailUnicoValidator,
        })
    }
}