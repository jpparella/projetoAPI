import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { PessoaController } from './pessoa.controller';
import { PessoaProviders } from './pessoa.providers';
import { PessoaService } from './pessoa.service';

@Module({
  imports: [DatabaseModule],
  controllers: [PessoaController],
  providers: [
    ...PessoaProviders,
    PessoaService,
  ],
})
export class MarcaModule {}