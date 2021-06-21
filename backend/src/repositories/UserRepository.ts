import { Repository, getRepository, DeleteResult } from "typeorm";
import { User } from "../entities/User";
import { ICreateUserDTO } from "../dtos/UserDTO";

export class UserRepository {
    private readonly userRepository: Repository<User>;

    constructor() {
        this.userRepository = getRepository(User);
    }

    public async create(data: ICreateUserDTO): Promise<User> {
        const user = await this.userRepository.create(data);
        await this.userRepository.save(user);

        return user;
    }

    public async findAll(): Promise<User[]> {
        const users = await this.userRepository
            .createQueryBuilder("u")
            .leftJoinAndSelect("u.teams", "ut")
            .leftJoinAndSelect("ut.goals", "ug")
            .getMany();
        return users;
    }

    public async findById(id: string): Promise<User | undefined> {
        const user = await this.userRepository
            .createQueryBuilder("u")
            .leftJoinAndSelect("u.teams", "ut")
            .leftJoinAndSelect("ut.goals", "ug")
            .where("u.id = :id", { id: id })
            .getOne();

        return user;
    }

    public async save(data: User): Promise<User> {
        return await this.userRepository.save(data);
    }

    public async findByEmail(email: string): Promise<User | undefined> {
        const user = await this.userRepository.findOne({ email })
        return user;
    }

    public async delete(data: User): Promise<User> {
        return await this.userRepository.remove(data);
    }
}
