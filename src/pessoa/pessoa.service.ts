import { Injectable, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import { RetornoCadastroDTO, RetornoObjDTO } from 'src/dto/retorno.dto';
import {v4 as uuid} from 'uuid';
import { Pessoa } from './pessoa.entity';
import { CriaPessoaDTO } from './dto/criaPessoa.dto';
import { listaMarcaFornDTO } from 'src/marca/dto/listaMarcaForn.dto';



@Injectable()
export class PessoaService {
  constructor(
    @Inject('PESSOA_REPOSITORY')
    private pessoaRepository: Repository<Pessoa>,
  ) {}

  async listar(): Promise<Pessoa[]> {
    return this.pessoaRepository.find();
  }

  async inserir(dados: CriaPessoaDTO): Promise<RetornoCadastroDTO>{
    let pessoa = new Pessoa();
        pessoa.id= uuid();
        pessoa.nome = dados.nome;
        pessoa.endereco = dados.endereco;
        pessoa.telefone = dados.telefone;

    return this.pessoaRepository.save(pessoa)
    .then((result) => {
      return <RetornoCadastroDTO>{
        id: pessoa.id,
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

  localizarID(id: string): Promise<Pessoa> {
    return this.pessoaRepository.findOne({
      where: {
        id,
      },
    });
  }

  listaNomes(): Promise<any[]> {
    return this.pessoaRepository.find({
      select:{
        nome:true,
      }
    });
  }

//   async listaComForn(NOME_MARCA?: string): Promise<listaMarcaFornDTO[]> {
    
//     if (NOME_MARCA != undefined){
//       var retorno = await (this.pessoaRepository // select marca.id as ID, marca.nome AS NOME_, pes_f.nome from marca ......
//       .createQueryBuilder('marca')
//       .select('marca.id','ID')
//       .addSelect('marca.nome','nome_marca')
//       .addSelect('pes_f.nome','nome_fornecedor')
//       .leftJoin('for_marca', 'fm','fm.idmarca = marca.id')  
//       .leftJoin('fornecedor', 'for','for.id = fm.idfornecedor')    
//       .leftJoin('pessoa', 'pes_f','for.idpessoa = pes_f.id')  
//       .where('marca.nome like :nomemarca',{ nomemarca: `%${NOME_MARCA}%` })         
//       .getRawMany());  
//     }
//     else{      
//       var retorno = await (this.pessoaRepository // select marca.id as ID, marca.nome AS NOME_, pes_f.nome from marca ......
//       .createQueryBuilder('marca')
//       .select('marca.id','ID')
//       .addSelect('marca.nome','nome_marca')
//       .addSelect('pes_f.nome','nome_fornecedor')
//       .leftJoin('for_marca', 'fm','fm.idmarca = marca.id')  
//       .leftJoin('fornecedor', 'for','for.id = fm.idfornecedor')    
//       .leftJoin('pessoa', 'pes_f','for.idpessoa = pes_f.id')  
//       .getRawMany());      
//     }

      

//     const listaRetorno = retorno.map(
//       marca => new listaMarcaFornDTO(
//         marca.ID,
//         marca.nome_marca,
//         marca.nome_fornecedor
//       )
//     );

//     return listaRetorno;    
//   }

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
        id: pessoa.id,
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