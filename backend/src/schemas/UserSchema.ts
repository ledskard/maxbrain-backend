import * as Joi from "joi";
import { Request, Response, NextFunction } from "express";
import { validateBody } from "../utils/validators/schemaValidator";

export const validateCreateUser = async (req: Request, res: Response, next: NextFunction): Promise<void | Response> => {
    const schema = Joi.object().keys({
        name: Joi.string().required().messages({
            "any.required": "o campo name é obrigatório",
        }),
        lastName: Joi.string().required().messages({
            "any.required": "o campo lastName é obrigatório",
        }),
        email: Joi.string()
            .regex(/^[a-z0-9._-]+@[a-z0-9]+\.[a-z]+(\.[a-z]+)?$/i)
            .email({
                minDomainSegments: 2,
                tlds: { allow: ["com", "br", "net"] },
            })
            .required()
            .messages({
                "string.pattern.base": "campo email não pode possuir #, $, %, &",
                "string.email": "campo com email inválido",
                "string.min": "o campo email deve possuir no mínimo 3 dígitos",
                "string.max": "o campo email deve possuir no máximo 30 dígitos",
                "any.required": "o campo email é obrigatório",
            }),
        password: Joi.string()
            .min(6)
            .regex(/^((?=.*[a-z])(?=.*[0-9]))/)
            .required()
            .messages({
                "string.pattern.base": "o campo password deve possuir pelo menos 1 dígito numérico e 1 dígito em letra",
                "any.required": "o campo password é obrigatório",
                "string.min": "o campo password deve ter no mínimo 6 digitos",
            }),
        registration: Joi.string().required().messages({
            "any.required": "o campo registration é obrigatório",
        }),
        teams: Joi.optional(),
    });
    try {
        await validateBody(req, next, schema);
    } catch (error) {
        console.log(error)
        return res.status(422).send(error);
    }
};
