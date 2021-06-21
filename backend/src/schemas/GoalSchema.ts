import * as Joi from "joi";
import { Request, Response, NextFunction } from "express";
import { validateBody } from "../utils/validators/schemaValidator";

export const validateCreateGoal = async (req: Request, res: Response, next: NextFunction): Promise<void | Response> => {
    const schema = Joi.object().keys({
        name: Joi.string().required().messages({
            "any.required": "o campo name é obrigatório",
        }),
        pillar: Joi.optional(),
        description: Joi.string().required().messages({
            "any.required": "o campo description é obrigatório",
        }),
        startDate: Joi.string().required().messages({
            "any.required": "o campo startDate é obrigatório",
        }),
        endDate: Joi.string().required().messages({
            "any.required": "o campo endDate é obrigatório",
        }),
    });
    try {
        await validateBody(req, next, schema);
    } catch (error) {
        console.log(error)
        return res.status(422).send(error);
    }
};
