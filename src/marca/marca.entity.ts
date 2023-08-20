import { PRODUTO } from 'src/produto/produto.entity';
import { Entity, Column, PrimaryColumn, OneToMany } from 'typeorm';

@Entity()
export class MARCA {
    @PrimaryColumn()
    ID: string;

    @Column()
    NOME: string;

    @OneToMany(() => PRODUTO, produto => produto.marca)
    produtos: PRODUTO[];

}