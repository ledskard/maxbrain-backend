import { Repository, getRepository, DeleteResult } from "typeorm";
import { PersonalDevelopment } from "../entities/PersonalDevelopment";
import { ICreatePersonalDevelopmentDTO } from "../dtos/PersonalDevelopmentDTO";

export class PersonalDevelopmentRepository {
    private readonly personalDevelopmentRepository: Repository<PersonalDevelopment>;

    constructor() {
        this.personalDevelopmentRepository = getRepository(PersonalDevelopment);
    }

    public async create(data: ICreatePersonalDevelopmentDTO): Promise<PersonalDevelopment> {
        const personalDevelopment = await this.personalDevelopmentRepository.create(data);
        await this.personalDevelopmentRepository.save(personalDevelopment);
        return personalDevelopment;
    }

    public async findAll(): Promise<PersonalDevelopment[]> {
        const personalDevelopments = await this.personalDevelopmentRepository.find();
        return personalDevelopments;
    }

    public async findById(id: string): Promise<PersonalDevelopment | undefined> {
        const personalDevelopment = await this.personalDevelopmentRepository.findOne(id);
        return personalDevelopment;
    }

    public async save(data: PersonalDevelopment): Promise<PersonalDevelopment> {
        return await this.personalDevelopmentRepository.save(data);
    }

    public async delete(id: string): Promise<DeleteResult> {
        return await this.personalDevelopmentRepository.delete(id);
    }
}

