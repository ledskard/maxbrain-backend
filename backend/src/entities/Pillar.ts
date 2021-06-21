import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
} from "typeorm";
import {OneToMany} from "typeorm/index";
import {Team} from "./Team";
import {Goal} from "./Goal";


@Entity({ name: "pilares" })
export class Pillar {

    @PrimaryGeneratedColumn("increment", { name: "ID" })
    id: number;

    @Column({ name: "name" })
    name: string;

    @OneToMany(() => Goal, (goal) => goal.pillar)
    goal?: Goal[];


}
