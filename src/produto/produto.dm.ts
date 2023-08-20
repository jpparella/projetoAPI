import { Injectable } from "@nestjs/common";
import { PRODUTO } from "./produto.entity";

@Injectable()
export class ProdutosArmazenados {
    #produtos: PRODUTO[] = [];

    AdicionarProduto(produto: PRODUTO) {
        this.#produtos.push(produto);
    }

    get Produtos() {
        return this.#produtos;
    }



    private buscaPorID(id: string) {
        const possivelProduto = this.#produtos.find(
            prodSalvo => prodSalvo.ID === id
        );

        if (!possivelProduto) {
            throw new Error('Produto não encontrado');
        }

        return possivelProduto
    }

    async ProdutosByID(id: string) {
        const produto = this.buscaPorID(id);
        return produto;
    }

    async ProdutosByNome(nome: string) {
        const produto = this.#produtos.filter(
            prodSalvo => prodSalvo.NOME.includes(nome)
        );

        if (!produto) {
            throw new Error('Produto não encontrado');
        }

        return produto;
    }

    async ProdutosByMarca(marca: string) {
        //const produto = this.#produtos.filter(
        //prodSalvo => prodSalvo.MARCA.includes(marca)
        //);

        //if(!produto){
        //  throw new Error('Produto não encontrado');
        //}

        //return produto;
    }



    async atualizaProduto(id: string, dadosAtualizacao: Partial<PRODUTO>) {
        const produto = this.buscaPorID(id);

        Object.entries(dadosAtualizacao).forEach(
            ([chave, valor]) => {
                if (chave === 'id') {
                    return;
                }

                produto[chave] = valor;
            }
        )

        return produto;
    }

    async removeProduto(id: string) {
        const produto = this.buscaPorID(id);
        this.#produtos = this.#produtos.filter(
            prodSalvo => prodSalvo.ID !== id
        )
        return produto;
    }


}