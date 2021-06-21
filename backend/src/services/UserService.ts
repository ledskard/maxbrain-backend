import { UserRepository } from "../repositories/UserRepository";
import { User } from "../entities/User";
import { ICreateUserDTO } from "../dtos/UserDTO";
import { error } from "../utils/constants/ErrorConstants";
import {UserGoalRepository} from "../repositories/UserGoalRepository";

export default class UserService {
    private readonly userRepository: UserRepository;
    private readonly userGoalRepository: UserGoalRepository;

    constructor() {
        this.userRepository = new UserRepository();
        this.userGoalRepository = new UserGoalRepository();
    }

    public async createUser(data: ICreateUserDTO): Promise<User> {
        if (await this.userRepository.findByEmail(data.email)) {
            throw { status: error.bad_request, message: error.email_already_registered };
        }
        const user = await this.userRepository.create(data);
        delete user.password;
        delete user.tempPassword;
        return user;
    }

    public async findAll(): Promise<User[] | undefined> {
        const users = await this.userRepository.findAll();
        users.forEach(user => {
            delete user.password;
            delete user.tempPassword;
        })
        return users;
    }

    public async findById(id: string): Promise<User> {
        const user = await this.userRepository.findById(id);

        delete user.password;
        delete user.tempPassword;
        return user;
    }

    public async update(id: string, data: ICreateUserDTO): Promise<User> {
        const user = await this.userRepository.findById(id);
        if (!user) throw { status: error.bad_request, message: error.id_not_found };
        const userUpdated = Object.assign(user, data);
        await this.userRepository.save(userUpdated);
        delete userUpdated.tempPassword;
        delete userUpdated.password;
        return userUpdated;
    }

    public async delete(id: string): Promise<any> {
        const user = await this.userRepository.findById(id);
        if (!user) throw { status: error.bad_request, message: error.id_not_found };
        const userGoals = await this.userGoalRepository.findByUserId(id);
        for (const goal of userGoals) {
            await this.userGoalRepository.delete(goal);
        }
        await this.userRepository.delete(user);
        return { affected: 1 };
    }
}
