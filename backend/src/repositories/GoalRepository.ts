import { Repository, getRepository, DeleteResult } from "typeorm";
import { Goal } from "../entities/Goal";
import {ICreateGoalDTO} from "../dtos/GoalDTO";
import moment from "moment";

export class GoalRepository {
    private readonly goalRepository: Repository<Goal>;

    constructor() {
        this.goalRepository = getRepository(Goal);
    }

    public async create(data: ICreateGoalDTO): Promise<Goal> {
        const goal = await this.goalRepository.create(data);
        await this.goalRepository.save(goal);

        return goal;
    }

    public async findAll(): Promise<Goal[]> {
        const goals = await this.goalRepository
            .createQueryBuilder("g")
            .leftJoinAndSelect("g.pillar", "gp")

            .getMany();
        return goals;
    }

    public async findActiveGoals(): Promise<Goal[]> {
        const date = moment().format("YYYY-MM-DD") + " 00:00:00";

        const goals = await this.goalRepository
            .createQueryBuilder("g")
            .leftJoinAndSelect("g.pillar", "gp")
            .where(`g.endDate >= to_date('${date}', 'YYYY-MM-DD HH24:MI:SS')`)
            .getMany();
        return goals;
    }

    public async findById(id: string): Promise<Goal | undefined> {
        const goal = await this.goalRepository
            .createQueryBuilder("g")
            .leftJoinAndSelect("g.pillar", "gp")
            .where("g.id = :id", { id: id })
            .getOne();

        return goal;
    }

    public async save(data: Goal): Promise<Goal> {
        return await this.goalRepository.save(data);
    }

    public async delete(data: Goal): Promise<any> {
        return await this.goalRepository.remove(data);
    }
}
