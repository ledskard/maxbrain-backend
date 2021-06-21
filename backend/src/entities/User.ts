import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    BeforeInsert,
    BeforeUpdate,
    AfterLoad,
} from "typeorm";
import {IsEmail, IsOptional} from "class-validator";

import { hashSync } from "bcrypt";
import {JoinTable, ManyToMany, OneToMany} from "typeorm/index";
import {Team} from "./Team";
import {Goal} from "./Goal";
import {UserGoal} from "./UserGoal";

@Entity({ name: "usuario" })
export class User {

    @PrimaryGeneratedColumn("increment", { name: "ID" })
    id: number;

    @Column({ name: "nome" })
    name: string;

    @Column({ name: "sobrenome" })
    lastName: string;

    @Column({ unique: true, name: "email" })
    @IsEmail()
    email: string;

    @Column({ name: "matricula" })
    registration: string;

    @Column({ name: "senha" })
    password: string;

    @Column({ name: "admin", default: false })
    admin: boolean;

    @ManyToMany(() => Team, (team) => team.users)
    @JoinTable({
        name: "usuario_turma",
        joinColumn: {
            name: "usuario_id",
        },
        inverseJoinColumn: {
            name: "turma_id",
        },
    })
    @IsOptional()
    teams?: Team[];

    @AfterLoad()
    loadTempPassword() {
        this.tempPassword = this.password;
    }

    @BeforeInsert()
    @BeforeUpdate()
    hashPassword() {
        if (this.password !== this.tempPassword) this.password = hashSync(this.password, 8);
    }

    @OneToMany(() => UserGoal, (userGoal) => userGoal.user)
    public userGoal?: UserGoal;
    public token?: string;
    public tempPassword?: string;
}
