import { Module } from "@nestjs/common";
import { ProdutoController } from "./produto.controller";
import { DatabaseModule } from "src/database/database.module";
import { ProdutoService } from "./produto.service";
import { produtoProviders } from "./produto.providers";
import { MarcaService } from "src/marca/marca.service";
import { marcaProviders } from "src/marca/marca.providers";


@Module({
  imports: [DatabaseModule],
  controllers: [ProdutoController],
  providers: [
    ...produtoProviders,
    ProdutoService,
    ...marcaProviders,
    MarcaService,
  ],
})
export class ProdutoModule { }