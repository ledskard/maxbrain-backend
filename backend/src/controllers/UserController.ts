import { Request, Response } from "express";
import UserService from "../services/UserService";

import { ProcessError } from "../utils/errors/processError";

export default class UserController {
    public async create(req: Request, res: Response): Promise<Response | void> {
        try {
            const userService = new UserService();
            const user = await userService.createUser(req.body);

            return res.status(200).json(user);
        } catch (err) {
            return ProcessError(res, err);
        }
    }

    public async findById(req: Request, res: Response): Promise<Response> {
        try {
            const { id } = req.params;

            const userService = new UserService();
            const user = await userService.findById(id);
            return res.status(200).json(user);
        } catch (err) {
            return ProcessError(res, err);
        }
    }

    public async findAll(req: Request, res: Response): Promise<Response> {
        try {
            const userService = new UserService();
            const userList = await userService.findAll();

            return res.status(200).json(userList);
        } catch (err) {
            return ProcessError(res, err);
        }
    }

    public async update(req: Request, res: Response): Promise<Response> {
        try {
            const { id } = req.params;
            const userService = new UserService();
            const user = await userService.update(id, req.body);
            return res.status(200).json(user);
        } catch (err) {
            return ProcessError(res, err);
        }
    }

     public async delete(req: Request, res: Response): Promise<Response> {
        try {
            const { id } = req.params;
            const userService = new UserService();
            const user = await userService.delete(id);
            return res.status(200).json(user);
        } catch (err) {
            return ProcessError(res, err);
        }
    }


}
