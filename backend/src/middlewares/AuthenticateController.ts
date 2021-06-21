import { Request, Response } from "express";
import AuthenticateService from "./AuthenticateService";
import TokenService from "./TokenService";
import { ProcessError } from "../utils/errors/processError";

export default class AuthenticateController {

    public async authenticateUser(req: Request, res: Response): Promise<Response> {
        try {
            const authenticateService = new AuthenticateService();
            const tokenService = new TokenService();

            const auth = await authenticateService.authenticateUser(req.body.email, req.body.password);
            const token = await tokenService.authenticate(req.body.email);
            return res.status(200).json({ auth, token });
        } catch (err) {
            return ProcessError(res, err);
        }
    }
}
