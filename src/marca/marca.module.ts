import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { MarcaController } from './marca.controller';
import { marcaProviders } from './marca.providers';
import { MarcaService } from './marca.service';

@Module({
  imports: [DatabaseModule],
  controllers: [MarcaController],
  providers: [
    ...marcaProviders,
    MarcaService,
  ],
})
export class MarcaModule { }