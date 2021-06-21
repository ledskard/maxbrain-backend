import { Request, Response } from "express";
import { ProcessError } from "../utils/errors/processError";
import GoalService from "../services/GoalService";
import TeamService from "../services/TeamService";
import {start} from "repl";

export default class TeamController {
    public async create(req: Request, res: Response): Promise<Response | void> {
        try {
            const teamService = new TeamService();
            const team = await teamService.create(req.body);

            return res.status(200).json(team);
        } catch (err) {
            return ProcessError(res, err);
        }
    }

    public async findById(req: Request, res: Response): Promise<Response> {
        try {
            const { id } = req.params;
            const teamService = new TeamService();
            const team = await teamService.findById(id);

            return res.status(200).json(team);
        } catch (err) {
            return ProcessError(res, err);
        }
    }

    public async findByUserIdAndPeriod(req: Request, res: Response): Promise<Response> {
        try {
            const { id } = req.params;
            const { startDate, endDate } = req.query;
            const teamService = new TeamService();
            const teams = await teamService.findByUserIdAndPeriod(id, startDate.toString(), endDate.toString());

            return res.status(200).json(teams);
        } catch (err) {
            return ProcessError(res, err);
        }
    }

    public async findAll(req: Request, res: Response): Promise<Response> {
        try {
            const teamService = new TeamService();
            const team = await teamService.findAll();

            return res.status(200).json(team);
        } catch (err) {
            return ProcessError(res, err);
        }
    }

    public async update(req: Request, res: Response): Promise<Response> {
        try {
            const { id } = req.params;
            const teamService = new TeamService();
            const team = await teamService.update(id, req.body);

            return res.status(200).json(team);
        } catch (err) {
            return ProcessError(res, err);
        }
    }

    public async delete(req: Request, res: Response): Promise<Response> {
        try {
            const { id } = req.params;
            const teamService = new TeamService();
            const team = await teamService.delete(id);

            return res.status(200).json(team);
        } catch (err) {
            return ProcessError(res, err);
        }
    }

}
