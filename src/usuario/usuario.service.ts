import { Injectable, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import { RetornoCadastroDTO, RetornoObjDTO } from 'src/dto/retorno.dto';
import {v4 as uuid} from 'uuid';
import { Usuario } from './usuario.entity';
import { CriaUsuarioDTO } from './dto/usuario.dto';
import { PessoaService } from 'src/pessoa/pessoa.service';



@Injectable()
export class UsuarioService {
  constructor(
    @Inject('USUARIO_REPOSITORY')
    private usuarioRepository: Repository<Usuario>,
    private readonly pessoaService: PessoaService,

  ) {}

  async listar(): Promise<Usuario[]> {
    return this.usuarioRepository.find();
  }

  localizarID(id: string): Promise<Usuario> {
    return this.usuarioRepository.findOne({
      where: {
        id,
      },
    });
  }

  listaLogins(): Promise<any[]> {
    return this.usuarioRepository.find({
      select:{
        login:true,
      }
    });
  }

  async validaEmail(email: string): Promise<any>{

    let possivelUsuario  =  this.usuarioRepository.findOne({
        where: {
          email,
        },
    });

    let recebe = possivelUsuario;
    
    return possivelUsuario;
  }

  async remover(id: string): Promise<RetornoObjDTO> {
    const usuario = await this.localizarID(id);
    
    return this.usuarioRepository.remove(usuario)
    .then((result) => {
      return <RetornoObjDTO>{
        return: usuario,
        message: "Usuario excluida!"
      };
    })
    .catch((error) => {
      return <RetornoObjDTO>{
        return: usuario,
        message: "Houve um erro ao excluir." + error.message
      };
    });  
  }

  async alterar(id: string, dados: CriaUsuarioDTO): Promise<RetornoCadastroDTO> {
    const usuario = await this.localizarID(id);

    if (!(await this.pessoaService.localizarID(dados.idpessoa))) {
      return <RetornoCadastroDTO>{
        message: "idPessoa não é válido. Alteração não foi realizada."
      };
    }

     if ((await this.validaEmail(dados.email))) {
       return <RetornoCadastroDTO>{
         message: "Email já pertence a um usuário do sistema."
       };
     }

    Object.entries(dados).forEach(
      ([chave, valor]) => {
          if(chave=== 'id'){
              return;
          }

          usuario[chave] = valor;
      }
    )

    return this.usuarioRepository.save(usuario)
    .then((result) => {
      return <RetornoCadastroDTO>{
        id: usuario.id,
        message: "Usuario alterada!"
      };
    })
    .catch((error) => {
      return <RetornoCadastroDTO>{
        id: "",
        message: "Houve um erro ao alterar." + error.message
      };
    });
  }

  async inserir(dados: CriaUsuarioDTO): Promise<RetornoCadastroDTO>{

    if (!(await this.pessoaService.localizarID(dados.idpessoa))) {
      return <RetornoCadastroDTO>{
        message: "idPessoa não é válido. Cadastro não foi realizado."
      };
    }

    if ((await this.validaEmail(dados.email))) {
      return <RetornoCadastroDTO>{
        message: "Email já vinculado a um usuário do sistema."
      };
    }

    let usuario = new Usuario();
        usuario.id= uuid();
        usuario.idpessoa = await this.pessoaService.localizarID(dados.idpessoa)
        usuario.email = dados.email;
        usuario.login = dados.login;
        usuario.senha = dados.senha;

    return this.usuarioRepository.save(usuario)
    .then((result) => {
      return <RetornoCadastroDTO>{
        id: usuario.id,
        message: "Usuario cadastrada!"
      };
    })
    .catch((error) => {
      return <RetornoCadastroDTO>{
        id: "",
        message: "Houve um erro ao cadastrar." + error.message
      };
    })

    
  }

}


