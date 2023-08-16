import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { PESSOA } from "./pessoa.entity";
import { PessoaService } from "./pessoa.service";
import { CriaPessoaDTO } from "./dto/criaPessoa.dto";
import { RetornoCadastroDTO, RetornoObjDTO } from "src/dto/retorno.dto";
import { listaPessoaFornDTO } from "./dto/listaPessoaForn.dto";
import { PesquisaPessoaDTO } from "./dto/pesquisaPessoa.dto";


@Controller('/pessoa')
export class PessoaController{
    constructor(private readonly pessoaService: PessoaService){
             
    }

    @Get('listar')
    async listar(): Promise<PESSOA[]>{
        return this.pessoaService.listar();
    }

    @Post('')
    async criaPessoa(@Body() dados: CriaPessoaDTO): Promise<RetornoCadastroDTO>{        
        return this.pessoaService.inserir(dados)        
    }

    @Put('alterar-:id')
    async alterarPessoa(@Body() dados: CriaPessoaDTO,@Param('id') id: string): Promise<RetornoCadastroDTO>{        
        return this.pessoaService.alterar(id,dados)        
    }
    
    @Get('ID-:id')
    async listarID(@Param('id') id: string): Promise<PESSOA>{
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

    @Get('ComUsuario/')
    async listaMarcaForn(@Body() dados: PesquisaPessoaDTO): Promise<listaPessoaFornDTO[]>{
        return await this.pessoaService.listaComForn(dados.NOME);
    }
    

}