import { Module } from '@nestjs/common';
import { ProdutoModule } from './produto/produto.module';
import { MarcaModule } from './marca/marca.module';
import { PessoaModule } from './pessoa/pessoa.module';
import { UsuarioModule } from './usuario/usuario.module';


@Module({
  imports: [MarcaModule,UsuarioModule,ProdutoModule, PessoaModule],
  controllers: [],
  providers: [],
})
export class AppModule {
  
}
