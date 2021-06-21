import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import {User} from "./User";
import {Goal} from "./Goal";
import {Team} from "./Team";

@Entity({ name: "usuario_meta" })
export class UserGoal {
    @PrimaryGeneratedColumn("increment", { name: "ID" })
    public id?: number;

    @ManyToOne(() => User, (user) => user.userGoal, { eager: true, cascade: true })
    @JoinColumn({ name: "usuario_id" })
    public user: User;

    @ManyToOne(() => Goal, (goal) => goal.id)
    @JoinColumn({ name: "meta_id" })
    public goal: Goal;

    @ManyToOne(() => Team, (team) => team.id)
    @JoinColumn({ name: "turma_id" })
    public team: Team;

    @Column({ name: "completada" })
    public completed: boolean;
}
