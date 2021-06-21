import { Request, Response } from "express";
import { ProcessError } from "../utils/errors/processError";
import GoalService from "../services/GoalService";
import PersonalDevelopmentService from "../services/PersonalDevelopmentService";

export default class PersonalDevelopmentController {
    public async create(req: Request, res: Response): Promise<Response | void> {
        try {
            const personalDevelopmentService = new PersonalDevelopmentService();
            const personalDevelopment = await personalDevelopmentService.create(req.body);

            return res.status(200).json(personalDevelopment);
        } catch (err) {
            return ProcessError(res, err);
        }
    }

    public async findById(req: Request, res: Response): Promise<Response> {
        try {
            const { id } = req.params;
            const personalDevelopmentService = new PersonalDevelopmentService();
            const personalDevelopment = await personalDevelopmentService.findById(id);

            return res.status(200).json(personalDevelopment);
        } catch (err) {
            return ProcessError(res, err);
        }
    }

    public async findAll(req: Request, res: Response): Promise<Response> {
        try {
            const personalDevelopmentService = new PersonalDevelopmentService();
            const personalDevelopment = await personalDevelopmentService.findAll();

            return res.status(200).json(personalDevelopment);
        } catch (err) {
            return ProcessError(res, err);
        }
    }

    public async update(req: Request, res: Response): Promise<Response> {
        try {
            const { id } = req.params;
            const personalDevelopmentService = new PersonalDevelopmentService();
            const personalDevelopment = await personalDevelopmentService.update(id, req.body);

            return res.status(200).json(personalDevelopment);
        } catch (err) {
            return ProcessError(res, err);
        }
    }

    public async delete(req: Request, res: Response): Promise<Response> {
        try {
            const { id } = req.params;
            const personalDevelopmentService = new PersonalDevelopmentService();
            const personalDevelopment = await personalDevelopmentService.delete(id);

            return res.status(200).json(personalDevelopment);
        } catch (err) {
            return ProcessError(res, err);
        }
    }

}
