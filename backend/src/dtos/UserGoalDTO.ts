import {User} from "../entities/User";
import {Goal} from "../entities/Goal";
import {Team} from "../entities/Team";

export interface ICreateUserGoalDTO {
    user: User;
    goal: Goal;
    team: Team;
    completed: boolean;
}
