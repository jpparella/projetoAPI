import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity()
export class Pessoa{
    @PrimaryColumn()
    id: string;

    @Column()
    nome: string;

    @Column()
    endereco: string;

    @Column()
    telefone: string;
}