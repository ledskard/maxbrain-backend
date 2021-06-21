import {GoalRepository} from "../repositories/GoalRepository";
import {Goal} from "../entities/Goal";
import {ICreateGoalDTO} from "../dtos/GoalDTO";
import {DeleteResult} from "typeorm/index";
import {error} from "../utils/constants/ErrorConstants";
import {UserGoalRepository} from "../repositories/UserGoalRepository";
// import {validateDate} from "../utils/validators/dateTimeValidator";

export default class GoalService {
    private readonly goalRepository: GoalRepository;
    private readonly userGoalRepository: UserGoalRepository;

    constructor() {
        this.goalRepository = new GoalRepository();
        this.userGoalRepository = new UserGoalRepository();
    }

    public async create(data: ICreateGoalDTO): Promise<Goal> {
        // validateDate(data.startDate, data.endDate);

        const goal = await this.goalRepository.create(data);
        if (!goal) throw { status: error.internal_server_error, message: error.cannot_create_goal };

        return goal;
    }

    public async findAll(): Promise<Goal[] | undefined> {
        const goals = await this.goalRepository.findAll();

        return goals;
    }

    public async findActiveGoals(): Promise<Goal[] | undefined> {
        const goals = await this.goalRepository.findActiveGoals();

        return goals;
    }

    public async findById(id: string): Promise<Goal> {
        const goal = await this.goalRepository.findById(id);

        return goal;
    }

    public async update(id: string, data: ICreateGoalDTO): Promise<Goal> {
        // validateDate(data.startDate, data.endDate);
        const goal = await this.goalRepository.findById(id);
        if (!goal) throw { status: error.bad_request, message: error.id_not_found };
        const goalUpdated = Object.assign(goal, data);
        await this.goalRepository.save(goalUpdated);
        return goalUpdated;
    }
    public async delete(id: string): Promise<any>{
        const goalToDelete = await this.goalRepository.findById(id);
        const goalUserRelation = await this.userGoalRepository.findByGoalId(id);
        for(const goal of goalUserRelation) {
            await this.userGoalRepository.delete(goal);
        }
        const deletedGoal = await this.goalRepository.delete(goalToDelete);
        if(!deletedGoal) throw { status: error.bad_request, message: error.id_not_found }
        return { affected: 1};
    }
}
