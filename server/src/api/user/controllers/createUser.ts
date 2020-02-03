import { Request, Response, NextFunction } from "express";
import Joi from "@hapi/joi";

import ApiController from "types/ApiController";
import PropsValidator from "utils/PropsValidator";
import hashPassword from "utils/hashPassword";

const validatorPresets = {
    email: Joi.string().email({
        minDomainSegments: 2
    }).required(),
    name: Joi.string().alphanum().min(3).max(30).required(),
    password: Joi.string().min(6)
};

const createUser: ApiController = function (
    request: Request,
    response: Response,
    next: NextFunction
): void | never {
    const bodyValidator = new PropsValidator(
        request.body,
        validatorPresets
    );

    const { error, value } = bodyValidator.validate();
    
    if (error) {
        // return next(error);
    }
    console.log("createUser", request.body, value);

    const { email, name, password } = value;
    const hashPasswordResult = hashPassword(password);
    // hashing password: https://stackoverflow.com/a/17201493

    // save all the stuff
};

export default createUser;
