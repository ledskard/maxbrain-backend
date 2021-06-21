import { Request, Response } from "express";
import { ProcessError } from "../utils/errors/processError";
import GoalService from "../services/GoalService";

export default class GoalController {
    public async create(req: Request, res: Response): Promise<Response | void> {
        try {
            const goalService = new GoalService();
            const goal = await goalService.create(req.body);

            return res.status(200).json(goal);
        } catch (err) {
            return ProcessError(res, err);
        }
    }

    public async findById(req: Request, res: Response): Promise<Response> {
        try {
            const { id } = req.params;

            const goalService = new GoalService();
            const goal = await goalService.findById(id);
            return res.status(200).json(goal);
        } catch (err) {
            return ProcessError(res, err);
        }
    }

    public async findAll(req: Request, res: Response): Promise<Response> {
        try {
            const goalService = new GoalService();
            const goal = await goalService.findAll();
            return res.status(200).json(goal);
        } catch (err) {
            return ProcessError(res, err);
        }
    }

    public async findActiveGoals(req: Request, res: Response): Promise<Response> {
        try {
            const goalService = new GoalService();
            const goal = await goalService.findActiveGoals();
            return res.status(200).json(goal);
        } catch (err) {
            return ProcessError(res, err);
        }
    }

    public async update(req: Request, res: Response): Promise<Response> {
        try {
            const { id } = req.params;
            const goalService = new GoalService();
            const goal = await goalService.update(id, req.body);
            return res.status(200).json(goal);
        } catch (err) {
            return ProcessError(res, err);
        }
    }

    public async delete(req: Request, res: Response): Promise<Response> {
        try {
            const { id } = req.params;
            const goalService = new GoalService();
            const goal = await goalService.delete(id);
            return res.status(200).json(goal);
        } catch (err) {
            return ProcessError(res, err);
        }
    }

}
