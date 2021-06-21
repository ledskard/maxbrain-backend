import { Repository, getRepository, DeleteResult } from "typeorm";
import {Team} from "../entities/Team";
import {ICreateTeamDTO} from "../dtos/TeamDTO";
import moment from "moment";

export class TeamRepository {
    private readonly teamRepository: Repository<Team>;

    constructor() {
        this.teamRepository = getRepository(Team);
    }

    public async create(data: ICreateTeamDTO): Promise<Team> {
        const team = await this.teamRepository.create(data);
        await this.teamRepository.save(team);

        return team;
    }

    public async findAll(): Promise<Team[]> {
        const teams = await this.teamRepository
            .createQueryBuilder("t")
            .leftJoinAndSelect("t.goals", "g.goals")
            .leftJoinAndSelect("t.course", "tc")
            .getMany();

        return teams;
    }

    public async findById(id: string): Promise<Team | undefined> {
        const team = await this.teamRepository
            .createQueryBuilder("t")
            .leftJoinAndSelect("t.goals", "tg")
            .leftJoinAndSelect("t.course", "tc")
            .leftJoinAndSelect("t.users", "tu")
            .where("t.id = :id", { id: id })
            .getOne();

        return team;
    }

    public async findByUserIdAndPeriod(id: string, startDate: string, endDate: string): Promise<Team[]> {
        const date = moment().format("YYYY-MM-DD") + " 00:00:00";

        const team = await this.teamRepository
            .createQueryBuilder("t")
            .leftJoinAndSelect("t.goals", "tg")
            .leftJoinAndSelect("tg.pillar", "tgp")
            .leftJoinAndSelect("t.users", "tu")
            .leftJoinAndSelect("t.course", "tc")
            .where("tu.id = :id", { id: id })
            .andWhere(`tg.startDate BETWEEN to_date('${startDate}', 'YYYY-MM-DD HH24:MI:SS') AND
          to_date('${endDate}', 'YYYY-MM-DD HH24:MI:SS')`)
            .orWhere(`tg.startDate <= to_date('${startDate}', 'YYYY-MM-DD HH24:MI:SS')`)
            .andWhere(`tg.endDate >= to_date('${date}', 'YYYY-MM-DD HH24:MI:SS')`)
            .orderBy("tgp.id", "ASC")
            .addOrderBy("tg.startDate", "DESC")
            .getMany();
        return team;
    }

    public async save(data: Team): Promise<Team> {
        return await this.teamRepository.save(data);
    }

    public async delete(data: Team): Promise<Team> {
        const deleter = await this.teamRepository.remove(data);
        return deleter;
    }
}
