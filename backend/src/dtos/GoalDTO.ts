import {Pillar} from "../entities/Pillar";

export interface ICreateGoalDTO {
    name: string;
    cornerstone: string;
    description: string;
    startDate: Date;
    endDate: Date;
    pillar?: Pillar;
}
