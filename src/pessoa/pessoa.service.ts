import { Injectable, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import { PESSOA } from './pessoa.entity';
import { RetornoCadastroDTO, RetornoObjDTO } from 'src/dto/retorno.dto';
import {v4 as uuid} from 'uuid';
import { CriaPessoaDTO } from './dto/criaPessoa.dto';
import { listaPessoaDTO } from './dto/listaPessoa.dto';
import { listaPessoaFornDTO } from './dto/listaPessoaForn.dto';

@Injectable()
export class PessoaService {
  constructor(
    @Inject('PESSOA_REPOSITORY')
    private pessoaRepository: Repository<PESSOA>,
  ) {}

  async listar(): Promise<PESSOA[]> {
    return this.pessoaRepository.find();
  }

  async inserir(dados: CriaPessoaDTO): Promise<RetornoCadastroDTO>{
    let marca = new PESSOA();
        marca.ID = uuid();
        marca.NOME = dados.NOME;

    return this.pessoaRepository.save(marca)
    .then((result) => {
      return <RetornoCadastroDTO>{
        id: marca.ID,
        message: "Pessoa cadastrada!"
      };
    })
    .catch((error) => {
      return <RetornoCadastroDTO>{
        id: "",
        message: "Houve um erro ao cadastrar." + error.message
      };
    })

    
  }

  localizarID(ID: string): Promise<PESSOA> {
    return this.pessoaRepository.findOne({
      where: {
        ID,
      },
    });
  }

  listaNomes(): Promise<any[]> {
    return this.pessoaRepository.find({
      select:{
        NOME:true,
      }
    });
  }

  async listaComForn(NOME_PESSOA?: string): Promise<listaPessoaFornDTO[]> {
    
    if (NOME_PESSOA != undefined){
      var retorno = await (this.pessoaRepository // select marca.id as ID, marca.nome AS NOME_, pes_f.nome from marca ......
      .createQueryBuilder('pessoa')
      .select('pessoa.id','ID')
      .addSelect('pessoa.nome','nome_pessoa')
      .addSelect('pes_f.nome','nome_fornecedor')
      .leftJoin('for_pessoa', 'fp','fp.idpessoa = pessoa.id')  
      .leftJoin('pessoa', 'pes','pes.id = fp.idfornecedor')    
      .leftJoin('pessoa', 'pes_f','for.idpessoa = pes_f.id')  
      .where('pessoa.nome like :nomepessoa',{ nomepessoa: `%${NOME_PESSOA}%` })         
      .getRawMany());  
    }
    else{      
      var retorno = await (this.pessoaRepository // select marca.id as ID, marca.nome AS NOME_, pes_f.nome from marca ......
      .createQueryBuilder('pessoa')
      .select('pessoa.id','ID')
      .addSelect('pessoa.nome','nome_pessoa')
      .addSelect('pes_f.nome','nome_pessoa')
      .leftJoin('for_pessoa', 'fp','fp.idpessoa = pessoa.id')  
      .leftJoin('fornecedor', 'for','for.id = fp.idfornecedor')    
      .leftJoin('pessoa', 'pes_f','for.idpessoa = pes_f.id')  
      .getRawMany());      
    }

      

    const listaRetorno = retorno.map(
      pessoa => new listaPessoaFornDTO(
        pessoa.ID,
        pessoa.nome_marca,
      )
    );

    return listaRetorno;    
  }

  async remover(id: string): Promise<RetornoObjDTO> {
    const pessoa = await this.localizarID(id);
    
    return this.pessoaRepository.remove(pessoa)
    .then((result) => {
      return <RetornoObjDTO>{
        return: pessoa,
        message: "Pessoa excluida!"
      };
    })
    .catch((error) => {
      return <RetornoObjDTO>{
        return: pessoa,
        message: "Houve um erro ao excluir." + error.message
      };
    });  
  }

  async alterar(id: string, dados: CriaPessoaDTO): Promise<RetornoCadastroDTO> {
    const pessoa = await this.localizarID(id);

    Object.entries(dados).forEach(
      ([chave, valor]) => {
          if(chave=== 'id'){
              return;
          }

          pessoa[chave] = valor;
      }
    )

    return this.pessoaRepository.save(pessoa)
    .then((result) => {
      return <RetornoCadastroDTO>{
        id: pessoa.ID,
        message: "Pessoa alterada!"
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