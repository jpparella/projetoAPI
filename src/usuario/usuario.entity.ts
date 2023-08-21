import { PrimaryColumn,Column, ManyToOne, Entity, JoinColumn } from "typeorm";
import { Pessoa } from "src/pessoa/pessoa.entity";

@Entity()
export class Usuario{
    @PrimaryColumn()
    id: string;

    @ManyToOne(() => Pessoa, { cascade: true })
    @JoinColumn({ name: "idpessoa", referencedColumnName: "id" })
    idpessoa: Pessoa;

    @Column()
    email: string;

    @Column()
    login: string;

    @Column()
    senha: string; 

}