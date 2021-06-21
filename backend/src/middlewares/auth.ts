import { Request, Response, NextFunction } from "express";
import * as jwt from "jsonwebtoken";
import { validatePermission } from "../utils/validators/routeValidator";
import {error} from "../utils/constants/ErrorConstants";

export default function auth(req: Request, res: Response, next: NextFunction) {
    const { authorization } = req.headers;

    try {
        if (!authorization) {
          return res.status(401).send({
            status: 401,
            message: "Unauthorized",
          });
        }

        // let url = req.baseUrl + req.path;
        // url = url.replace(/[\d]/g, "");
        // @ts-ignore
        const token = authorization.replace("Bearer ", "").trim();
        // const validUser = await validatePermission(url, token);
        // if (!validUser) throw { status: 401, message: error.permission_denied };
        jwt.verify(token, process.env.SECRET_TOKEN);
        return next();
    } catch (error) {
        if (error.name === "TokenExpiredError") {
            return res.status(401).send({
                status: "401",
                message: "Token expirado",
            });
        }

        return res.status(401).send({
            status: "401",
            message: "Unauthorized",
        });
    }
}
