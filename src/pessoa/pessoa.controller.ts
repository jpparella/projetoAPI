import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { RetornoCadastroDTO, RetornoObjDTO } from "src/dto/retorno.dto";
import { CriaPessoaDTO } from "./dto/criaPessoa.dto";
import { Pessoa } from "./pessoa.entity";
import { PessoaService } from "./pessoa.service";


@Controller('/pessoa')
export class PessoaController{
    constructor(private readonly pessoaService: PessoaService){
             
    }

    @Get('listar')
    async listar(): Promise<Pessoa[]>{
        return this.pessoaService.listar();
    }

    @Post('')
    async criaMarca(@Body() dados: CriaPessoaDTO): Promise<RetornoCadastroDTO>{        
        return this.pessoaService.inserir(dados)        
    }

    @Put(':id')
    async alterarMarca(@Body() dados: CriaPessoaDTO,@Param('id') id: string): Promise<RetornoCadastroDTO>{        
        return this.pessoaService.alterar(id,dados)        
    }
    
    @Get('ID-:id')
    async listarID(@Param('id') id: string): Promise<Pessoa>{
        return this.pessoaService.localizarID(id);
    }

    @Get('')
    async listaNome(@Param('id') id: string): Promise<any>{
        return this.pessoaService.listaNomes();
    }

    @Delete('remove-:id')
    async removeMarca(@Param('id') id: string): Promise<RetornoObjDTO>{
        return this.pessoaService.remover(id);
    }

    // @Get('ComForn/')
    // async listaMarcaForn(@Body() dados: PesquisaMarcaDTO): Promise<listaMarcaFornDTO[]>{
    //     return await this.pessoaService.listaComForn(dados.NOME);
    // }
    

}