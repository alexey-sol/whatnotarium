import { Request, Response, NextFunction } from "express";
import Joi from "@hapi/joi";

import ApiController from "types/ApiController";
import PropsValidator from "utils/PropsValidator";
import User from "api/user/user.model";

const validatorPresets = {
    email: Joi.string().email({
        minDomainSegments: 2
    }).required(),
    name: Joi.string().alphanum().min(3).max(30).required(),
    password: Joi.string().min(6).required()
};

const createUser: ApiController = async function (
    request: Request,
    response: Response,
    next: NextFunction
): Promise<void> {
    const bodyValidator = new PropsValidator(
        request.body,
        validatorPresets
    );

    const {
        error,
        value: userData
    } = bodyValidator.validate();
    
    if (error) {
        // return next(error);
    }

    try {
        const user = await User.create(userData);
        response.status(201).send(user);
    } catch (error) {
        // return next(error);
    }
};

export default createUser;
