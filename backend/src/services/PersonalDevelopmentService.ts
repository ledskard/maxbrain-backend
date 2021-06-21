import {PersonalDevelopmentRepository} from "../repositories/PersonalDevelopmentRepository";
import {ICreatePersonalDevelopmentDTO} from "../dtos/PersonalDevelopmentDTO";
import {PersonalDevelopment} from "../entities/PersonalDevelopment";
import {DeleteResult} from "typeorm/index";
import {error} from "../utils/constants/ErrorConstants";

export default class PersonalDevelopmentService {
    private readonly personalDevelopmentRepository: PersonalDevelopmentRepository;

    constructor() {
        this.personalDevelopmentRepository = new PersonalDevelopmentRepository();
    }

    public async create(data: ICreatePersonalDevelopmentDTO): Promise<PersonalDevelopment> {
        const personalDevelopment = await this.personalDevelopmentRepository.create(data);
        return personalDevelopment;
    }

    public async findAll(): Promise<PersonalDevelopment[] | undefined> {
        const personalDevelopment = await this.personalDevelopmentRepository.findAll();

        return personalDevelopment;
    }

    public async findById(id: string): Promise<PersonalDevelopment> {
        const personalDevelopment = await this.personalDevelopmentRepository.findById(id);

        return personalDevelopment;
    }

    public async update(id: string, data: ICreatePersonalDevelopmentDTO): Promise<PersonalDevelopment> {
        const personalDevelopment = await this.personalDevelopmentRepository.findById(id);
        if (!personalDevelopment) throw { status: error.bad_request, message: error.id_not_found };
        const personalDevelopmentUpdated = Object.assign(personalDevelopment, data);
        await this.personalDevelopmentRepository.save(personalDevelopmentUpdated);
        return personalDevelopmentUpdated;
    }

    public async delete(id: string): Promise<DeleteResult> {
        const personalDevelopment = await this.personalDevelopmentRepository.delete(id);
        return personalDevelopment;
    }
}
