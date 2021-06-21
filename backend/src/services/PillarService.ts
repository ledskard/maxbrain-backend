import {DeleteResult} from "typeorm/index";
import {error} from "../utils/constants/ErrorConstants";
import {Pillar} from "../entities/Pillar";
import {ICreateTeamDTO} from "../dtos/TeamDTO";
import {PillarRepository} from "../repositories/PillarRepository";

export default class PillarService {
    private readonly pillarRepository: PillarRepository;

    constructor() {
        this.pillarRepository = new PillarRepository();
    }

    public async create(data: ICreateTeamDTO): Promise<Pillar> {
        // validateDate(data.startDate, data.endDate);
        const pillar = await this.pillarRepository.create(data);
        if (!pillar) throw { status: error.internal_server_error, message: error.cannot_create_goal };

        return pillar;
    }

    public async findAllWithGoal(): Promise<Pillar[] | undefined> {
        const pillars = await this.pillarRepository.findAllWithGoal();

        return pillars;
    }

    public async findAll(): Promise<Pillar[]> {
        const pillars = await this.pillarRepository.findAll();

        return pillars;
    }


    public async delete(id: string): Promise<DeleteResult>{
        const deletedTeam = await this.pillarRepository.delete(id);
        return deletedTeam;
    }
}
