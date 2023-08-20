import { Injectable, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import { PRODUTO } from './produto.entity';
import { RetornoCadastroDTO, RetornoObjDTO } from 'src/dto/retorno.dto';
import { v4 as uuid } from 'uuid';
import { CriaProdutoDTO } from './dto/insereProduto.dto';
import { listaProdutoDTO, listaProdutoMarcaDTO } from './dto/listaProduto.dto';
import { AlteraProdutoDTO } from './dto/atualizaProduto.dto';
import { MarcaService } from 'src/marca/marca.service';
import { MARCA } from 'src/marca/marca.entity';

@Injectable()
export class ProdutoService {
  constructor(
    @Inject('PRODUTO_REPOSITORY')
    private produtoRepository: Repository<PRODUTO>,
    @Inject('MARCA_REPOSITORY')
    private marcaRepository: Repository<MARCA>,
    private readonly marcaService: MarcaService
  ) { }



  async listar(): Promise<PRODUTO[]> {
    return this.produtoRepository.find();
  }

  async listarMarca(): Promise<listaProdutoMarcaDTO[]> {
    var resultado = await (this.produtoRepository // select marca.id as ID, marca.nome AS NOME_, pes_f.nome from marca ......
      .createQueryBuilder('produto')
      .select('produto.ID', 'ID')
      .addSelect('produto.NOME', 'NOME_PRODUTO')
      .addSelect('produto.PRECO', 'PRECO_PRODUTO')
      .addSelect('MA.NOME', 'MARCA')
      .leftJoin('marca', 'MA', 'produto.idmarca = MA.id')
      .getRawMany());

    const listaRetorno = resultado.map(
      produto => new listaProdutoMarcaDTO(
        produto.ID,
        produto.NOME_PRODUTO,
        produto.PRECO_PRODUTO,
        produto.MARCA
      )
    );

    return listaRetorno;
  }


  async inserir(dados: CriaProdutoDTO): Promise<RetornoCadastroDTO> {

    let produto = new PRODUTO();
    produto.ID = uuid();
    produto.NOME = dados.NOME;
    produto.marca = await this.marcaService.localizarID(dados.IDMARCA);
    produto.PRECO = dados.VALOR;

    return this.produtoRepository.save(produto)
      .then((result) => {
        return <RetornoCadastroDTO>{
          id: produto.ID,
          message: "Produto cadastrado!"
        };
      })
      .catch((error) => {
        return <RetornoCadastroDTO>{
          id: "",
          message: "Houve um erro ao cadastrar." + error.message
        };
      })


  }

  localizarID(ID: string): Promise<PRODUTO> {
    return this.produtoRepository.findOne({
      where: {
        ID,
      },
    });
  }

  listaNomes(): Promise<any[]> {
    return this.produtoRepository.find({
      select: {
        NOME: true,
      }
    });
  }



  async remover(id: string): Promise<RetornoObjDTO> {
    const produto = await this.localizarID(id);

    return this.produtoRepository.remove(produto)
      .then((result) => {
        return <RetornoObjDTO>{
          return: produto,
          message: "Produto excluida!"
        };
      })
      .catch((error) => {
        return <RetornoObjDTO>{
          return: produto,
          message: "Houve um erro ao excluir." + error.message
        };
      });
  }

  async alterar(id: string, dados: AlteraProdutoDTO): Promise<RetornoCadastroDTO> {
    const produto = await this.localizarID(id);

    Object.entries(dados).forEach(
      async ([chave, valor]) => {
        if (chave === 'ID') {
          return;
        }

        if (chave === 'IDMARCA') {
          produto['MARCA'] = await this.marcaService.localizarID(valor);
          return;
        }

        produto[chave] = valor;
      }
    )

    return this.produtoRepository.save(produto)
      .then((result) => {
        return <RetornoCadastroDTO>{
          id: produto.ID,
          message: "Produto alterada!"
        };
      })
      .catch((error) => {
        return <RetornoCadastroDTO>{
          id: "",
          message: "Houve um erro ao alterar." + error.message
        };
      });
  }
}