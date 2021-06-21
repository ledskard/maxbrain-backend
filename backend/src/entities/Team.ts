import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
} from "typeorm";
import {JoinColumn, JoinTable, ManyToMany, ManyToOne} from "typeorm/index";
import {Course} from "./Course";
import {User} from "./User";
import {Goal} from "./Goal";
import {IsOptional} from "class-validator";


@Entity({ name: "turma" })
export class Team {

    @PrimaryGeneratedColumn("increment", { name: "ID" })
    id: number;

    @Column({ name: "descricao" })
    description: string;

    @Column({ nullable: true ,name: "nome" })
    name?: string;

    @Column({ name: "data_inicio" })
    startDate: Date;

    @Column({ name: "data_final" })
    endDate: Date;

    @ManyToMany(() => Goal, (goal) => goal.id)
    @JoinTable({
        name: "meta_turma",
        joinColumn: {
            name: "turma_id",
        },
        inverseJoinColumn: {
            name: "meta_id",
        },
    })
    @IsOptional()
    goals?: Goal[];

    @ManyToOne(() => Course, (course) => course.teams)
    @JoinColumn({ name: "curso_id" })
    @IsOptional()
    course?: Course;

    @ManyToMany(() => User, (user) => user.teams)
    users?: User[];

}
