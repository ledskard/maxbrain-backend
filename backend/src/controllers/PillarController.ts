import { Request, Response } from "express";
import { ProcessError } from "../utils/errors/processError";
import PillarService from "../services/PillarService";

export default class PillarController {
    public async create(req: Request, res: Response): Promise<Response | void> {
        try {
            const pillarService = new PillarService();
            const pillar = await pillarService.create(req.body);

            return res.status(200).json(pillar);
        } catch (err) {
            return ProcessError(res, err);
        }
    }

    public async findAllWithGoal(req: Request, res: Response): Promise<Response> {
        try {
            const pillarService = new PillarService();
            const pillar = await pillarService.findAllWithGoal();

            return res.status(200).json(pillar);
        } catch (err) {
            return ProcessError(res, err);
        }
    }

    public async findAll(req: Request, res: Response): Promise<Response> {
        try {
            const pillarService = new PillarService();
            const pillar = await pillarService.findAll();

            return res.status(200).json(pillar);
        } catch (err) {
            return ProcessError(res, err);
        }
    }

    public async delete(req: Request, res: Response): Promise<Response> {
        try {
            const { id } = req.params;
            const pillarService = new PillarService();
            const pillar = await pillarService.delete(id);

            return res.status(200).json(pillar);
        } catch (err) {
            return ProcessError(res, err);
        }
    }

}
