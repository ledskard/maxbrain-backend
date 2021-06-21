import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
} from "typeorm";


@Entity({ name: "desenvolvimento_pessoal" })
export class PersonalDevelopment {

    @PrimaryGeneratedColumn("increment", { name: "ID" })
    id: number;

    @Column({ name: "mensagem" })
    message: string;

}
