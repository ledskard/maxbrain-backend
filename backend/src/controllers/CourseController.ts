import { Request, Response } from "express";
import { ProcessError } from "../utils/errors/processError";
import CourseService from "../services/CourseService";

export default class CourseController {
    public async create(req: Request, res: Response): Promise<Response | void> {
        try {
            const courseService = new CourseService();
            const course = await courseService.create(req.body);

            return res.status(200).json(course);
        } catch (err) {
            return ProcessError(res, err);
        }
    }

    public async findById(req: Request, res: Response): Promise<Response> {
        try {
            const { id } = req.params;
            const courseService = new CourseService();
            const course = await courseService.findById(id);

            return res.status(200).json(course);
        } catch (err) {
            return ProcessError(res, err);
        }
    }

    public async findAll(req: Request, res: Response): Promise<Response> {
        try {
            const courseService = new CourseService();
            const course = await courseService.findAll();

            return res.status(200).json(course);
        } catch (err) {
            return ProcessError(res, err);
        }
    }

    public async update(req: Request, res: Response): Promise<Response> {
        try {
            const { id } = req.params;
            const courseService = new CourseService();
            const course = await courseService.update(id, req.body);

            return res.status(200).json(course);
        } catch (err) {
            return ProcessError(res, err);
        }
    }

    public async delete(req: Request, res: Response): Promise<Response> {
        try {
            const { id } = req.params;
            const courseService = new CourseService();
            const course = await courseService.delete(id);

            return res.status(200).json(course);
        } catch (err) {
            return ProcessError(res, err);
        }
    }

}
