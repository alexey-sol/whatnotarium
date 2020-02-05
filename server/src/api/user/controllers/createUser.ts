import { Request, Response, NextFunction } from "express";
import Joi from "@hapi/joi";

import ApiController from "types/ApiController";
import PropsValidator from "utils/PropsValidator";
import hashPassword from "utils/hashPassword";
import queryText from "./createUser.query";
import makeDbQuery from "utils/makeDbQuery";

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

    const { error, value } = bodyValidator.validate();
    
    if (error) {
        // return next(error);
    }

    const {
        email,
        name,
        password
    } = value;

    const hashPasswordResult = hashPassword(password);
    const { hash } = hashPasswordResult;
    // hashing password: https://stackoverflow.com/a/17201493

    try {
        const queryValues = [email, hash, name];

        const result = await makeDbQuery(
            "create-user",
            queryText,
            queryValues
        );

        const { id } = result.rows[0];
        response.status(201).send({ id });
    } catch (error) {
        // return next(error);
    }
};

export default createUser;
