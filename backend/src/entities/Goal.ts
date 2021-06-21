import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
} from "typeorm";
import {JoinColumn, ManyToOne, OneToMany} from "typeorm/index";
import {Team} from "./Team";
import {Pillar} from "./Pillar";
import {IsOptional} from "class-validator";


@Entity({ name: "meta" })
export class Goal {

    @PrimaryGeneratedColumn("increment", { name: "ID" })
    id: number;

    @Column({ name: "nome" })
    name: string;

    @Column({ name: "descricao" })
    description: string;

    @Column({ name: "data_inicio" })
    startDate: Date;

    @Column({ name: "data_final" })
    endDate: Date;

    @OneToMany(() => Team, (team) => team.id)
    team: Team;

    @ManyToOne(() => Pillar, (pillar) => pillar.goal)
    @JoinColumn({ name: "pilar_id" })
    @IsOptional()
    pillar?: Pillar;

}
