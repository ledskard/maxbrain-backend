import {DeleteResult} from "typeorm/index";
import {error} from "../utils/constants/ErrorConstants";
import {CourseRepository} from "../repositories/CourseRepository";
import {Course} from "../entities/Course";
import {ICreateCourseDTO} from "../dtos/CourseDTO";
import {validateDate} from "../utils/validators/dateTimeValidator";

export default class CourseService {
    private readonly courseRepository: CourseRepository;

    constructor() {
        this.courseRepository = new CourseRepository();
    }

    public async create(data: ICreateCourseDTO): Promise<Course> {
        // validateDate(data.startDate, data.endDate);
        const course = await this.courseRepository.create(data);
        if (!course) throw { status: error.internal_server_error, message: error.cannot_create_goal };

        return course;
    }

    public async findAll(): Promise<Course[] | undefined> {
        const courses = await this.courseRepository.findAll();

        return courses;
    }

    public async findById(id: string): Promise<Course> {
        const course = await this.courseRepository.findById(id);

        return course;
    }

    public async update(id: string, data: ICreateCourseDTO): Promise<Course> {
        // validateDate(data.startDate, data.endDate);
        const course = await this.courseRepository.findById(id);
        if (!course) throw { status: error.bad_request, message: error.id_not_found };
        const courseUpdated = Object.assign(course, data);
        await this.courseRepository.save(courseUpdated);
        return courseUpdated;
    }

    public async delete(id: string): Promise<DeleteResult>{
        const deletedCourse = await this.courseRepository.delete(id);
        return deletedCourse;
    }
}
