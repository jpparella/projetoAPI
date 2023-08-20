import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { AlteraProdutoDTO } from "./dto/atualizaProduto.dto";
import { CriaProdutoDTO } from "./dto/insereProduto.dto";
import { PRODUTO } from "./produto.entity";
import { ProdutoService } from "./produto.service";
import { RetornoCadastroDTO, RetornoObjDTO } from "src/dto/retorno.dto";
import { listaProdutoMarcaDTO } from "./dto/listaProduto.dto";

@Controller('/produtos')
export class ProdutoController {
    constructor(private readonly produtoService: ProdutoService) {

    }

    @Get('listar')
    async listar(): Promise<PRODUTO[]> {
        return this.produtoService.listar();
    }

    @Get('listarComMarcas')
    async listarMarcas(): Promise<listaProdutoMarcaDTO[]> {
        return this.produtoService.listarMarca();
    }

    @Post('')
    async criaProduto(@Body() dados: CriaProdutoDTO): Promise<RetornoCadastroDTO> {
        return this.produtoService.inserir(dados)
    }

    @Put(':id')
    async alterarProduto(@Body() dados: AlteraProdutoDTO, @Param('id') id: string): Promise<RetornoCadastroDTO> {
        return this.produtoService.alterar(id, dados)
    }

    @Get('ID-:id')
    async listarID(@Param('id') id: string): Promise<PRODUTO> {
        return this.produtoService.localizarID(id);
    }

    @Get('')
    async listaNome(@Param('id') id: string): Promise<any> {
        return this.produtoService.listaNomes();
    }

    @Delete(':id')
    async removeProduto(@Param('id') id: string): Promise<RetornoObjDTO> {
        return this.produtoService.remover(id);
    }


}