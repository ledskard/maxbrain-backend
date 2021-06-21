import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
} from "typeorm";
import {OneToMany} from "typeorm/index";
import {Team} from "./Team";


@Entity({ name: "curso" })
    export class Course {

    @PrimaryGeneratedColumn("increment", { name: "ID" })
    id: number;

    @Column({ name: "nome" })
    name: string;

    @Column({ name: "codigo" })
    code: string;

    @Column({ name: "descricao" })
    description: string;

    @Column({ name: "data_inicio" })
    startDate: Date;

    @Column({ name: "data_final" })
    endDate: Date;

    @OneToMany(() => Team, (team) => team.course)
    teams: Team[];

}
