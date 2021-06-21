import { UserGoal } from "../entities/UserGoal";
import {UserGoalRepository} from "../repositories/UserGoalRepository";
import {ICreateUserGoalDTO} from "../dtos/UserGoalDTO";

export default class UserGoalService {
    private readonly userGoalRepository: UserGoalRepository;

    constructor() {
        this.userGoalRepository = new UserGoalRepository();
    }

    public async create(data: ICreateUserGoalDTO): Promise<UserGoal> {
        const userGoal = await this.userGoalRepository.create(data);
        return userGoal;
    }

    public async findCompletedGoalsByUserId(id: string): Promise<number> {
        const userGoals = await this.userGoalRepository.findCompletedGoalsByUserId(id);
        return userGoals;
    }

}
