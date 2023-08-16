import { PRODUTO } from 'src/produto/produto.entity';
import { Entity, Column, PrimaryColumn, OneToMany } from 'typeorm';

@Entity()
export class PESSOA {
    @PrimaryColumn()
    ID: string;

    @Column()
    NOME: string;

    @OneToMany(() => PRODUTO, produto => produto.pessoa)
    produtos: PRODUTO[];

}