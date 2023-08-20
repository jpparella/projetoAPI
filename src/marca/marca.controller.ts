import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { MARCA } from "./marca.entity";
import { MarcaService } from "./marca.service";
import { CriaMarcaDTO } from "./dto/criaMarca.dto";
import { RetornoCadastroDTO, RetornoObjDTO } from "src/dto/retorno.dto";
import { listaMarcaFornDTO } from "./dto/listaMarcaForn.dto";
import { PesquisaMarcaDTO } from "./dto/pesquisaMarca.dto";


@Controller('/marca')
export class MarcaController {
    constructor(private readonly marcaService: MarcaService) {

    }

    @Get('listar')
    async listar(): Promise<MARCA[]> {
        return this.marcaService.listar();
    }

    @Post('')
    async criaMarca(@Body() dados: CriaMarcaDTO): Promise<RetornoCadastroDTO> {
        return this.marcaService.inserir(dados)
    }

    @Put(':id')
    async alterarMarca(@Body() dados: CriaMarcaDTO, @Param('id') id: string): Promise<RetornoCadastroDTO> {
        return this.marcaService.alterar(id, dados)
    }

    @Get('ID-:id')
    async listarID(@Param('id') id: string): Promise<MARCA> {
        return this.marcaService.localizarID(id);
    }

    @Get('')
    async listaNome(@Param('id') id: string): Promise<any> {
        return this.marcaService.listaNomes();
    }

    @Delete('remove-:id')
    async removeMarca(@Param('id') id: string): Promise<RetornoObjDTO> {
        return this.marcaService.remover(id);
    }

    @Get('ComForn/')
    async listaMarcaForn(@Body() dados: PesquisaMarcaDTO): Promise<listaMarcaFornDTO[]> {
        return await this.marcaService.listaComForn(dados.NOME);
    }


}