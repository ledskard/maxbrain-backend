import { Request, Response } from "express";
import UserGoalService from "../services/UserGoalService";

import { ProcessError } from "../utils/errors/processError";

export default class UserGoalController {
    public async create(req: Request, res: Response): Promise<Response | void> {
        try {
            const userGoalService = new UserGoalService();
            const userGoal = await userGoalService.create(req.body);

            return res.status(200).json(userGoal);
        } catch (err) {
            return ProcessError(res, err);
        }
    }

    public async findCompletedGoalsByUserId(req: Request, res: Response): Promise<Response> {
        try {
            const { id } = req.params;
            const userGoalService = new UserGoalService();
            const user = await userGoalService.findCompletedGoalsByUserId(id);
            return res.status(200).json(user);
        } catch (err) {
            return ProcessError(res, err);
        }
    }
}
