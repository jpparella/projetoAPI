export class listaProdutoDTO {
    constructor(
        readonly ID: string,
        readonly NOME: string,
        readonly VALOR: number
    ) { }
}

export class listaProdutoMarcaDTO {
    constructor(
        readonly ID: string,
        readonly NOME: string,
        readonly VALOR: number,
        readonly MARCA: string
    ) { }
}