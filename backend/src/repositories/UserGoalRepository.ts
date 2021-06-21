import { Repository, getRepository, DeleteResult } from "typeorm";
import {UserGoal} from "../entities/UserGoal";
import {ICreateUserGoalDTO} from "../dtos/UserGoalDTO";

export class UserGoalRepository {
    private readonly userGoalRepository: Repository<UserGoal>;

    constructor() {
        this.userGoalRepository = getRepository(UserGoal);
    }

    public async create(data: ICreateUserGoalDTO): Promise<UserGoal> {
        const userGoal = await this.userGoalRepository.create(data);
        await this.userGoalRepository.save(userGoal);

        return userGoal;
    }

    public async findCompletedGoalsByUserId(id: string): Promise<number> {
        const userGoals = await this.userGoalRepository
            .createQueryBuilder("u")
            .leftJoinAndSelect("u.user", "uu")
            .where("uu.id = :id", { id: id })
            .getCount();

        return userGoals;
    }

    public async findByGoalId(id: string): Promise<UserGoal[] | undefined> {
        const userGoals = await this.userGoalRepository
            .createQueryBuilder("u")
            .leftJoinAndSelect("u.user", "uu")
            .leftJoinAndSelect("u.goal", "ug")
            .where("ug.id = :id", { id: id })
            .getMany();

        return userGoals;
    }


    public async findByUserId(id: string): Promise<UserGoal[]> {
        const userGoals = await this.userGoalRepository
            .createQueryBuilder("u")
            .leftJoinAndSelect("u.user", "uu")
            .leftJoinAndSelect("u.goal", "ug")
            .leftJoinAndSelect("u.team", "ut")
            .where("uu.id = :id", { id: id })
            .getMany();

        return userGoals;
    }

    public async save(data: any): Promise<UserGoal[]> {
        return await this.userGoalRepository.save(data);
    }

    public async delete(data: UserGoal): Promise<UserGoal> {
        return await this.userGoalRepository.remove(data);
    }
}
