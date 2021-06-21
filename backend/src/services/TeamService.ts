import {DeleteResult} from "typeorm/index";
import {error} from "../utils/constants/ErrorConstants";
import {TeamRepository} from "../repositories/TeamRepository";
import {Team} from "../entities/Team";
import {ICreateTeamDTO} from "../dtos/TeamDTO";
import {UserGoalRepository} from "../repositories/UserGoalRepository";

export default class TeamService {
    private readonly teamRepository: TeamRepository;
    private readonly userGoalRepository: UserGoalRepository;

    constructor() {
        this.teamRepository = new TeamRepository();
        this.userGoalRepository = new UserGoalRepository();
    }

    public async create(data: ICreateTeamDTO): Promise<Team> {
        // validateDate(data.startDate, data.endDate);
        const team = await this.teamRepository.create(data);
        if (!team) throw { status: error.internal_server_error, message: error.cannot_create_goal };

        return team;
    }

    public async findAll(): Promise<Team[] | undefined> {
        const teams = await this.teamRepository.findAll();

        return teams;
    }

    public async findById(id: string): Promise<Team> {
        const team = await this.teamRepository.findById(id);
        if(team.users){
            team.users.forEach((user) => {
                delete user.password;
                delete user.tempPassword;
            })
        }
        return team;
    }

    public async findByUserIdAndPeriod(id: string, startDate: string, endDate: string): Promise<Team[]> {
        let teams = await this.teamRepository.findByUserIdAndPeriod(id, startDate, endDate);
        const userGoals = await this.userGoalRepository.findByUserId(id);
        userGoals.forEach((userGoal) => {
            console.log("PASSANDO PELO FOR _________________--------------->", userGoal);
            teams.forEach((team) => {
                const goalFiltered = team.goals.filter((goal) => {
                    return goal.id != userGoal.goal.id
                })
                team.goals = goalFiltered;
                delete team.users;
            })
            teams = teams.filter((team) => {
                return team.id == userGoal.team.id;
            })
        })

        return teams;
    }

    public async update(id: string, data: ICreateTeamDTO): Promise<Team> {
        // validateDate(data.startDate, data.endDate);
        const team = await this.teamRepository.findById(id);
        if (!team) throw { status: error.bad_request, message: error.id_not_found };
        const assign = Object.assign(team, data);
        await this.teamRepository.save(assign);
        const teamUpdated = await this.teamRepository.findById(id);
        return teamUpdated;
    }

    public async delete(id: string): Promise<any>{
        const team = await this.teamRepository.findById(id);
        if (!team) throw { status: error.bad_request, message: error.id_not_found };
        await this.teamRepository.delete(team);
        return { affected: 1 };
    }
}
