import { MARCA } from "src/marca/marca.entity";
import { PrimaryColumn,Column, ManyToOne, Entity, JoinColumn } from "typeorm";

@Entity()
export class PRODUTO{
    @PrimaryColumn()
    ID: string;

    @Column()
    NOME: string;

    @Column()
    PRECO: number;

    @ManyToOne(() => MARCA, marca => marca.produtos)
    @JoinColumn({ name: 'IDMARCA', referencedColumnName:'ID'})
    marca: MARCA;

}