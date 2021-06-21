import * as Joi from "joi";
import { Request, Response, NextFunction } from "express";
import { validateBody } from "../utils/validators/schemaValidator";

export const validateCreatePersonalDevelopment = async (req: Request, res: Response, next: NextFunction): Promise<void | Response> => {
    const schema = Joi.object().keys({
        message: Joi.string().required().messages({
            "any.required": "o campo message é obrigatório",
        }),
    });
    try {
        await validateBody(req, next, schema);
    } catch (error) {
        console.log(error)
        return res.status(422).send(error);
    }
};
