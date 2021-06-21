import * as Joi from "joi";
import { Request, Response, NextFunction } from "express";
import { validateBody } from "../utils/validators/schemaValidator";

export const validateCreateUserGoal = async (req: Request, res: Response, next: NextFunction): Promise<void | Response> => {
    const schema = Joi.object().keys({
        user: Joi.any().required().messages({
            "any.required": "o campo user é obrigatório",
        }),
        goal: Joi.any().required().messages({
            "any.required": "o campo goal é obrigatório",
        }),
        team: Joi.any().required().messages({
            "any.required": "o campo team é obrigatório",
        }),
        completed: Joi.boolean().required().messages({
            "any.required": "o campo completed é obrigatório",
        }),
    });
    try {
        await validateBody(req, next, schema);
    } catch (error) {
        console.log(error)
        return res.status(422).send(error);
    }
};
