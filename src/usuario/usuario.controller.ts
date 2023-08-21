import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { RetornoCadastroDTO, RetornoObjDTO } from "src/dto/retorno.dto";
import { CriaUsuarioDTO } from "./dto/usuario.dto";
import { Usuario } from "./usuario.entity";
import { UsuarioService } from "./usuario.service";



@Controller('/usuario')
export class UsuarioController{
    constructor(private readonly usuarioService: UsuarioService){
             
    }

    @Get('listar')
    async listar(): Promise<Usuario[]>{
        return this.usuarioService.listar();
    }

    @Post('')
    async criaUsuario(@Body() dados: CriaUsuarioDTO): Promise<RetornoCadastroDTO>{        
        return this.usuarioService.inserir(dados)        
    }

    @Put(':id')
    async alterarUsuario(@Body() dados: CriaUsuarioDTO,@Param('id') id: string): Promise<RetornoCadastroDTO>{        
        return this.usuarioService.alterar(id,dados)        
    }
    
    @Get('ID-:id')
    async listarID(@Param('id') id: string): Promise<Usuario>{
        return this.usuarioService.localizarID(id);
    }

    @Get('')
    async listaNome(@Param('id') id: string): Promise<any>{
        return this.usuarioService.listaLogins();
    }

    @Delete('remove-:id')
    async removeUsuario(@Param('id') id: string): Promise<RetornoObjDTO>{
        return this.usuarioService.remover(id);
    }
  

}