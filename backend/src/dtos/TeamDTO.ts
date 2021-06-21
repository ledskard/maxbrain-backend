import { Goal } from "../entities/Goal";
import { User } from "../entities/User";
import { Course } from "../entities/Course";

export interface ICreateTeamDTO {
    id: number;
    name: string;
    description: string;
    startDate: Date;
    endDate: Date;
    goals: Goal[];
    users: User[];
    course: Course;
}
