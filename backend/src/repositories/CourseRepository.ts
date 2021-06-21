import { Repository, getRepository, DeleteResult } from "typeorm";
import { Course } from "../entities/Course";
import {ICreateCourseDTO} from "../dtos/CourseDTO";


export class CourseRepository {
    private readonly courseRepository: Repository<Course>;

    constructor() {
        this.courseRepository = getRepository(Course);
    }

    public async create(data: ICreateCourseDTO): Promise<Course> {
        const course = await this.courseRepository.create(data);
        await this.courseRepository.save(course);

        return course;
    }

    public async findAll(): Promise<Course[]> {
        const courses = await this.courseRepository
            .createQueryBuilder("c")
            .leftJoinAndSelect("c.teams", "ct")
            .getMany();

        return courses;
    }

    public async findById(id: string): Promise<Course | undefined> {
        const course = await this.courseRepository
            .createQueryBuilder("c")
            .leftJoinAndSelect("c.teams", "ct")
            .where("c.id = :id", { id: id })
            .getOne();
        return course;
    }

    public async save(data: Course): Promise<Course> {
        return await this.courseRepository.save(data);
    }

    public async delete(id: string): Promise<DeleteResult> {
        return await this.courseRepository.delete(id);
    }
}
