import { Repository, getRepository, DeleteResult } from "typeorm";
import {Pillar} from "../entities/Pillar";
import {ICreateTeamDTO} from "../dtos/TeamDTO";

export class PillarRepository {
    private readonly pillarRepository: Repository<Pillar>;

    constructor() {
        this.pillarRepository = getRepository(Pillar);
    }

    public async create(data: ICreateTeamDTO): Promise<Pillar> {
        const pillar = await this.pillarRepository.create(data);
        await this.pillarRepository.save(pillar);

        return pillar;
    }

    public async findAllWithGoal(): Promise<Pillar[]> {
        const pillars = await this.pillarRepository
            .createQueryBuilder("p")
            .leftJoinAndSelect("p.goal", "pt")
            .getMany();

        return pillars;
    }

    public async findAll(): Promise<Pillar[] | undefined> {
        const pillars = await this.pillarRepository
            .createQueryBuilder("p")
            .getMany();

        return pillars;
    }

    public async save(data: any): Promise<Pillar[]> {
        return await this.pillarRepository.save(data);
    }

    public async delete(id: string): Promise<DeleteResult> {
        return await this.pillarRepository.delete(id);
    }
}
